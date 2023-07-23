/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "fell-french-canon": ["'IM Fell French Canon'", "serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
