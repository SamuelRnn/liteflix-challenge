/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#242424",
        mask: "rgb(12,12,12)",
        aqua: "#64EEBC",
      },
      width: {
        main: "min(80rem, 90%)",
        modal: "min(36rem, 100%)",
      },
    },
  },
  plugins: [],
};
