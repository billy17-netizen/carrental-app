import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FFF1F1",
          100: "#FFE2E2",
          200: "#FFCBCB",
          300: "#FFA8A8",
          400: "#FF7A7A",
          500: "#FF4949",
          600: "#FF1F1F",
          700: "#E60000",
          800: "#B80000",
          900: "#8A0000",
          950: "#5C0000",
        },
        secondary: {
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#E5E5E5",
          400: "#D4D4D4",
          500: "#A3A3A3",
          600: "#737373",
          700: "#525252",
          800: "#363636",
          900: "#171717",
          950: "#0A0A0A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-montserrat)"],
        'mera-pro': ['MeraPro', 'sans-serif'],
      },
      animation: {
        "fade-in": "fade-in 1.5s ease-in-out forwards",
        "fade-in-up": "fade-in-up 1s ease-in-out forwards",
        "fade-in-down": "fade-in-down 1s ease-in-out forwards",
        "slide-in-right": "slide-in-right 1s ease-in-out forwards",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config; 