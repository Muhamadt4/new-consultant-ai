"use client";
import SignUpForm from "./components/SignUpForm";
import SidePanel from "../login/components/SidePanel";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0f19]">
      <div className="flex w-[900px] rounded-lg overflow-hidden bg-[#111827] shadow-lg">
        <SignUpForm />
        <SidePanel />
      </div>
    </div>
  );
}
