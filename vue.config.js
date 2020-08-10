// vue.config.js
const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  // 相对路径
  publicPath: "./",
  // 压缩
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          // 超过4kb压缩
          threshold: 4096
        })
      );
    }
  }
};
