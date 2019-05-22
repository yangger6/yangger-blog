const proxy = {
    '/api': {
        target: 'localhost:3000',
        secure: false,
        changOrigin: true
    },
}
module.exports = proxy
