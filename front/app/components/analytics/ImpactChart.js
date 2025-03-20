"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { IssuesChartLegend } from "./ChartLegends";

const COLORS = ["#06D6A0", "#FFD166", "#FF6B6B"]; // Low, Medium, High

export const ImpactChart = ({ impactLevelData }) => {
  // Chart styling for consistent modern look
  const chartStyle = {
    innerRadius: 70,
    outerRadius: 90,
    paddingAngle: 8,
    cornerRadius: 6,
  };

  return (
    <div className="bg-[#252932] p-6 rounded-lg flex flex-col items-center shadow-lg">
      <h3 className="text-dark-yellow text-xl mb-4 fjalla-one">
        Improvements impact level
      </h3>
      <div className="w-full h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={
                impactLevelData.some((item) => item.value > 0)
                  ? impactLevelData
                  : [{ name: "No Data", value: 1 }]
              }
              cx="50%"
              cy="50%"
              innerRadius={chartStyle.innerRadius}
              outerRadius={chartStyle.outerRadius}
              paddingAngle={chartStyle.paddingAngle}
              cornerRadius={chartStyle.cornerRadius}
              dataKey="value"
              nameKey="name"
              labelLine={false}
              animationDuration={1000}
              animationBegin={0}
              animationEasing="ease-out"
            >
              {(impactLevelData.some((item) => item.value > 0)
                ? impactLevelData
                : [{ name: "No Data", value: 1 }]
              ).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "No Data"
                      ? "#3a3e48"
                      : COLORS[index % COLORS.length]
                  }
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <IssuesChartLegend High="#FF6B6B" Medium="#FFD166" Low="#06D6A0" />
    </div>
  );
};
