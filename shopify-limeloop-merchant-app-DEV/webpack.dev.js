const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  mode: "development",
  entry: {
    main: ["./src/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "./",
    filename: `[chunkhash].[name].bundle.js`
  },
  resolve: {
    extensions: [".jsx", ".js"],
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader"
      },
      {
        test: /\.(js|jsx)$/, // files ending with .js
        exclude: /node_modules/, // exclude the node_modules directory
        loader: "babel-loader",  // use this (babel-core) loader
        options: {
          plugins: ["@babel/transform-runtime"]
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin(),
    // Create the dist HTML file with variables defined in src/config
    new HtmlWebpackPlugin({ title: "The LimeLoop App" }),

    // Sets variables to be usable in the JS
    new webpack.DefinePlugin({
      'process.env.SHOPIFY_API_KEY': JSON.stringify(process.env.SHOPIFY_API_KEY),
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    })
  ],
  externals: {
    polaris: "@shopify/polaris"
  },
  devtool: "source-map"
};
