const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          }
        ],
        sideEffects: true
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new FixStyleOnlyEntriesPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/')
        }
      ]
    }),
    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'Foody Apps',
      short_name: 'Foody',
      description: 'Restaurant catalogue web app',
      theme_color: '#fff',
      background_color: '#fff',
      display: 'standalone',
      orientation: 'portrait',
      start_url: './index.html',
      crossorigin: 'use-credentials',
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/icons/app-icon.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: path.join('icons', 'ios'),
          ios: true,
          purpose: 'maskable'
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icons/app-icon.png'),
          size: 1024,
          destination: path.join('icons', 'ios'),
          ios: 'startup'
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icons/app-icon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: path.join('icons', 'android'),
          purpose: 'maskable'
        }
      ]
    }),
    new InjectManifest({
      swSrc: './src/scripts/service-worker.js',
      swDest: 'service-worker.js'
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true
        }),
        imageminPngquant({
          quality: [0.3, 0.5]
        })
      ]
    })
  ]
};
