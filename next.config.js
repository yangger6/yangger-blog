const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? process.env.NEXT_PUBLIC_BASE_PATH : '',
  images: {
    loader: 'imgix',
    path: '',
  },
}
