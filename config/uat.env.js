var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"uat"',
  COMMON_SERVICE_HOST: '"http://172.16.9.56:9621"',
  SYSTEM_MANAGE_SERVICE_HOST: '"http://172.16.9.60:2003"',
  TOKEN_URL: '"http://172.16.9.60:8070/#/menu"',
  LOGIN_URL: '"http://172.16.9.60:8070"',
  LOCAL_URL: '"http://172.16.9.60"',
  SITE_HOST: '"http://172.16.9.61:6025"', // uat环境host
  SITE_HOST_REPORT_FORM: '"http://172.16.9.61:6017"',
  SERVER_HOST: '"http://172.16.9.56"'
})
