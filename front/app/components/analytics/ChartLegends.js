export const ChartLegend = ({ currentColor, targetColor }) => (
  <div className="text-white text-sm mt-2 flex justify-center">
    <span
      className="px-[0.6rem] py-[0.6rem] rounded-full mr-2 inline-block"
      style={{ backgroundColor: currentColor }}
    ></span>
    Current
    <span
      className="px-[0.6rem] py-[0.6rem] rounded-full ml-4 mr-2 inline-block"
      style={{ backgroundColor: targetColor }}
    ></span>
    Target
  </div>
);

export const IssuesChartLegend = ({ High, Medium, Low }) => (
  <div className="text-white text-sm mt-2 flex justify-center">
    <span
      className="px-[0.6rem] py-[0.6rem] rounded-full mr-2 inline-block"
      style={{ backgroundColor: High }}
    ></span>
    High
    <span
      className="px-[0.6rem] py-[0.6rem] rounded-full ml-4 mr-2 inline-block"
      style={{ backgroundColor: Medium }}
    ></span>
    Medium
    <span
      className="px-[0.6rem] py-[0.6rem] rounded-full ml-4 mr-2 inline-block"
      style={{ backgroundColor: Low }}
    ></span>
    Low
  </div>
);
