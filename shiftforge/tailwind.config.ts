import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ShiftForge brand system — from Logo Sheet v1.0
        charcoal: "#0B0A08",       // deepest surface — page bg
        ink: "#14100E",            // brand dark — Ink
        dark: "#14100E",           // sidebar / rails (alias to Ink)
        elevated: "#1B1613",       // card surface, warmer than ink
        card: "#221B18",           // elevated card surface
        red: { DEFAULT: "#D0261F", hover: "#A31C17" },  // Forge Red + Ember
        forge: "#D0261F",
        ember: "#A31C17",
        paper: "#FAF7F3",          // brand light — for wordmark on dark
        cream: "#FAF7F3",          // legacy alias → paper
        purple: "#513963",
        violet: "#7c3aed",
        muted: "#6E675F",          // brand-aligned muted
      },
      fontFamily: {
        // Single-font system per ShiftForge brand sheet
        sans: ["Archivo", "system-ui", "sans-serif"],
        heading: ["Archivo", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        wordmark: "-0.02em",       // Archivo Black tracking rule
        tagline: "0.3em",          // SMART REPORTS spacing
      },
    },
  },
  plugins: [],
};
export default config;
