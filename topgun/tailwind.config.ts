import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {
    colors: { charcoal: "#0A0A0F", dark: "#1a1a1a", elevated: "#1e1e28", red: "#E63946", cream: "#F5F1E8", purple: "#513963" },
    fontFamily: { sans: ["Inter", "sans-serif"], heading: ["Sora", "sans-serif"], mono: ["JetBrains Mono", "monospace"] },
  }},
  plugins: [],
};
export default config;
