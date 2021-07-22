const themeColors = {
  primary: '#7BF0BE',
  ash: '#CCC',
  grayGreen: '#74CCA7',
  black: '#000',
}
const staticPx = {
  px60: '60px',
  px2: '2px',
  px14: '14px',
  px17: '17px',
}
module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        md: '900px',
      },
      colors: themeColors,
      width: {
        '275/16': '17.1875rem',
      },
      margin: {
        ...staticPx,
      },
      padding: {
        ...staticPx,
      },
      gap: {
        ...staticPx,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
