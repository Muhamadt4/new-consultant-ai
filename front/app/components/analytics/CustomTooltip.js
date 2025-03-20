"use client";

import { motion } from "framer-motion";

export const CustomTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    // Get the value and format it if needed
    let value = payload[0].value;

    // For properties chart, show as integer
    if (payload[0].name === "Current" || payload[0].name === "Target") {
      if (formatter) {
        value = formatter(value);
      } else {
        // Just format as a number with commas for thousands
        value = value.toLocaleString();
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#252932] p-3 rounded-lg shadow-xl border border-[#3a3e48]"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <p className="text-white text-xs uppercase font-bold mb-1 pb-1 border-b border-[#3a3e48]">
          {payload[0].name}
        </p>
        <p className="text-dark-yellow font-bold">{value}</p>
      </motion.div>
    );
  }

  return null;
};
