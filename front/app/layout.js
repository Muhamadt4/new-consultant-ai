import "./globals.css";
import Navbar from "./ui/Navbar";
import { Providers } from "./context/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="inter" suppressHydrationWarning>
      <body className="bg-[#111827]">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
