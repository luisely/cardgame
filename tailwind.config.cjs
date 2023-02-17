/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'card-sides': ['Julee'],
        'card-other': ['Viga'],
      },
    },
  },
  plugins: [],
}
