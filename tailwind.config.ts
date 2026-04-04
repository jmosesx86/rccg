import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#bf0a30",
          dark: "#a00928",
          light: "#d4324f",
        },
        dark: {
          DEFAULT: "#00162f",
          secondary: "#001f3f",
        },
      },
      fontFamily: {
        heading: ["'Poppins'", "sans-serif"],
        body: ["'Open Sans'", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "slide-left": "slideLeft 0.8s ease forwards",
        "slide-right": "slideRight 0.8s ease forwards",
        "scale-in": "scaleIn 0.6s ease forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "hero-pattern": "linear-gradient(135deg, rgba(0,22,47,0.86) 0%, rgba(0,31,63,0.7) 100%)",
        "cta-pattern": "linear-gradient(135deg, #00162f 0%, #001f3f 50%, #003366 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
