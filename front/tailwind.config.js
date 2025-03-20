/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "dark-yellow": "#d4a373",
        "dark-blue": "#111827",
        foreground: "var(--foreground)",
        text: {
          "dark-yellow": "#d4a373",
        },
        chart: {
          high: "#FF6B6B",
          medium: "#FFD166",
          low: "#06D6A0",
        },
      },
    },
  },
  plugins: [],
};
