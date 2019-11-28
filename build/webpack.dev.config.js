const merge = require("webpack-merge");

const wpBaseConfig = require("./webpack.base.config");

module.exports = merge(wpBaseConfig, {
  devtool: "#source-map",
  devServer: {
    publicPath: "/dist/",
    // contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  output: {
    path: "/dist/",
    filename: "enhance-multiple-cascader.js.js",
    library: "enhance-multiple-cascader",
    libraryTarget: "umd"
  }
});
