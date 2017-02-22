import webpack from 'webpack'
import path from 'path'
import packageJson from '../package.json'

const config = [{
  context: __dirname,

  entry: {
    demo: './src/index.js',
    virtualList: '../lib/VirtualList.js'
  },

  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2']
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['virtualList']
    }),
    new webpack.DefinePlugin({
      PACKAGE_NAME: JSON.stringify(packageJson.name),
      PACKAGE_VERSION: JSON.stringify(packageJson.version),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}]

export default config
