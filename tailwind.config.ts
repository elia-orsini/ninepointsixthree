import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: "12px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
        "19": "repeat(19, minmax(0, 1fr))",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        emailWidgetUp: {
          "0%": {
            transform: "translateY(100px)",
            opacity: "0",
            backdropFilter: "blur(0px) opacity(0)",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
            backdropFilter: "blur(22px) opacity(1)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        fadeUp: "fadeUp 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        emailWidgetUp: "emailWidgetUp 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
