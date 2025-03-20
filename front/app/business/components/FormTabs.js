"use client";

import React from "react";
import { formTabs } from "../../data/businessFormConfig";

export default function FormTabs({ activeSection, setActiveSection }) {
  return (
    <div className="flex flex-wrap justify-center mb-6 gap-2">
      {formTabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-lg transition-all ${
            activeSection === tab.id
              ? "bg-dark-yellow text-[#1e2229] font-semibold"
              : "bg-[#2a2f38] text-white hover:bg-[#353a45]"
          }`}
          onClick={() => setActiveSection(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
