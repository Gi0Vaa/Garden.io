/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          light: '#b8db9e',
          dark: '#1f482e'
        },
      }
    },
  },
  plugins: [],
}