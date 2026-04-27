import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f7f3ec",
        paper: "#fbf8f2",
        ink: "#2b2a27",
        muted: "#6b665e",
        sage: "#8a9a7b",
        sageDark: "#7a8d6b",
        terracotta: "#c08566",
        terracottaDark: "#b56b5a",
        line: "#e6dfd3",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43,42,39,0.04), 0 4px 12px rgba(43,42,39,0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
