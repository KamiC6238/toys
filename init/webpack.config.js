const HtmlWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')

module.exports = {
  entry: './src/main.tsx',
  output: {
    filename: './bundle.js',
  },
  mode: 'development',
  devServer: {
    publicPath: '/dist',
  },
  resolve: {
    alias: {},
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [{
      test: /\.(tsx|ts|js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            '@babel/preset-env',
            // '@babel/preset-es2015'
          ],
        }
      }, 'ts-loader']
    }, {
      test: /\.(jpg|png|gif)$/,
      use: 'file-loader'
    }, {
      test: /\.(css)$/,
      use: ['css-loader']
    }, {
      test: /\.js$/,
      use: [join(__dirname, 'webpack', 'loaders', 'strict-loader.js')]
    }]
  },
  plugins: [new HtmlWebpackPlugin()]
}