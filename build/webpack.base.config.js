const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
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
      // inject: true
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public/static'), to: 'static' },
      ],
    }),
    // new WorkboxWebpackPlugin.GenerateSW({
    //   // importWorkboxFrom: 'local',
    //   // name: 'lp',
    //   clientsClaim: true, //这些选项帮助快速启用
    //   skipWaiting: true, //不允许遗留任何“旧的”
    //   maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    //   // swDest: path.join(__dirname, '../src/sw.js'),
    //   // runtimeCaching: [
    //   //   {
    //   //     // To match cross-origin requests, use a RegExp that matches
    //   //     // the start of the origin:
    //   //     urlPattern: new RegExp('^https://api'),
    //   //     handler: 'staleWhileRevalidate',
    //   //     options: {
    //   //       // Configure which responses are considered cacheable.
    //   //       cacheableResponse: {
    //   //         statuses: [200],
    //   //       },
    //   //     },
    //   //   },
    //   //   {
    //   //     urlPattern: new RegExp('^https://cdn'),
    //   //     // Apply a network-first strategy.
    //   //     handler: 'networkFirst',
    //   //     options: {
    //   //       // Fall back to the cache after 2 seconds.
    //   //       networkTimeoutSeconds: 2,
    //   //       cacheableResponse: {
    //   //         statuses: [200],
    //   //       },
    //   //     },
    //   //   },
    //   // ],
    // }),
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
