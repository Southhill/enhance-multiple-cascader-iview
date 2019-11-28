const path = require("path");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const wpBaseConfig = require("./webpack.base.config");

process.env.NODE_ENV = "production";

module.exports = merge(wpBaseConfig, {
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
  plugins: [new UglifyJsPlugin()]
});
