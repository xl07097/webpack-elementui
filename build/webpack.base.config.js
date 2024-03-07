const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
    admin: path.resolve(__dirname, '../src/admin.js'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 5,
              esModule: false,
              name: path.posix.join('static', 'img/[name].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              esModule: false,
              name: path.posix.join('static', 'fonts/[name].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(mp4|mp3)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              esModule: false,
              name: path.posix.join('static', 'media/[name].[ext]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'vue 练习',
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: 'app', // 生成了 html 文件后会自动加载对应的 JS
      // inject: true
    }),
    new HtmlWebpackPlugin({
      title: 'vue admin',
      filename: path.resolve(__dirname, '../dist/admin.html'),
      template: path.resolve(__dirname, '../public/index.html'),
      chunks: 'admin', // 生成了 html 文件后会自动加载对应的 JS
      // inject: true
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public/static'), to: 'static' },
      ],
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      // 'scss-loader': 'sass-loader',
    },
    extensions: ['.js', '.json', '.vue'],
  },
}
