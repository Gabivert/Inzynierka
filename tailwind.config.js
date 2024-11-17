/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}', 
    './components/**/*.{js,jsx,ts,tsx}',  // Dodaj również komponenty
    './screens/**/*.{js,jsx,ts,tsx}',    // Jeśli to konieczne, dodaj również folder screens
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'custom-light': '#C4DFE6',  // Twój pierwszy kolor
        'custom-dark': '#66A5AD',   // Twój drugi kolor
        'custom-blue-dark': '#187C94',
      },
    },
  },
  plugins: [],
};