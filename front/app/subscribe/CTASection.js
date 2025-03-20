"use client";

import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <div className="bg-dark-yellow rounded-xl p-8 shadow-xl text-center">
      <h2 className="text-2xl md:text-3xl text-[#1e2229] mb-4 fjalla-one">
        Ready to Transform Your Business?
      </h2>
      <p className="text-[#1e2229] text-lg mb-6">
        Join thousands of businesses that use our platform to grow and succeed.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-[#1e2229] text-white py-3 px-12 rounded-lg text-xl  hover:bg-[#2a2f38] transition-all fjalla-one"
      >
        Get Started Now
      </button>
    </div>
  );
}
