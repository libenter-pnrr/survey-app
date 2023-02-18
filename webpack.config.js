"use strict";

const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  return {
    output: {
      publicPath: "/",
      filename: "[name].js",
      clean: true,
    },
    devtool: "inline-source-map",
    resolve: {
      alias: {
        "@application": path.join(__dirname, "src/application"),
        "@pages": path.join(__dirname, "src/pages"),
        "@hooks": path.join(__dirname, "src/hooks"),
        "@contexts": path.join(__dirname, "src/contexts"),
        "@common": path.join(__dirname, "src/common"),
        "@utils": path.join(__dirname, "src/utils"),
        "@reducers": path.join(__dirname, "src/reducers"),
        "@assets": path.join(__dirname, "src/assets"),
      },
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
    },
    devServer: {
      port: 3001,
      historyApiFallback: true,
      compress: false,
    },
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        { test: /\.json$/, type: "json" },
        {
          test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            outputPath: "./",
            publicPath: "/",
          },
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
      new Dotenv({
        path: `./environments/.env${
          Object.keys(env)[Object.keys(env).length - 1]
            ? `.${Object.keys(env)[Object.keys(env).length - 1]}`
            : ""
        }`,
      }),
    ],
  };
};
