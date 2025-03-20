/**
 * Business data processing
 */
import {
  safeParseInt,
  formatCompetitors,
  MAX_REASONABLE_VALUE,
} from "../utils/businessDataHelpers";
import { analyzeBusinessDataWithGemini } from "../api/geminiService";

/**
 * Process form data into standardized business data format
 *
 * @param {string} businessType - Type of business
 * @param {object} formValues - Form values to process
 * @returns {object} Processed business data
 */
export const processBusinessData = async (businessType, formValues) => {
  try {
    // Initialize the standardized data object with only the required fields
    let processedData = {
      business_name: formValues.businessName || "Business Name",
      location: "",
      business_type: (formValues.businessSubtype || businessType).toString(),
      number_of_properties_managed: 0,
      average_property_price: 0,
      monthly_sales_volume: 0,
      marketing_channels_used: [],
      customer_demographics: [],
      competitors_in_the_area: [],
      biggest_challenges_faced: [],
      sales_target: 0,
      vacancy_rate_target: 5,
      marketing_budget_target: 0,
    };

    // Format location
    if (formValues.city || formValues.country) {
      processedData.location = `${formValues.city || ""}, ${
        formValues.country || ""
      }`
        .trim()
        .replace(/^,\s*|,\s*$/g, "");
    }

    // Process data based on business type
    processBusinessTypeSpecificData(businessType, formValues, processedData);

    // Calculate derived metrics
    processDerivedMetrics(businessType, formValues, processedData);

    // Ensure array fields are always arrays with fallbacks
    ensureArrayFields(processedData);

    // Validate metrics for reasonableness
    validateMetrics(processedData);

    // Process the data with Gemini API
    console.log("Sending data to Gemini API for analysis...");
    const analyzedData = await analyzeBusinessDataWithGemini(processedData);

    // Merge the original data with the analyzed data
    const finalData = {
      ...processedData, // Keep the original business metrics for charts
      strengths: analyzedData.strengths, // Use AI analysis for strengths
      weaknesses: analyzedData.weaknesses, // Use AI analysis for weaknesses
      improvement_suggestions: analyzedData.improvement_suggestions, // Use AI analysis for improvement suggestions
    };

    return finalData;
  } catch (error) {
    console.error("Error processing business data:", error);
    throw error;
  }
};

/**
 * Process data specific to business type
 */
const processBusinessTypeSpecificData = (
  businessType,
  formValues,
  processedData
) => {
  if (businessType === "Real Estate") {
    // Map Real Estate specific field names
    processedData.number_of_properties_managed = safeParseInt(
      formValues.propertiesManaged
    );
    processedData.average_property_price = safeParseInt(
      formValues.avgPropertyPrice
    );
    processedData.monthly_sales_volume = safeParseInt(
      formValues.monthlySalesVolume
    );
    processedData.marketing_channels_used = Array.isArray(
      formValues.marketingChannels
    )
      ? formValues.marketingChannels
      : formValues.marketingChannels
      ? [formValues.marketingChannels]
      : [];
    processedData.customer_demographics = Array.isArray(
      formValues.customerDemographics
    )
      ? formValues.customerDemographics
      : formValues.customerDemographics
      ? [formValues.customerDemographics]
      : [];
    processedData.competitors_in_the_area = formatCompetitors(
      formValues.competitors
    );
    processedData.biggest_challenges_faced = Array.isArray(
      formValues.biggestChallenges
    )
      ? formValues.biggestChallenges
      : formValues.biggestChallenges
      ? [formValues.biggestChallenges]
      : [];
  } else {
    // For other business types, map fields based on naming patterns
    mapFieldsByNamingPatterns(businessType, formValues, processedData);
  }
};

/**
 * Map fields based on naming patterns for non-Real Estate business types
 */
