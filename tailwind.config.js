/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        primary: "#00D5FF",
        secondary: "#25EFD2",
        background: "#F8FAFA",
        tcolor: "#2E2F3A",
        purple: "#8E77D1"
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
