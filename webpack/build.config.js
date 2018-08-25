const merge = require('webpack-merge')
const baseConfig = require('./base.config')

module.exports = merge(baseConfig, {
  mode: 'production',

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  }
})
