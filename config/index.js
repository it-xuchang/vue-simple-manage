"use strict";

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        // 发向这个URL的都会进行代理
        target: "http://localhost:10001", // 实际的请求url
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // 这个定义如何转换真实的请求路径，比如login，不加这一段的时候，路径是http://localhost:8081/baseurl/login ->接下
          // 那么这里定义了把baseurl这个字符串进行替换成/，路径就变成
          "^/api": "/"
        }
      }
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    useEslint: true,
    showEslintErrorsInOverlay: false,

    devtool: "cheap-module-eval-source-map",

    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, "../dist/index.html"),

    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    productionSourceMap: true,
    devtool: "#source-map",
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
