const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',

  node: {
    global: true,
    __dirname: false,
    __filename: true,
    process: true,
    Buffer: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  mode: 'production',

  entry: './src/api/index.ts',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

	output: {
		path: path.join(__dirname, '..', '..', 'dist', 'api')
	}
}
