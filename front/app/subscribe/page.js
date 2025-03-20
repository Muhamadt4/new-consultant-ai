import { Suspense } from "react";

import BillingToggle from "./BillingToggle";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import { faqItems, tableData, plans } from "../data/subscriptionData";

export default function Subscribe() {
  return (
    <section className="w-full min-h-screen p-4 mt-36 sm:p-6 xl:p-8">

      <div className="max-w-[95%] mx-auto">
        {/* Description */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-6xl text-dark-yellow mb-4 fjalla-one">
            Choose the Perfect Plan for Your Business
          </h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Get access to powerful business analytics and AI-powered
            recommendations to help your business grow.
          </p>
        </div>

        {/* Billing Toggle - Client Component */}
        <Suspense
          fallback={
            <div className="h-16 flex justify-center items-center">
              Loading...
            </div>
          }
        >
          <BillingToggle plans={plans} />
        </Suspense>

        {/* Features comparison - Server Rendered */}
        <div className="bg-[#1a1d24] rounded-xl p-6 shadow-xl mb-10 mt-12">
          <h2 className="text-2xl text-dark-yellow mb-6 fjalla-one text-center">
            Compare All Features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700 fjalla-one">
                  {tableData.headers.map((header, index) => (
                    <th key={index} className="py-4 px-2 text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex < tableData.rows.length - 1
                        ? "border-b border-gray-700"
                        : ""
                    }
                  >
                    <td className="py-4 px-2 text-white">{row.feature}</td>
                    {row.values.map((value, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`py-4 px-2 ${
                          typeof value === "object" && !value.available
                            ? "text-[#FF6B6B]"
                            : "text-white"
                        }`}
                      >
                        {typeof value === "object" ? value.text : value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section - Client Component for interactivity */}
        <Suspense
          fallback={
            <div className="h-48 flex justify-center items-center">
              Loading FAQ...
            </div>
          }
        >
          <FAQSection faqItems={faqItems} />
        </Suspense>

        {/* CTA Section - Client Component for navigation */}
        <Suspense
          fallback={
            <div className="h-24 flex justify-center items-center">
              Loading...
            </div>
          }
        >
          <CTASection />
        </Suspense>
      </div>
    </section>
  );
}
