import { Suspense } from "react";
import BusinessFormContainer from "./components/BusinessFormContainer";

export const metadata = {
  title: "Business Form | Consultant AI",
  description:
    "Complete your business information to get customized AI insights",
};

// Main server component with Suspense boundary
export default function Business() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen p-8 flex items-center justify-center text-white text-xl">
          Loading...
        </div>
      }
    >
      <BusinessFormContainer />
    </Suspense>
  );
}