const mapFieldsByNamingPatterns = (businessType, formValues, processedData) => {
  // Loop through formValues and map to standardized fields
  Object.entries(formValues).forEach(([fieldId, value]) => {
    if (
      fieldId === "businessName" ||
      fieldId === "city" ||
      fieldId === "country"
    ) {
      return; // These are already handled
    }

    // Map fields based on patterns in their IDs
    if (fieldId === "propertiesManaged") {
      processedData.number_of_properties_managed = safeParseInt(value);
    } else if (
      (fieldId.includes("price") || fieldId.includes("average")) &&
      !fieldId.includes("Target") &&
      !fieldId === "averagePrice"
    ) {
      processedData.average_property_price = safeParseInt(value);
    } else if (
      (fieldId === "monthlySales" ||
        fieldId === "monthlyRevenue" ||
        fieldId === "monthlySalesVolume" ||
        fieldId.includes("sales") ||
        fieldId.includes("revenue")) &&
      !fieldId.includes("Target")
    ) {
      // Capture all forms of monthly sales or revenue data
      console.log(
        `Setting monthly_sales_volume from field ${fieldId} with value ${value}`
      );
      processedData.monthly_sales_volume = safeParseInt(value);
    } else if (
      fieldId.includes("marketing") &&
      (Array.isArray(value) || typeof value === "string")
    ) {
      processedData.marketing_channels_used = Array.isArray(value)
        ? value
        : value
        ? [value]
        : [];
    } else if (
      (fieldId.includes("demographic") ||
        fieldId.includes("customer") ||
        fieldId === "customerBase") &&
      (Array.isArray(value) || typeof value === "string")
    ) {
      processedData.customer_demographics = Array.isArray(value)
        ? value
        : value
        ? [value]
        : [];
    } else if (
      fieldId.includes("competitor") &&
      (typeof value === "string" || Array.isArray(value))
    ) {
      processedData.competitors_in_the_area =
        typeof value === "string"
          ? formatCompetitors(value)
          : Array.isArray(value)
          ? value
          : value
          ? [value]
          : [];
    } else if (
      (fieldId.includes("challenge") ||
        fieldId.includes("problem") ||
        fieldId === "keyChallenges") &&
      (Array.isArray(value) || typeof value === "string")
    ) {
      processedData.biggest_challenges_faced = Array.isArray(value)
        ? value
        : value
        ? [value]
        : [];
    }
  });

  // Special case for Automotive - explicitly check for 'monthlySales' field
  if (
    businessType === "Automotive" &&
    processedData.monthly_sales_volume === 0
  ) {
    if (formValues.monthlySales !== undefined) {
      processedData.monthly_sales_volume = safeParseInt(
        formValues.monthlySales
      );
      console.log(
        `Setting Automotive monthly_sales_volume from monthlySales: ${processedData.monthly_sales_volume}`
      );
    }
  }
};

/**
 * Process special case metrics for specific business types
 */
