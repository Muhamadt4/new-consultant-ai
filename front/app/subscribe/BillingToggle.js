"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
export default function BillingToggle({ plans }) {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <>
      {/* Billing Toggle */}
      <div className="flex justify-center items-center mb-10">
        <div className="bg-[#1a1d24] rounded-lg p-1 flex items-center">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-md transition-all ${
              billingCycle === "monthly"
                ? "bg-dark-yellow text-[#1e2229] font-semibold"
                : "text-white hover:bg-[#2a2f38]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-md transition-all ${
              billingCycle === "yearly"
                ? "bg-dark-yellow text-[#1e2229] font-semibold"
                : "text-white hover:bg-[#2a2f38]"
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              Save 16%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-[#1a1d24] rounded-xl p-6 shadow-xl relative ${
              plan.popular
                ? "border-2 border-dark-yellow transform md:scale-105"
                : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-dark-yellow text-[#1e2229] py-1 px-4 rounded-full font-semibold text-sm">
                Most Popular
              </div>
            )}
            <div className="text-center mb-6">
              <div className="text-3xl mb-2 text-white fjalla-one">
                {plan.name}
              </div>
              <div className="text-4xl text-dark-yellow font-bold mb-2 fjalla-one">
                {plan.price[billingCycle]}
              </div>
              {billingCycle === "yearly" && (
                <div className="text-green-500 text-sm">Save 16%</div>
              )}
            </div>

            <ul className="mb-8 space-y-4">
              {plan.features.map((feature, fIndex) => (
                <li
                  key={fIndex}
                  className={`flex items-center ${
                    feature.available ? "text-white" : "text-gray-500"
                  }`}
                >
                  {feature.available ? (
                    <span className="mr-2 text-green-500">
                      <FaCheck color="#22c55e" size={18}/>
                    </span>
                  ) : (
                    <span className="mr-2">
                      <IoMdCloseCircle color="#FF6B6B" size={18}/>
                    </span>
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg text-center font-semibold ${
                plan.name === "Free"
                  ? "bg-[#2a2f38] text-white hover:bg-[#353a45]"
                  : "bg-dark-yellow text-[#1e2229] hover:bg-yellow-500"
              } transition-all`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
