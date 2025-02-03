/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home" : "url('/bg.svg')"
      },
      backgroundSize: {
        "home-xl": "50%"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}