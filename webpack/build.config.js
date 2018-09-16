const path = require('path')
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
  },

	output: {
    filename: '[name].[contenthash].js',
		path: path.join(__dirname, '..', '..', 'dist')
	}
})
