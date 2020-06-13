const path = require("path");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const wpBaseConfig = require("./webpack.base.config");

module.exports = merge(wpBaseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "enhance-multiple-cascader.js",
    library: "enhance-multiple-cascader",
    libraryTarget: "umd"
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue"
    }
  },
  plugins: [new UglifyJsPlugin()],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 5000000,
    maxAssetSize: 3000000, // 3Mb
    assetFilter: function (assetFileName) {
      return assetFileName.endsWith('.js')
    }
  }
});
