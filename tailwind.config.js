const colors = require('tailwindcss/colors')
module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: colors.blue[700],
        light: colors.blue[400],
        dark: colors.blue[800]
      },
      accent: {
        DEFAULT: colors.red[700],
        light: colors.red[400],
        dark: colors.red[800]
      },
      mgray: {
        DEFAULT: '#49494962',
        light: '#49494962',
        dark: '#49494962'
      },
      bg: {
        DEFAULT: colors.white,
        accent: colors.indigo[800]
      },
      text: {
        DEFAULT: colors.black,
        error: colors.red[600],
        white: colors.white
      },
      'primary-bg': {
        DEFAULT: '#30434d',
        light: '#5d7480',
        dark: '#182c36',
        lighter: '#7e9dad',
        darker: '#0b161b'
      },
      'primary-text': {
        DEFAULT: colors.gray[200],
        light: colors.black,
        dark: colors.white,
      },
      'accent-text': {
        DEFAULT: colors.red[700],
        light: colors.red[300],
        dark: colors.red[400]
      },
      'divider': {
        DEFAULT: '#ffffff6b',
        light: '#0000005c',
        dark: '#ffffff6b'
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // import tailwind forms
  ],
}
