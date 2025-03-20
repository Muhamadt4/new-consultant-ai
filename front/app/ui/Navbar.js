"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import business from '../assets/logo.png';
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", path: "/", step: 1 },
    { name: "Business", path: "/business", step: 2 },
    { name: "Analytics", path: "/analytics", step: 3 },
  ];

  // Function to determine current step
  const getCurrentStep = () => {
    if (pathname.includes("/analytics")) return 3;
    if (pathname.includes("/business")) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <header>
      {/* Main header bar - always visible */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center px-4 lg:px-10 py-4 bg-dark-blue text-white fixed top-0 left-0 z-50">
        <Link href="/">
          <Image src={business} alt="logo" width={200} height={200} />
        </Link>

        {/* Steps - hidden on mobile, visible on desktop */}
        <motion.div
          className="hidden lg:flex flex-row justify-between w-full lg:w-80 text-xl my-4 lg:my-0 gap-4 lg:gap-0 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`text-xl font-semibold inter${
                currentStep === item.step
                  ? "text-dark-yellow transition-all duration-500"
                  : currentStep > item.step
                  ? "text-white opacity-70 transition-all duration-500"
                  : "text-white opacity-40 transition-all duration-500"
              }`}
            >
              {item.name}
            </div>
          ))}
        </motion.div>

        {/* About & Login - hidden on mobile, visible on desktop */}
        <motion.div
          className="hidden lg:flex flex-row justify-end items-center gap-8 w-full lg:w-80 my-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Link href="/subscribe">
            <motion.span
              className="text-xl cursor-pointer"
              whileHover={{ color: "#FFD700" }}
            >
              Subscribe
            </motion.span>
          </Link>
          <Link href="/about">
            <motion.span
              className="text-xl cursor-pointer"
              whileHover={{ color: "#FFD700" }}
            >
              About
            </motion.span>
          </Link>
          <motion.button
            className="py-4 px-8 bg-dark-yellow rounded-lg text-black font-bold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/login">Login</Link>
          </motion.button>
        </motion.div>

        {/* Mobile Menu button - visible on mobile, hidden on desktop */}
        <motion.button
          className="lg:hidden text-white absolute right-4 top-6 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence initial={false} mode="wait">
            {isMenuOpen ? (
              <motion.svg
                key="close"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </motion.svg>
            ) : (
              <motion.svg
                key="menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile sidebar menu - only visible when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-dark-blue z-40 pt-24 overflow-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="container mx-auto px-6 py-8 flex flex-col h-full">
              {/* Navigation Steps - centered in the middle */}
              <div className="flex-grow flex flex-col justify-center items-center mb-8">
                <motion.h2
                  className="text-dark-yellow text-2xl mb-8 text-center fjalla-one"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Your Progress
                </motion.h2>

                {/* Simple step indicator for mobile */}
                <div className="flex flex-col items-center gap-6 mb-10">
                  {navItems.map((item) => (
                    <div
                      key={item.name}
                      className={`text-2xl font-semibold fjalla-one ${
                        currentStep === item.step
                          ? "text-dark-yellow"
                          : currentStep > item.step
                          ? "text-white opacity-70"
                          : "text-white opacity-40"
                      }`}
                    >
                      {item.step}. {item.name}
                    </div>
                  ))}
                </div>

                {/* About link at the bottom */}
                <motion.div
                  className="mt-10 flex flex-col items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href="/subscribe">
                    <motion.span
                      className="text-white text-2xl cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ color: "#FFD700" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Subscribe
                    </motion.span>
                  </Link>
                  <Link href="/about">
                    <motion.span
                      className="text-white text-2xl cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ color: "#FFD700" }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      About
                    </motion.span>
                  </Link>
                  <motion.button
                    className="py-3 px-6 bg-dark-yellow rounded-lg text-black font-bold text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Login
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
