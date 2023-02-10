const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackQRCodePlugin = require("webpack-dev-server-qr-code");

const production = process.env.NODE_ENV === "production";

module.exports = {
  mode: production ? "production" : "development",
  entry: {
    App: path.resolve(__dirname, "./src/main.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: production ? "[name].[contenthash].js" : "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /node_modules/,
        use: [
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: !production,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: !production,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".scss"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: production ? "[name].[contenthash].css" : "[name].css",
    }),
    new WebpackQRCodePlugin({ size: "small" }),
  ],
  devServer: {
    port: 9000,
    host: "0.0.0.0",
    open: true,
  },
};
