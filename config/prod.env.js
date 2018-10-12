var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"prod"',
  COMMON_SERVICE_HOST: '"http://172.16.100.103:9621"',
  SYSTEM_MANAGE_SERVICE_HOST: '"http://172.16.100.105:2003"',
  // TOKEN_URL: '"http://172.16.100.104:8070/#/menu"',
  // LOGIN_URL: '"http://172.16.100.104:8070"',
  // LOCAL_URL: '"http://172.16.100.104"',
  TOKEN_URL: '"http://gtone.ciicsh.com/#/menu"',
  LOGIN_URL: '"http://gtone.ciicsh.com"',
  LOCAL_URL: '"http://gtone.ciicsh.com"',
  SITE_HOST: '"http://172.16.100.106:6025"', // 证件管理
  SITE_HOST_REPORT_FORM: '"http://172.16.100.106:6017"',//弹性福利
  SERVER_HOST: '"http://172.16.100.103"' //公共服务地址
})