const processDerivedMetrics = (businessType, formValues, processedData) => {
  const monthlyVolume = safeParseInt(processedData.monthly_sales_volume);
  const propertyCount = safeParseInt(
    processedData.number_of_properties_managed
  );

  // Special case for Education & Training
  if (businessType === "Education & Training" && monthlyVolume === 0) {
    const studentsPerMonth = safeParseInt(formValues.studentsPerMonth);
    const averagePrice = safeParseInt(formValues.averagePrice);

    if (
      studentsPerMonth > 0 &&
      studentsPerMonth <= 1000 &&
      averagePrice > 0 &&
      averagePrice <= 5000 &&
      studentsPerMonth * averagePrice < 1000000
    ) {
      processedData.monthly_sales_volume = studentsPerMonth * averagePrice;
    }
  }

  // Special case for Healthcare
  if (businessType === "Healthcare" && monthlyVolume === 0) {
    const patientsPerMonth = safeParseInt(formValues.patientsPerMonth);
    const averageServiceValue =
      safeParseInt(formValues.averageServiceValue) || 1;

    if (patientsPerMonth > 0) {
      processedData.monthly_sales_volume =
        patientsPerMonth * averageServiceValue;
    }
  }

  // Special case for Financial Services
  if (businessType === "Financial Services" && monthlyVolume === 0) {
    if (formValues.monthlyRevenue) {
      processedData.monthly_sales_volume = safeParseInt(
        formValues.monthlyRevenue
      );
    } else if (
      formValues.clientsPerMonth &&
      formValues.averageTransactionValue
    ) {
      const clientsPerMonth = safeParseInt(formValues.clientsPerMonth);
      const averageTransactionValue = safeParseInt(
        formValues.averageTransactionValue
      );

      if (clientsPerMonth > 0 && averageTransactionValue > 0) {
        processedData.monthly_sales_volume =
          clientsPerMonth * averageTransactionValue;
      }
    }
  }

  // Special case for Technology
  if (businessType === "Technology & IT Services" && monthlyVolume === 0) {
    if (formValues.monthlyRevenue) {
      processedData.monthly_sales_volume = safeParseInt(
        formValues.monthlyRevenue
      );
    } else if (formValues.numberOfClients && formValues.averageProjectValue) {
      const numberOfClients = safeParseInt(formValues.numberOfClients);
      const averageProjectValue = safeParseInt(formValues.averageProjectValue);

      if (numberOfClients > 0 && averageProjectValue > 0) {
        processedData.monthly_sales_volume =
          numberOfClients * averageProjectValue;
      }
    }
  }

  // Special case for E-commerce
  if (businessType === "E-commerce" && monthlyVolume === 0) {
    if (formValues.monthlyRevenue) {
      processedData.monthly_sales_volume = safeParseInt(
        formValues.monthlyRevenue
      );
    } else if (
      formValues.monthlyVisitors &&
      formValues.conversionRate &&
      formValues.averageOrderValue
    ) {
      const monthlyVisitors = safeParseInt(formValues.monthlyVisitors);
      const conversionRate = safeParseInt(formValues.conversionRate) / 100;
      const averageOrderValue = safeParseInt(formValues.averageOrderValue);

      if (monthlyVisitors > 0 && conversionRate > 0 && averageOrderValue > 0) {
        processedData.monthly_sales_volume = Math.round(
          monthlyVisitors * conversionRate * averageOrderValue
        );
      }
    }
  }

  // Process sales targets
  processTargetMetrics(businessType, formValues, processedData);
};

/**
 * Process target metrics
 */
const processTargetMetrics = (businessType, formValues, processedData) => {
  const monthlyVolume = safeParseInt(processedData.monthly_sales_volume);
  const propertyCount = safeParseInt(
    processedData.number_of_properties_managed
  );

  // Look for sales target in all possible field names
  const salesTargetValue =
    formValues.monthlySalesVolumeTarget ||
    formValues.monthlyRevenueTarget ||
    formValues.monthlySalesTarget;

  processedData.sales_target = salesTargetValue
    ? safeParseInt(salesTargetValue)
    : Math.round(monthlyVolume * 1.2);

  // Special case for Education & Training - calculate sales target
  if (
    businessType === "Education & Training" &&
    processedData.sales_target === 0
  ) {
    calculateEducationTargets(formValues, processedData);
  }

  // Special case for Healthcare - calculate sales target
  if (businessType === "Healthcare" && processedData.sales_target === 0) {
    calculateHealthcareTargets(formValues, processedData);
  }

  // Special case for Technology - ensure revenue target is captured
  if (
    businessType === "Technology & IT Services" &&
    processedData.sales_target === 0
  ) {
    calculateTechnologyTargets(formValues, processedData);
  }

  // Special case for other business types
  processOtherBusinessTypeTargets(businessType, formValues, processedData);

  // Set target properties managed
  processedData.target_properties_managed = formValues.propertiesManagedTarget
    ? safeParseInt(formValues.propertiesManagedTarget)
    : Math.round(propertyCount * 1.2);

  // Set marketing budget target
  processedData.marketing_budget_target = formValues.marketingBudgetTarget
    ? safeParseInt(formValues.marketingBudgetTarget)
    : monthlyVolume
    ? Math.round(monthlyVolume * 0.05)
    : 1000;
};

/**
 * Calculate Education & Training targets
 */
