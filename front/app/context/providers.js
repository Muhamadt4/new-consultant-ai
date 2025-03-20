"use client";

import { BusinessProvider } from "./BusinessContext";

export function Providers({ children }) {
  return <BusinessProvider>{children}</BusinessProvider>;
}
