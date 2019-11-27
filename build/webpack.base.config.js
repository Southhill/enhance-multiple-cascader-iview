const path = require('path');

function resolve (dir){
  return path.join(__dirname, dir);
}

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
        test   : /\.vue$/,
        loader : 'vue-loader',
        options: {
          less: 'vue-style-loader!css-loader!less-loader',
        }
      },
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader'
      },
      {
        test  : /\.less$/,
        loader: [ 'style-loader', 'css-loader', 'less-loader' ]
      },
      {
        test  : /\.css$/,
        loader: [ 'style-loader', 'css-loader' ]
      },
      {
        test  : /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8196',
      },
      {
        test  : /\.(woff|eot|ttf)$/,
        loader: 'url-loader'
      },
    ]
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias     : {
      'vue$': 'vue/dist/vue.esm.js',
      '@'   : resolve('../src'),
      'test': resolve('../test'),
    }
  },
}
