const path = require('path');
const { VueLoaderPlugin } = require("vue-loader");


module.exports = {
  entry  : {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  output : {
    path: path.resolve(__dirname, '../dist/dist')
  },
  module : {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                less: 'vue-style-loader!css-loader!less-loader',
              }
            }
          }
        ]
      },
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        use : ['babel-loader']
      },
      {
        test  : /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        test  : /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.vue' ]
  },
  plugins: [new VueLoaderPlugin()]
}
