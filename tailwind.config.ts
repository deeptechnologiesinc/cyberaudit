import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: "#050d1a", 900: "#0a1628", 800: "#0d1f3c" },
        brand: "#3b82f6",
      },
    },
  },
  plugins: [],
};
export default config;
