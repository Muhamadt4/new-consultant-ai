"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection({ faqItems }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle FAQ drawer
  const toggleFAQ = (index) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <div className="bg-[#1a1d24] rounded-xl p-6 shadow-xl mb-10">
      <h2 className="text-2xl text-dark-yellow mb-6 fjalla-one text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqItems.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 flex justify-between items-center bg-[#252932] hover:bg-[#2a2f38] transition-colors text-left"
            >
              <h3 className="text-xl text-white">{faq.question}</h3>
              <motion.div
                animate={{ rotate: openFAQ === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-dark-yellow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </motion.div>
            </button>

            <AnimatePresence>
              {openFAQ === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 bg-[#1e2229] text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
