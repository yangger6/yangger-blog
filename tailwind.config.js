const themeColors = {
  primary: '#7BF0BE',
  ash: '#CCC',
  grayGreen: '#74CCA7',
  black: '#000',
}
const staticPx = {
  '-px5': '-5px',
  '-px24': '-24px',
  px2: '2px',
  px5: '5px',
  px14: '14px',
  px17: '17px',
  px10: '10px',
  px20: '20px',
  px24: '24px',
  px40: '40px',
  px60: '60px',
  px250: '250px',
  px300: '300px',
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
        ...staticPx,
      },
      height: {
        ...staticPx,
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
      translate: {
        ...staticPx,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
