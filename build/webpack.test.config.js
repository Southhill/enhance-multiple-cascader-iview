const path = require("path");

function resolve (dir){
  return path.join(__dirname, dir);
}

module.exports = {
  module : {
    rules: [
      {
        test   : /\.vue$/,
        loader : 'vue-loader',
        include: [
          resolve("../src"),
          resolve("../test"),
        ],
        options: {
          less: 'vue-style-loader!css-loader!less-loader',
        }
      },
      {
        test   : /\.js$/,
        loader : 'babel-loader',
        include: [
          resolve("../src"),
          resolve("../test"),
        ],
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias     : {
      'vue$': 'vue/dist/vue.esm.js',
      '@'   : resolve('../src'),
      'test': resolve('../test'),
    }
  }
};
