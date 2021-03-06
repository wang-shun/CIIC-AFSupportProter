// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var config = require('../src/lib/config')
let buildParam = process.argv.slice(2)  // 获取命令行参数
let env
if (buildParam) {
  let envParam = buildParam[0]
  switch (envParam) {
    case 'dev':
      env = require('./dev.env')
      break;
    case 'sit':
      env = require('./sit.env')
      break;
    case 'lpt':
      env = require('./lpt.env')
      break;
    case 'uat':
      env = require('./uat.env')
      break
    default:
      env = require('./prod.env')
  }
} else {
  env = require('./prod.env')
}


module.exports = {
  build: {
    env: env,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8108,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: config.proxyTable,
    // proxyTable: {
    //   '/demo/routers': {
    //     target: 'http://10.66.2.36:8080',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/demo/routers': '/demo/routers'
    //     }
    //   }
    // },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
