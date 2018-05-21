let path = require('path');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  let glob = require("glob");
  let plugins = [
  ];

  let PROD = env && env.production;
  if (PROD) plugins.push(new UglifyJSPlugin());

  return {
    entry: {
        "pangloss-map-styles": "./pangloss-styles.js",
        "pangloss-map": "./pangloss.js",
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    devtool: 'inline-source-map',
    module: {
      rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          publicPath: "/bundle/",
          limit: 10000
        }
      }],
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          compact: false
        }
      }]
    },
    plugins
  };
};

