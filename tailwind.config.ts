import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#bf0a30",
          dark: "#9a0826",
          light: "#f0476b",
          50: "#fdf2f4",
          100: "#fbe3e8",
        },
        navy: {
          DEFAULT: "#0a1a33",
          950: "#050e1f",
          900: "#0a1a33",
          800: "#10264a",
          700: "#1a3563",
          600: "#2a4a80",
        },
        gold: {
          DEFAULT: "#c9a24a",
          light: "#e4c77d",
          dark: "#7d5f1a",
        },
        cream: {
          DEFAULT: "#faf7f2",
          dark: "#f2ece2",
        },
        ink: {
          DEFAULT: "#1d2433",
          muted: "#5b6475",
          soft: "#687082",
        },
        // Legacy aliases used by older sections
        dark: {
          DEFAULT: "#0a1a33",
          secondary: "#10264a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1240px",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(10, 26, 51, 0.18)",
        lift: "0 24px 50px -20px rgba(10, 26, 51, 0.35)",
        glow: "0 10px 30px -8px rgba(191, 10, 48, 0.55)",
      },
      animation: {
        "fade-up": "fadeUp 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "fade-in": "fadeIn 1s ease forwards",
        // Transform-only entrance: content is painted immediately (good for LCP).
        rise: "rise 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "pulse-ring": "pulseRing 1.8s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
        "slow-zoom": "slowZoom 20s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rise: {
          "0%": { transform: "translateY(24px)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
