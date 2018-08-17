const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base.config')

const HOST = 'localhost'
const PORT = 8080

module.exports = merge(baseConfig, {
  mode: 'development',

  resolve: {
    alias: {
      theme: path.resolve(__dirname, 'src/frontend/scss/theme')
    },
  },

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: HOST,
    port: PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:9090',
        pathRewrite: {'^/api' : ''}
      }
    },
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
