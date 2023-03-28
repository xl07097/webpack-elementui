const { merge } = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 10002,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    port: '9810',
    proxy: {
      '/api': {
        target: 'https://note.zhiqiuge.com',
        // target: 'http://localhost:9087/note',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /.(sass|scss)$/,
        use: [
          'style-loader',
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              // prependData: `@use "@/styles/function.scss" as *;`
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
})
