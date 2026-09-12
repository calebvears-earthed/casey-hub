import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#0A0A0F",
        dark: "#1a1a1a",
        elevated: "#1e1e28",
        card: "#22222d",
        red: { DEFAULT: "#10B981", hover: "#34D399" },
        cream: "#F5F1E8",
        purple: "#513963",
        violet: "#7c3aed",
        muted: "#6b6b6b",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Sora", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
