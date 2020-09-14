'use strict'

const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: {
    index: './src/index.tsx',
    room: './src/room.tsx'
  },
  output: {
    path: resolve(__dirname, '../dist/client'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{
        from: 'static'
      }]
    })
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/room/, to: '/room.html' },
      ]
    },
    proxy: {
      '/socket.io': {
         target: 'ws://localhost:3000/socket.io',
         ws: true
      },
    },
  }
};
