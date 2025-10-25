import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "2px 4px 8px 0 rgba(0, 0, 0, 0.1)",
        "card-shadow": "1px 2px 4px 0 rgba(0, 0, 0, 0.1)",
        "card-hover-shadow": "4px 8px 16px 0 rgba(255, 102, 51, 0.2)",
      },
      colors: {
        "white-100": "#fff",
        "green-100": "#70c05b",
        "grey-100": "#8f8f8f",
        "black-100": "#414141",
        "orange-100": "#f63",
        "grey-200": "#bfbfbf",
        "grey-300": "#f3f2f1",
        "orange-200": "#fcd5ba",
        "beige-100": "#f9f4e2",
        "white-60": "rgba(255, 255, 255, 0.6)",
      },
      textColor: {
        DEFAULT: "#414141",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
