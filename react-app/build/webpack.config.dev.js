const webpack = require("webpack");
const config = require("./webpack.config.base.js");
const WebpackDevServer = require("webpack-dev-server");
const opener = require("opener");
const PORT = process.env.PORT || 8000;

config.entry.main = (config.entry.main || []).concat([
  // 'react-hot-loader/patch', // Code is automatically patched in v4
  `webpack-dev-server/client?http://localhost:${PORT}/`,
  "webpack/hot/dev-server"
]);

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin()
]);

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  hot: true,
  // noInfo: true,
  quiet: true,
  historyApiFallback: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

server.listen(PORT, "localhost", () => {
  console.log(`server started at localhost:${PORT}`);
  // opener(`http://localhost:${PORT}`)
});
