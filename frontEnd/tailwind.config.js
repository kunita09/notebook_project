/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "LightGray" :"#D3D3D3",
<<<<<<< HEAD
        "KKU" : "#A73B24"
=======
        "KKU" : "#A73B24",
        "blue" :"#283593"
>>>>>>> 48db2e4de287f3c3de6eded6cf39f736e2d3fa35
      },
      fontFamily: {
        sans: ['Prompt', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
        kanit: ['Kanit', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}