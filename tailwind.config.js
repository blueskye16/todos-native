/** @type {import('tailwindcss').Config} */
import theme from 'tailwindcss/defaultTheme';
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./*.html"],
  theme: {
    fontFamily: {
      'body': ['"Poppins"']
    },
    extend: {},
  },
  plugins: [],
}

