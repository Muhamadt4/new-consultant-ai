"use client";

import { useRouter } from "next/navigation";

export const ErrorDisplay = ({ error }) => {
  const router = useRouter();

  return (
    <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8 bg-[#121419]">
      <div className="max-w-[95%] mx-auto bg-[#1e2229] p-8 rounded-lg flex flex-col items-center justify-center h-[80vh]">
        <div className="text-red-500 text-5xl mb-6">⚠️</div>
        <h2 className="text-white text-xl mb-4 text-center">Analysis Error</h2>
        <p className="text-red-400 mb-6 text-center">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-dark-yellow text-[#1e2229] py-2 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-all fjalla-one"
        >
          Back to Home
        </button>
      </div>
    </section>
  );
};

export const LoadingDisplay = () => {
  return (
    <section className="w-full min-h-screen p-4 sm:p-6 xl:p-8 bg-[#121419]">
      <div className="max-w-[95%] mx-auto bg-[#1e2229] p-8 rounded-lg flex flex-col items-center justify-center h-[80vh]">
        <div className="animate-pulse mb-6">
          <div className="h-16 w-16 border-4 border-dark-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-white text-xl mb-2">
          Analyzing your business data...
        </h2>
        <p className="text-gray-400">Using Gemini AI to generate insights</p>
      </div>
    </section>
  );
};
