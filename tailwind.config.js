/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "src/script/script.js"],
  theme: {
    extend: {
      fontFamily: {
        pop: ["Poppins", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-yellow-400",
    "bg-red-400",
    "bg-green-400",
    "bg-teal-500",
    "border-l-yellow-400",
    "border-l-red-400",
    "border-l-green-400",
    "border-l-teal-500",
  ],
  plugins: [],
  darkMode: "class"
};
