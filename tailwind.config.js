/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './index.tsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: require('tailwindcss/colors').slate,
        accent: require('tailwindcss/colors').yellow,
        secondary: require('tailwindcss/colors').sky,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif']
      }
    }
  },
  plugins: []
}
