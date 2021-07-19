const themeColors = {
  primary: '#7BF0BE',
  ash: '#CCC',
  grayGreen: '#74CCA7',
  black: '#000',
}
module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: '1.2rem',
      sm: '1.3rem', // 标签
      base: '1.6rem', // 正文 小标题
      lg: '2.4rem', // 大正文 副标题
      xl: '3.6rem', // 标题
      '2xl': '7.2rem',
    },
    extend: {
      colors: themeColors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
