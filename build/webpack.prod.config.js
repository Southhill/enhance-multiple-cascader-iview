const wpBaseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = merge(wpBaseConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'multi-cascader.js',
    library: 'multiCascader',
    libraryTarget: 'umd',
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new UglifyJsPlugin()
  ]
})
