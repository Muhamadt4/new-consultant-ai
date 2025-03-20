"use client";

import { useRouter } from "next/navigation";

export const Sidebar = ({ businessData }) => {
  const router = useRouter();

  return (
    <aside className="w-full md:w-[250px] lg:w-[300px] bg-[#1e2229] p-4 md:sticky md:top-5 md:h-[calc(100vh-6rem)] rounded-lg mb-4 md:mb-0 md:mr-4">
      <h2 className="text-dark-yellow text-xl mb-6 fjalla-one">
        Issues Overview
      </h2>

      <div className="space-y-4">
        <h3 className="text-white font-bold border-b border-dark-yellow pb-2">
          Strengths
        </h3>
        {businessData?.strengths?.key_areas &&
        businessData.strengths.key_areas.length > 0 ? (
          <ul className="text-white space-y-2 pl-3">
            {businessData.strengths.key_areas.map((strength, index) => (
              <li key={`strength-${index}`} className="flex items-center">
                <div className="w-2 h-2 bg-[#06D6A0] rounded-full mr-2"></div>
                {strength}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white pl-3">No strengths identified</p>
        )}

        <h3 className="text-white font-bold border-b border-dark-yellow pb-2 mt-6">
          Weaknesses
        </h3>
        {businessData?.weaknesses?.key_areas &&
        businessData.weaknesses.key_areas.length > 0 ? (
          <ul className="text-white space-y-2 pl-3">
            {businessData.weaknesses.key_areas.map((weakness, index) => (
              <li key={`weakness-${index}`} className="flex items-center">
                <div className="w-2 h-2 bg-[#FF6B6B] rounded-full mr-2"></div>
                {weakness}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white pl-3">No weaknesses identified</p>
        )}
      </div>

      <button
        onClick={() => router.push("/")}
        className="bg-dark-yellow text-[#1e2229] py-2 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-all fjalla-one mt-8 w-full"
      >
        Back to Home
      </button>
    </aside>
  );
};
