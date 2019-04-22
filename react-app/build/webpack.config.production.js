const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const config = require("./webpack.config.base");

config.optimization = {
  splitChunks: {
    chunks: "all",
    // minChunks: 1, // what means about minChunks ?
    name: "common"
  },
  minimize: true,
  runtimeChunk: {
    name: "runtime"
  }
};
config.performance = {
  hints: false
};

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(["dist"], {
    root: path.resolve(__dirname, "../")
  }),
  new webpack.HashedModuleIdsPlugin()
]);

module.exports = config;
