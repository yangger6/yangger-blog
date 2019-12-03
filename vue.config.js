const HappyPack = require('happypack')
const webpack = require('webpack')
const cpuLength = require('os').cpus().length
console.log(`cpu -> ${cpuLength}`)
const happyThreadPool = HappyPack.ThreadPool({ size: cpuLength})
module.exports = {
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    configureWebpack: config => {
        // https://segmentfault.com/a/1190000014586699
        // 蛇形没办法
        // require('vux-loader').merge(config, {
        //   options: {},
        //   plugins: ['vux-ui']
        // })
        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...
            //提取webpack运行时的代码
            // config.optimization.runtimeChunk = {
            //   name: 'manifest.build'
            // }
            config.optimization.providedExports = true
            config.optimization.usedExports = true
            config.optimization.sideEffects= true   // sideEffects开启时可以剔除无用的模块，用来做tree-shake。当模块的package.json中添加该字段时，表明该模块没有副作用，也就意味着webpack可以安全地清除被用于重复导出(re-exports)的代码。
            config.optimization.concatenateModules = true // concatenateModules取代了webpack.optimize.ModuleConcatenationPlugin()插件
            config.optimization.noEmitOnErrors = true // noEmitOnErrors取代了new webpack.NoEmitOnErrorsPlugin()插件。
            config.optimization.splitChunks.cacheGroups.common.chunks = 'all'
            config.optimization.splitChunks.cacheGroups.vendors.chunks = 'all'
            config.optimization.splitChunks.cacheGroups.common.minChunks = 2
            config.optimization.splitChunks.cacheGroups.vendors.minChunks = 2   // minChunks是split前，有共享模块的chunks的最小数目
            config.plugins.push(new webpack.HashedModuleIdsPlugin())  // 需要HashedModuleIdsPlugin了，它是根据模块相对路径生成模块标识，如果模块没有改变，那模块标识也不会改变, 打包顺序会影响魔块id,所以要固定
        } else {
            // mutate for development...
        }
        const happyPackPlugin= new HappyPack({ // 打包加速插件
            loaders: [{
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                    cacheDirectory: true
                }
            }],
            threadPool: happyThreadPool
        })
        config.plugins.push(...[happyPackPlugin])
    },
    pages: {
        index: {
            entry: 'src/main.ts',
            template: 'src/ejs/index.ejs',
            filename: 'index.html',
        }
    },
    chainWebpack: config => {
        config.module
            .rule('ejs')
            .test(/\.ejs$/)
            .use('ejs-compiled-loader')
            .loader('ejs-compiled-loader')
        const jsRule = config.module.rule('js')
        jsRule.uses.clear()
        jsRule
            .use('happypack/loader')
            .loader('happypack/loader')
            .options({
                sourceMap: true
            })
    },
    productionSourceMap: false, // 不需要生产环境的 source map
    parallel: cpuLength > 1, // 构建时开启多进程处理babel编译
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 9091,
        https: false,
        hotOnly: true,
        proxy: require('./src/config/proxy'),
    }
}