const calculateEducationTargets = (formValues, processedData) => {
  const studentsPerMonth = safeParseInt(formValues.studentsPerMonth);
  const averagePrice = safeParseInt(formValues.averagePrice);
  const studentsPerMonthTarget = safeParseInt(
    formValues.studentsPerMonthTarget
  );
  const averagePriceTarget = safeParseInt(formValues.averagePriceTarget);

  // Calculate based on target students × target price
  if (
    studentsPerMonthTarget > 0 &&
    studentsPerMonthTarget <= 1500 &&
    averagePriceTarget > 0 &&
    averagePriceTarget <= 5000 &&
    studentsPerMonthTarget * averagePriceTarget < 1000000
  ) {
    processedData.sales_target = studentsPerMonthTarget * averagePriceTarget;
  }
  // If no target price, use current price with target students
  else if (
    studentsPerMonthTarget > 0 &&
    studentsPerMonthTarget <= 1500 &&
    averagePrice > 0 &&
    averagePrice <= 5000 &&
    studentsPerMonthTarget * averagePrice < 1000000
  ) {
    processedData.sales_target = studentsPerMonthTarget * averagePrice;
  }
  // If no target students, use current students with target price
  else if (
    averagePriceTarget > 0 &&
    averagePriceTarget <= 5000 &&
    studentsPerMonth > 0 &&
    studentsPerMonth <= 1000 &&
    studentsPerMonth * averagePriceTarget < 1000000
  ) {
    processedData.sales_target = studentsPerMonth * averagePriceTarget;
  }
};

/**
 * Calculate Healthcare targets
 */
const calculateHealthcareTargets = (formValues, processedData) => {
  const patientsPerMonthTarget = safeParseInt(
    formValues.patientsPerMonthTarget
  );
  const averageServiceValueTarget =
    safeParseInt(formValues.averageServiceValueTarget) ||
    safeParseInt(formValues.averageServiceValue) ||
    1;

  if (patientsPerMonthTarget > 0) {
    processedData.sales_target =
      patientsPerMonthTarget * averageServiceValueTarget;
  }
};

/**
 * Calculate Technology targets
 */
const calculateTechnologyTargets = (formValues, processedData) => {
  if (formValues.monthlyRevenueTarget) {
    processedData.sales_target = safeParseInt(formValues.monthlyRevenueTarget);
  } else if (
    formValues.numberOfClientsTarget &&
    formValues.averageProjectValue
  ) {
    const numberOfClientsTarget = safeParseInt(
      formValues.numberOfClientsTarget
    );
    const averageProjectValue = safeParseInt(formValues.averageProjectValue);

    if (numberOfClientsTarget > 0 && averageProjectValue > 0) {
      processedData.sales_target = numberOfClientsTarget * averageProjectValue;
    }
  }
};

/**
 * Process targets for other business types
 */
const processOtherBusinessTypeTargets = (
  businessType,
  formValues,
  processedData
) => {
  // Financial Services
  if (
    businessType === "Financial Services" &&
    processedData.sales_target === 0
  ) {
    if (formValues.monthlyRevenueTarget) {
      processedData.sales_target = safeParseInt(
        formValues.monthlyRevenueTarget
      );
    }
  }

  // E-commerce
  if (businessType === "E-commerce" && processedData.sales_target === 0) {
    if (formValues.monthlyRevenueTarget) {
      processedData.sales_target = safeParseInt(
        formValues.monthlyRevenueTarget
      );
    }
  }
};

/**
 * Ensure array fields are always arrays with fallbacks
 */
const ensureArrayFields = (processedData) => {
  if (!processedData.marketing_channels_used.length) {
    processedData.marketing_channels_used = ["Social Media"];
  }

  if (!processedData.customer_demographics.length) {
    processedData.customer_demographics = ["General Consumers"];
  }

  if (!processedData.competitors_in_the_area.length) {
    processedData.competitors_in_the_area = ["Local competitors"];
  }

  if (!processedData.biggest_challenges_faced.length) {
    processedData.biggest_challenges_faced = ["Market Competition"];
  }
};

/**
 * Validate metrics for reasonableness
 */
const validateMetrics = (processedData) => {
  // Validate monthly sales volume
  if (
    isNaN(processedData.monthly_sales_volume) ||
    processedData.monthly_sales_volume < 0 ||
    processedData.monthly_sales_volume > MAX_REASONABLE_VALUE
  ) {
    processedData.monthly_sales_volume = 0;
  }

  // Validate sales target
  if (
    isNaN(processedData.sales_target) ||
    processedData.sales_target < 0 ||
    processedData.sales_target > MAX_REASONABLE_VALUE
  ) {
    processedData.sales_target = 0;
  }
};
