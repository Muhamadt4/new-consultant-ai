"use client";
import LoginForm from "./components/LoginForm";
import SidePanel from "./components/SidePanel";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d0f19]">
      <div className="flex w-[900px] rounded-lg overflow-hidden bg-[#111827] shadow-lg">
        <LoginForm />
        <SidePanel />
      </div>
    </div>
  );
}
