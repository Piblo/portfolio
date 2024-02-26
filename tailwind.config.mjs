const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
      },
      textColor: {
        secondary: "#a3a3a3",
        tertiary: "#737373",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
