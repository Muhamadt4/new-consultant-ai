"use client";
import { useState } from "react";
import Link from "next/link";
import PasswordInput from "../../login/components/PasswordInput";
import { FiUser, FiMail } from "react-icons/fi";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 p-8 text-white">
      <h2 className="text-2xl font-semibold text-[#d4a373]">Create Account</h2>
      <p className="text-sm text-gray-400">
        Join Consultant.AI to unlock powerful business insights
      </p>

      <div className="mt-4 relative">
        <label className="block text-gray-400">Full Name</label>
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="pl-10 mt-1 w-full p-2 bg-[#1f2937] text-white border border-gray-600 rounded focus:ring-2 focus:ring-[#d4a373] focus:border-transparent transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div className="mt-4 relative">
        <label className="block text-gray-400">Email</label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="pl-10 mt-1 w-full p-2 bg-[#1f2937] text-white border border-gray-600 rounded focus:ring-2 focus:ring-[#d4a373] focus:border-transparent transition-all"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <PasswordInput 
        label="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <PasswordInput 
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <button 
        type="submit"
        className="w-full mt-6 p-2 bg-[#d4a373] hover:bg-[#b88b5b] text-black rounded transition-all"
      >
        Create Account
      </button>

      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/login" className="text-[#d4a373] cursor-pointer">
          Sign in
        </Link>
      </p>
    </form>
  );
} 