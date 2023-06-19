const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
var SwRegisterWebpackPlugin = require('sw-register-webpack-plugin')
const workboxConfig = require('../src/config/workbox')

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[fullhash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 10,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'initial',
      // minSize: 20000,
      minChunks: 1,
      // maxAsyncRequests: 5,
      maxInitialRequests: 3,
      // name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          // chunks: 'all',
          priority: -10,
        },
        common: {
          name: 'common',
          test: /[\\/]vue|vue-router|vuex[\\/]/,
          // chunks: 'all',
          priority: 1,
        },
        element: {
          name: 'element',
          test: /[\\/]element-ui[\\/]/,
          // chunks: 'all',
          priority: 5,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css',
      chunkFilename: 'css/[id].[fullhash].css',
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      directoryIndex: './dist', // 缓存的目录
      // globPatterns: ['**/*.{html,js,css}'], //缓存的静态文件类型, 可以是html，js，css等
      swDest: path.join(__dirname, '../dist/sw.js'), // sw生成后路径
      clientsClaim: true, // sw立即接管网页
      skipWaiting: true, // 新旧sw更新等待
    }),
    new SwRegisterWebpackPlugin({
      filePath: path.resolve(__dirname, '../src/sw-register.js'),
      // filePath 文件路径
      // prefix 文件前缀，解决cdn路径问题
      // output sw-register输出文件
      // excludes 排除某些不需要sw的页面
    }),
  ],
})
