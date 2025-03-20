"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useBusinessContext } from "../context/BusinessContext";
import {
  safeParseInt,
  generateImpactLevelData,
} from "../components/analytics/utils";
import {
  ErrorDisplay,
  LoadingDisplay,
} from "../components/analytics/StatusComponents";
import { Sidebar } from "../components/analytics/Sidebar";
import { ImpactChart } from "../components/analytics/ImpactChart";
import {
  PropertiesBarChart,
  SalesBarChart,
} from "../components/analytics/BarCharts";
import { ImprovementSuggestions } from "../components/analytics/ImprovementSuggestions";

// Chart container to wrap each chart component with suspense
const ChartContainer = ({ children, isVisible = true }) => {
  if (!isVisible) return null;

  return (
    <Suspense
      fallback={
        <div className="bg-[#252932] p-6 rounded-lg flex flex-col items-center shadow-lg h-[320px] animate-pulse" />
      }
    >
      <div className="w-full mx-auto">{children}</div>
    </Suspense>
  );
};

export default function Analytics() {
  const { businessData, isLoading } = useBusinessContext();
  const [displayData, setDisplayData] = useState(null);
  const [error, setError] = useState(null);

  // Define business types that use properties management
  const businessTypesWithProperties = [
    "Real Estate",
    "Automotive",
    "Restaurants",
    "Education & Training",
  ];

  // Process business data when it becomes available
  useEffect(() => {
    try {
      if (businessData && businessData.business_name) {
        // Check if there's an error in the business data
        if (businessData.error) {
          setError(`Analysis failed: ${businessData.error.message}`);
          return;
        }

        // Set display data directly without transformations
        setDisplayData(businessData);
        setError(null); // Clear any previous errors
      }
    } catch (err) {
      console.error("Error processing business data:", err);
      setError(`Error processing business data: ${err.message}`);
    }
  }, [businessData]);

  // Memoize chart data to prevent unnecessary recalculations
  const propertiesData = useMemo(() => {
    // Only calculate properties data for business types that use it
    if (
      !businessData?.business_type ||
      !businessTypesWithProperties.includes(businessData.business_type)
    ) {
      return [
        { name: "Current", value: 0 },
        { name: "Target", value: 0 },
      ];
    }

    return [
      {
        name: "Current",
        value: safeParseInt(businessData?.number_of_properties_managed),
      },
      {
        name: "Target",
        value: safeParseInt(businessData?.target_properties_managed),
      },
    ];
  }, [businessData]);

  // Memoize sales volume data
  const salesVolumeData = useMemo(() => {
    // Monthly sales volume can come from various field names depending on business type
    // Special check for Education & Training business type
    if (businessData?.business_type === "Education & Training") {
      const salesVolume = safeParseInt(businessData?.monthly_sales_volume);
      const studentsPerMonth = safeParseInt(businessData?.studentsPerMonth);
      const averagePrice = safeParseInt(businessData?.averagePrice);

      // Education & Training should only show sales volume if it's properly calculated from students × price
      if (
        studentsPerMonth === 0 ||
        averagePrice === 0 ||
        salesVolume > studentsPerMonth * averagePrice * 1.5
      ) {
        console.log("Ignoring invalid Education sales volume:", {
          salesVolume,
          studentsPerMonth,
          averagePrice,
        });
        return [
          { name: "Current", value: 0 },
          { name: "Target", value: 0 },
        ];
      }
    }

    // For other business types or valid Education data, use the stored values
    return [
      {
        name: "Current",
        value: safeParseInt(businessData?.monthly_sales_volume),
      },
      {
        name: "Target",
        value: safeParseInt(businessData?.sales_target),
      },
    ];
  }, [businessData]);

  // Generate impact level data
  const impactLevelData = useMemo(
    () => generateImpactLevelData(displayData),
    [displayData]
  );

  // Debug logging for development purposes
  useEffect(() => {
    if (displayData) {
      console.log("Analytics Data:", {
        impactLevelData,
        propertiesData,
        salesVolumeData,
        businessType: displayData.business_type,
        monthly_sales_volume: displayData.monthly_sales_volume,
        monthly_sales_volume_parsed: safeParseInt(
          displayData.monthly_sales_volume
        ),
        sales_target: displayData.sales_target,
        sales_target_parsed: safeParseInt(displayData.sales_target),
        shouldShowSalesChart:
          safeParseInt(displayData.monthly_sales_volume) > 0 &&
          safeParseInt(displayData.monthly_sales_volume) < 10000000 &&
          (businessData?.business_type !== "Education & Training" ||
            (businessData?.business_type === "Education & Training" &&
              safeParseInt(businessData?.monthly_sales_volume) > 0 &&
              safeParseInt(businessData?.monthly_sales_volume) < 10000000)),
        shouldShowPropertiesChart:
          businessTypesWithProperties.includes(displayData.business_type) &&
          (safeParseInt(displayData.number_of_properties_managed) > 0 ||
            safeParseInt(displayData.target_properties_managed) > 0),
      });
    }
  }, [
    displayData,
    propertiesData,
    salesVolumeData,
    impactLevelData,
    businessTypesWithProperties,
    businessData,
  ]);

  // Display error state
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  // Display loading state
  if (isLoading) {
    return <LoadingDisplay />;
  }

  // Display empty state if no data
  if (!displayData) {
    return (
      <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8">
        <div className="max-w-[95%] mx-auto bg-[#1e2229] p-8 rounded-lg">
          <div className="text-center text-white">Loading analysis...</div>
        </div>
      </section>
    );
  }

  // Show properties chart only if data exists and at least one value is non-zero
  // AND if this is a business type that uses property management
  const shouldShowPropertiesChart =
    businessData?.number_of_properties_managed !== undefined &&
    businessData?.target_properties_managed !== undefined &&
    (safeParseInt(businessData?.number_of_properties_managed) > 0 ||
      safeParseInt(businessData?.target_properties_managed) > 0) &&
    businessData?.business_type &&
    businessTypesWithProperties.includes(businessData.business_type);

  // Show sales volume chart only if at least one value is non-zero
  const shouldShowSalesChart =
    businessData?.monthly_sales_volume !== undefined &&
    businessData?.sales_target !== undefined &&
    (safeParseInt(businessData?.monthly_sales_volume) > 0 ||
      safeParseInt(businessData?.sales_target) > 0) &&
    // Special check for Education business type - only show if there are valid values
    (businessData?.business_type !== "Education & Training" ||
      (businessData?.business_type === "Education & Training" &&
        safeParseInt(businessData?.monthly_sales_volume) > 0 &&
        safeParseInt(businessData?.monthly_sales_volume) < 10000));

  // If business is Education & Training, set proper thresholds for reasonable values
  if (businessData?.business_type === "Education & Training") {
    const salesVolume = safeParseInt(businessData?.monthly_sales_volume);
    const studentsPerMonth = safeParseInt(businessData?.studentsPerMonth);
    const averagePrice = safeParseInt(businessData?.averagePrice);

    // Only show sales if we have both students and price, and their product matches the sales volume
    // This helps prevent showing incorrect calculated values
    if (
      studentsPerMonth === 0 ||
      averagePrice === 0 ||
      Math.abs(salesVolume - studentsPerMonth * averagePrice) > 10
    ) {
      salesVolumeData[0].value = 0; // Set current value to 0
      salesVolumeData[1].value = 0; // Set target value to 0
    }
  }

  return (
    <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8 bg-[#121419]">
      <h1 className="text-[2rem] text-center xl:text-left xl:text-[4.5rem] text-white fjalla-one px-2 sm:px-4 xl:px-12 pt-20 pb-8 xl:pt-24 xl:pb-12">
        Business Analytics
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar Component */}
        <Sidebar businessData={displayData} />

        {/* Main Content Area */}
        <div className="flex-1 bg-[#1e2229] rounded-lg p-6">
          <h2 className="text-2xl md:text-3xl xl:text-4xl text-dark-yellow mb-6 fjalla-one text-center md:text-left">
            Analysis for {displayData.business_name}
          </h2>

          {/* Charts Section */}
          <div
            className={`grid grid-cols-1 ${
              shouldShowPropertiesChart && shouldShowSalesChart
                ? "md:grid-cols-3"
                : shouldShowPropertiesChart || shouldShowSalesChart
                ? "md:grid-cols-2"
                : "md:grid-cols-1"
            } gap-6 mb-8`}
          >
            {/* Impact Level Chart */}
            <ChartContainer isVisible={true}>
              <ImpactChart impactLevelData={impactLevelData} />
            </ChartContainer>

            {/* Properties Managed Chart (conditional) */}
            <ChartContainer isVisible={shouldShowPropertiesChart}>
              <PropertiesBarChart propertiesData={propertiesData} />
            </ChartContainer>

            {/* Sales Volume Chart */}
            <ChartContainer isVisible={shouldShowSalesChart}>
              <SalesBarChart salesVolumeData={salesVolumeData} />
            </ChartContainer>
          </div>

          {/* Improvement Suggestions Section */}
          <ImprovementSuggestions
            suggestions={displayData.improvement_suggestions}
          />
        </div>
      </div>
    </section>
  );
}
