const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// gzip 压缩 npm install compression-webpack-plugin -D
const IS_OPEN_GZIP = IS_PROD;
// const IS_OPEN_ANALYZE = false;
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");

module.exports = {
    devServer: {
        // host: "localhost",
        // host: "120.241.104.176",
        port: 8030,
        https: false,
        // 是否自动启动浏览器
        open: false,
        hotOnly: true,
        disableHostCheck: true,
        proxy: {
            "/api": {
                target: process.env.VUE_APP_API,
                pathRewrite: {
                    "^/api": "/"
                },
                // 支持 websocket
                // ws: true,
                // secure: false,
                changeOrigin: true
            },
        },
    },

    publicPath: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_ROUTE_BASE : '/',
    outputDir: 'dist',
    assetsDir: 'static',
    indexPath: 'index.html',
    filenameHashing: true,
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: false,

    configureWebpack: config => {
        const plugins = [];

        // gzip 压缩
        if (IS_OPEN_GZIP) {
            const productionGzipExtensions = ['html', 'js', 'css', 'json', 'txt'];
            const CompressionWebpackPlugin = require("compression-webpack-plugin");
            plugins.push(new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp(
                    '\\.(' + productionGzipExtensions.join('|') + ')$'
                ),
                threshold: 10240,
                minRatio: 0.6,
                deleteOriginalAssets: false
            }));
        }

        config.plugins = [...config.plugins, ...plugins];

        // 不被打包进去（例如 cdn 方式引入）
        const externals = config.externals;
        config.externals = {
            ...externals,
        };

        if(IS_PROD) {
            config.optimization = {
                ...config.optimization,

                // 公共代码抽离
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            chunks: 'all',
                            test: /node_modules/,
                            name: 'vendor',
                            minChunks: 1,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 100
                        },
                        common: {
                            chunks: 'all',
                            test: /[\\/]src[\\/]js[\\/]/,
                            name: 'common',
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 60
                        },
                        styles: {
                            name: 'styles',
                            test: /\.(sa|sc|c)ss$/,
                            chunks: 'all',
                            enforce: true
                        },
                        runtimeChunk: {
                            name: 'manifest'
                        }
                    }
                }
            }
        }
    },

    chainWebpack: config => {
        if(IS_PROD) {
            config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
        }
        config.resolve.symlinks(true);
        config.plugin("html").tap(args => {
                args[0].title = process.env.VUE_APP_TITLE;
                args[0].chunksSortMode = "none";
                return args;
            }
        );
        // 添加别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@layout', resolve('src/layout'))
            .set('@mock', resolve('src/mock'))
            .set('@plugins', resolve('src/plugins'))
            .set('@router', resolve('src/router'))
            .set('@store', resolve('src/store'))
            .set('@views', resolve('src/views'));
        // 压缩图片
        // 需要 npm i -D image-webpack-loader
        /*config.module
            .rule("images")
            .use("image-webpack-loader")
            .loader("image-webpack-loader")
            .options({
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                optipng: {
                    enabled: false
                },
                pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4
                },
                gifsicle: {
                    interlaced: false
                },
                webp: {
                    quality: 75
                }
            });*/
    },

    css: {
        requireModuleExtension: true,
        extract: false,
        sourceMap: false,
        loaderOptions: {
            // npm install -D sass-loader sass
            scss: {
                additionalData: `@import "~@assets/style/index.scss";`
            }
        }
    },
}