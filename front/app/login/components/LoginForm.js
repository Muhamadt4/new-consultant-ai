"use client";

import { useState } from "react";
import Link from "next/link";
import PasswordInput from "./PasswordInput";
import { FiUser } from "react-icons/fi";

export default function LoginForm() {
  return (
    <div className="w-1/2 p-8 text-white">
      <h2 className="text-2xl font-semibold text-[#d4a373]">Get Started Now</h2>
      <p className="text-sm text-gray-400">
        Welcome to Consultant.AI, Sign in to start your experience
      </p>

      <div className="mt-4 relative">
        <label className="block text-gray-400">Username</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            className="pl-10 mt-1 w-full p-2 bg-[#1f2937] text-white border border-gray-600 rounded focus:ring-2 focus:ring-[#d4a373] focus:border-transparent transition-all"
            placeholder="Enter your username"
          />
        </div>
      </div>

      <PasswordInput />

      <button className="w-full mt-6 p-2 bg-[#d4a373] hover:bg-[#b88b5b] text-black rounded">
        Sign in
      </button>

      <p className="mt-4 text-sm text-gray-400">
        Need to create an account?{" "}
        <span className="text-[#d4a373] cursor-pointer">
          <Link href="/signUp">Sign up</Link>
        </span>
      </p>
    </div>
  );
}
