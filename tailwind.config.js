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
  px4: '4px',
  px5: '5px',
  px6: '6px',
  px14: '14px',
  px16: '16px',
  px17: '17px',
  px10: '10px',
  px20: '20px',
  px24: '24px',
  px29: '29px',
  px30: '30px',
  px33: '33px',
  px40: '40px',
  px60: '60px',
  px190: '190px',
  px203: '203px',
  px230: '230px',
  px250: '250px',
  px278: '278px',
  px300: '300px',
  'art-1/3': 'calc(33.33% - 26.66)',
  'art-1/2': 'calc(33.33% - 26.66)',
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
      inset: {
        ...staticPx,
      },
      space: {
        ...staticPx,
      },
      spacing: {
        ...staticPx,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
