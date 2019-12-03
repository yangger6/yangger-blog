const proxy = {
    '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
    },
}
module.exports = proxy
