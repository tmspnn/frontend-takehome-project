// Environment and Version
const isProduction = process.env.NODE_ENV == "production";
const version = require("./package.json").version;

// Internal modules
const fs = require("fs");

// External modules
const _ = require("lodash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

// Entries
const pages = fs.readdirSync("./app/pages");

module.exports = {
  context: __dirname + "/app",
  mode: isProduction ? "production" : "development",
  entry: _(pages)
    .keyBy()
    .mapValues((p) => `/pages/${p}/${p}.ts`)
    .value(),
  output: {
    path: __dirname + "/build",
    filename: `[name]-${version}.js`,
    publicPath: ""
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: '@import "app/components/base.scss";'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: false,
  plugins: [
    ...pages.map((p) => new HtmlWebpackPlugin({ filename: p + ".html" })),
    ...pages.map(
      () => new MiniCssExtractPlugin({ filename: `[name]-${version}.css` })
    )
  ]
};
