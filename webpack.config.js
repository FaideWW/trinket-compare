const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.csv$/,
        use: 'csv-loader',
      }
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => (module.context && module.context.indexOf('node_modules') !== -1),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'Trinket Comparison',
      appMountId: 'app',
    }),
  ],
  devtool: "cheap-eval-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  }
};
