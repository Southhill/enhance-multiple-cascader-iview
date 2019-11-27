const wpBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(wpBaseConfig, {
  devtool: '#source-map',
  devServer: {
    publicPath: '/dist/',
    // contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  output: {
    path: '/dist/',
    filename: 'multi-cascader.js',
    library: 'multiCascader',
    libraryTarget: 'umd',
  },
})

