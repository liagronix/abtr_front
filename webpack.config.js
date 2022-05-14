// import DoISuportIt from './components/DoISuportIt';
const path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || '/static/js/';

const Dotenv = require('dotenv-webpack');
// const ExtractTextPlugin = require ('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// node: {
//   fs: 'empty'
// }

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  // entry: './src/index.js',
  entry: {
    index: './src/index.tsx',
    //buttons: './src/components/App.js',
  },
  output: {
    // filename: 'main.js',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, "/static/js"),
    publicPath: ASSET_PATH,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "nosources-source-map",
  // devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    fallback: {
      // crypto: false
   //    assert: require.resolve('assert'),
      // crypto: require.resolve('crypto-es'),
   //    stream: require.resolve('stream-browserify'),
   //    "buffer": require.resolve("buffer"),
   //    "util": require.resolve("util/"),
   //    "path": require.resolve("path-browserify"),
      // "cryptocrypto": require.resolve("crypto-browserify"),
   },

  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.modules\.(sa|sc|c)ss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: process.env.ASSET_PATH || '/css/',
          //   },
          // },
          "css-loader", "postcss-loader"
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp)$/,
        use: {
            loader: 'file-loader',
            options: {
              //publicPath: '',
              publicPath: './static/img',
              outputPath: './static/img',
            },
          },
      },
      {
        test: /\.modules\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin({
			excludeAliases: ["crypto"]
		}),
    new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
    // new webpack.DefinePlugin({
    //          'process.env.NODE_ENV': '"production"'
    // }),
    // new MiniCssExtractPlugin({
    //   filename: "../css/[name].css",
    //   chunkFilename: "../css/[id].css",
    // })
  ]

};
