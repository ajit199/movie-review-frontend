/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customPurple: "#6558f4",
        cardBg: "#dfdefd",
        movieName: "#4a5168",
      },
    },
  },
  plugins: [],
};
