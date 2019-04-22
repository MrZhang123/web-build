const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Stylish = require("webpack-stylish");
const CommonConfig = require("../config");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const devMode = process.env.NODE_ENV === "development";
const ASSET_PATH = CommonConfig.getWebpackpublicPath();

module.exports = {
  entry: {
    main: ["@babel/polyfill", path.resolve(__dirname, "../src/main.js")]
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: ASSET_PATH,
    filename: "[name].js",
    chunkFilename: "chunk/[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {}
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "./static/img/[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".web.js", ".js", ".jsx", ".json"]
  },
  mode: devMode ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "React App",
      template: path.resolve(__dirname, "../public/index.html"),
      favicon: path.resolve(__dirname, "../public/favicon.ico"), // 不知道怎么设置，设置了没用
      minify: devMode
        ? false
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            html5: true,
            minifyCSS: true,
            removeComments: true,
            removeEmptyAttributes: true
          },
      cache: true
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? "[name].css" : "style/[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "style/[id].[hash].css"
    }),
    new Stylish()
    // new BundleAnalyzerPlugin()
  ]
};
