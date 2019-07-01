const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  // template: "./src/index.html",
  template: path.resolve(__dirname, 'src', 'index.html'),
  filename: "./index.html"
});
var Inliner = require('inliner');
const fs = require('fs');
const exec = require('child_process').exec;

const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: 'src/fonts',
    to: 'fonts',
  },
  {
    from: 'src/css',
    to: 'css',
  }
]);


module.exports = env => {

  let plugins = [htmlWebpackPlugin,copyWebpackPlugin];

  if(env.NODE_ENV === 'inline'){
    plugins.push(new inlineContent());
  }


  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                outputPath: 'css'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader", // compiles Sass to CSS, using Node Sass by default
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/sass/vars.scss', './src/sass/mixins.scss', './src/sass/mixins.scss', './src/sass/fontawesome/fontawesome.scss']
              },
            },
          ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images/'
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'src/assets'),
        css: path.resolve(__dirname, 'src/css'),
      }
    },
    plugins: plugins
  }
};

class inlineContent {

  apply(compiler){
    compiler.hooks.done.tap('InlineContentPlugin', params => {
      new Inliner('./dist/index.html', function (error, html) {
        fs.writeFile("./dist/index.production.html", html, function (err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        });

      });
    });
  }

}