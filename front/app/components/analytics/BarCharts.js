"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { ChartLegend } from "./ChartLegends";

const BAR_COLORS = { Current: "#FF6B6B", Target: "#06D6A0" }; // Current, Target

export const PropertiesBarChart = ({ propertiesData }) => {
  return (
    <div className="bg-[#252932] p-6 rounded-lg flex flex-col items-center shadow-lg">
      <h3 className="text-dark-yellow text-xl mb-4 fjalla-one">
        Number of properties managed
      </h3>
      <div className="w-full h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={propertiesData}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff" }}
            />
            <Tooltip
              content={(props) => (
                <CustomTooltip
                  {...props}
                  formatter={(val) => val.toLocaleString()}
                />
              )}
              cursor={false}
            />
            <Bar
              dataKey="value"
              radius={[0, 10, 10, 0]}
              barSize={40}
              animationDuration={1500}
            >
              {propertiesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend currentColor="#FF6B6B" targetColor="#06D6A0" />
    </div>
  );
};

export const SalesBarChart = ({ salesVolumeData }) => {
  // Log the sales data for debugging
  console.log("SalesBarChart received data:", salesVolumeData);

  return (
    <div className="bg-[#252932] p-6 rounded-lg flex flex-col items-center shadow-lg">
      <h3 className="text-dark-yellow text-xl mb-4 fjalla-one">
        Monthly Sales Volume ($)
      </h3>
      <div className="w-full h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesVolumeData}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff" }}
            />
            <Tooltip
              content={(props) => (
                <CustomTooltip
                  {...props}
                  formatter={(val) => `$${val.toLocaleString()}`}
                />
              )}
              cursor={false}
            />
            <Bar
              dataKey="value"
              radius={[0, 10, 10, 0]}
              barSize={40}
              animationDuration={1500}
            >
              {salesVolumeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend currentColor="#FF6B6B" targetColor="#06D6A0" />
      {/* Add a debug display for values */}
      <div className="mt-2 text-xs text-gray-400">
        Current: ${salesVolumeData[0]?.value.toLocaleString() || 0} | Target: $
        {salesVolumeData[1]?.value.toLocaleString() || 0}
      </div>
    </div>
  );
};
