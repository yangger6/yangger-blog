module.exports = {
  plugins: {
    '@moohng/postcss-px2vw': {
      viewportWidth: 375,
      rootValue: 37.5,
      minPixelValue: 5,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
}
