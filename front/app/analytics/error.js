"use client";

import { ErrorDisplay } from "../components/analytics/StatusComponents";

export default function Error({ error, reset }) {
  return <ErrorDisplay error={error.message || "Something went wrong"} />;
}
