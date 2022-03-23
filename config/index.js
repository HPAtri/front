/**
 * @Author           : Albert Wang
 * @Copyright Notice : Copyright (c) 2022 Albert Wang 王子睿, All Rights Reserved.
 * @Time             : 2022-03-10 12:29:11
 * @Description      :
 * @Email            : shadowofgost@outlook.com
 * @FilePath         : /WebBackendc:/Users/shado/Desktop/Desktop/Documents/ComputerProgramme/Code/front/config/index.js
 * @LastAuthor       : Albert Wang
 * @LastTime         : 2022-03-10 14:19:02
 * @Software         : Vscode
 */
"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "./", //'./'
    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    proxyTable: {
      '/api/**': {
        target: 'http://localhost:9001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //重写访问地址，在请求时可以省略target的地址，直接以/api开头
        }
      }
    },

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  server: {
    https: false,
    hotOnly: false,
    proxyTable: {
      "/api": {
        target: "https://lianghj.top:8888/api/private/v1/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" //重写访问地址，在请求时可以省略target的地址，直接以/api开头
        }
      }
    }
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./", //'./'

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    proxyTable: {
      "/api": {
        target: "http://47.117.68.250:80",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" //重写访问地址，在请求时可以省略target的地址，直接以/api开头
        }
      }
    }
  }
};
