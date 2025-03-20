"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Generate colors based on impact level
const getImpactColor = (impact) => {
  switch (impact) {
    case "High":
      return "#FF6B6B"; // red
    case "Medium":
      return "#FFD166"; // yellow
    case "Low":
      return "#06D6A0"; // green
    default:
      return "#CCCCCC"; // gray
  }
};

export const ImprovementSuggestions = ({ suggestions = [] }) => {
  const [activeDrawer, setActiveDrawer] = useState(null);

  // Sort improvement suggestions by impact level
  const sortedSuggestions = suggestions.slice().sort((a, b) => {
    const impactOrder = { High: 3, Medium: 2, Low: 1 };
    return impactOrder[b.impact_level] - impactOrder[a.impact_level];
  });

  const toggleDrawer = (suggestion) => {
    if (activeDrawer === suggestion) {
      setActiveDrawer(null);
    } else {
      setActiveDrawer(suggestion);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-dark-yellow text-xl mb-6 fjalla-one">
        Improvement Suggestions ({suggestions.length || 0})
      </h3>

      {!suggestions || suggestions.length === 0 ? (
        <div className="bg-[#252932] p-6 rounded-lg text-center">
          <p className="text-white">No improvement suggestions available.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {sortedSuggestions.map((improvement, index) => (
            <div
              key={`imp-drawer-${index}`}
              className="bg-[#252932] rounded-lg overflow-hidden"
            >
              <div
                className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#2c3039] transition-colors"
                onClick={() => toggleDrawer(improvement.suggestion)}
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{
                      backgroundColor: getImpactColor(improvement.impact_level),
                    }}
                  ></div>
                  <span className="text-white">{improvement.suggestion}</span>
                </div>
                <span className="text-dark-yellow">
                  {activeDrawer === improvement.suggestion ? "▲" : "▼"}
                </span>
              </div>

              <AnimatePresence>
                {activeDrawer === improvement.suggestion && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-[#1e2229] border-t border-[#3a3e48]">
                      <p className="text-white mb-2">
                        <span className="text-dark-yellow">Impact Level: </span>
                        <span
                          className="px-2 py-1 rounded text-sm ml-2"
                          style={{
                            backgroundColor: getImpactColor(
                              improvement.impact_level
                            ),
                            color:
                              improvement.impact_level === "Medium"
                                ? "#1e2229"
                                : "white",
                          }}
                        >
                          {improvement.impact_level}
                        </span>
                      </p>
                      <p className="text-white">
                        <span className="text-dark-yellow">
                          Expected outcome:{" "}
                        </span>
                        {improvement.expected_outcome}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
