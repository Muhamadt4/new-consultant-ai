"use client";

import { useSearchParams } from "next/navigation";
import BusinessFormClient from "./BusinessFormClient";

// Component that uses useSearchParams (client component)
export default function BusinessFormContainer() {
  const searchParams = useSearchParams();
  const businessType = searchParams.get("type") || "Real Estate";

  return <BusinessFormClient businessType={businessType} />;
}
