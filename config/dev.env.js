var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"dev"',
  NODE_ENV: '"development"',
  COMMON_SERVICE_HOST: '"http://172.16.9.31:9621"',
  SYSTEM_MANAGE_SERVICE_HOST: '"http://172.16.9.31:2003"',
  TOKEN_URL: '"http://localhost:8070/#/menu"',
  LOGIN_URL: '"http://localhost:8070"',
  LOCAL_URL: '"http://localhost"',
  SITE_HOST: '"http://localhost:6025"',//证件管理
  SITE_HOST_REPORT_FORM: '"http://localhost:6017"', //弹性福利
  SERVER_HOST: '"http://172.16.9.31"'
})
