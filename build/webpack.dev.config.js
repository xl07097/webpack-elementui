const {merge} = require('webpack-merge')
const path = require('path')
const baseConfig = require("./webpack.base.config")

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: '../dist',
        historyApiFallback: true,
        open: true,
        hot: true,
        port: '9810'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'vue-style-loader', {
                    loader: 'css-loader',
                    options: {
                        esModule: false
                    }
                }, 'postcss-loader']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'vue-style-loader', {
                    loader: 'css-loader',
                    options: {
                        esModule: false
                    }
                }, 'postcss-loader', {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }]
            },
            {
                test: /.(sass|scss)$/,
                use: ['style-loader', 'vue-style-loader', {
                    loader: 'css-loader',
                    options: {
                        esModule: false
                    }
                }, 'postcss-loader', 'sass-loader']
            }
        ]
    }
})
