const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
/*const nodeExternals = require('webpack-node-externals');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/public/index.html',
    filename: 'index.html',
    inject: 'body'
});*/

module.exports = {
  entry: {
    index: __dirname + '/src/app/draw.js',
    grid: __dirname + '/src/app/grid.js'
  },
  mode: 'development',
  //target: 'node', // in order too ignore built-in modules like path, fs, etc.
  //externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/src/public/js'
    },
    plugins: [
      new VueLoaderPlugin()
      /*, HTMLWebpackPluginConfig*/
    ]
};
