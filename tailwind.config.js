/** @type {import('tailwindcss').Config} */

const colors = {
  Viridian: "#007f5f",
  SeaGreen: "#2b9348",
  KellyGreen: "#55a630",
  AppleGreen: "#80b918",
  YellowGreen: "#aacc00",
  Pear: "#bfd200",
  Pear2: "#d4d700",
  Pear3: "#dddf00",
  Yellow: "#eeef20",
  Yellow2: "#ffff3f",
};

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: colors,
      textColor: colors,
      borderColor: colors,
      gradientColorStops: colors,
      fontFamily: {
        sans: ["Roboto", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
    },
  },
  plugins: [],
};
