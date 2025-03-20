"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";

export default function PasswordInput({ label = "Password", name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-4 relative">
      <label className="block text-gray-400">{label}</label>
      <div className="relative">
        <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="pl-10 mt-1 w-full p-2 bg-[#1f2937] text-white border border-gray-600 pr-10 rounded focus:ring-2 focus:ring-[#d4a373] focus:border-transparent transition-all"
          type={showPassword ? "text" : "password"}
          placeholder={`Enter your ${label.toLowerCase()}`}
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#d4a373] transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
    </div>
  );
}
