var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"sit"',
  COMMON_SERVICE_HOST: '"http://172.16.9.24:9621"',
  SYSTEM_MANAGE_SERVICE_HOST: '"http://172.16.9.24:2003"',
  TOKEN_URL: '"http://172.16.9.25:8070/#/menu"',
  LOGIN_URL: '"http://172.16.9.25:8070"',
  LOCAL_URL: '"http://172.16.9.25"',
  SITE_HOST: '"http://172.16.9.29:6025"', // sit环境host
  SITE_HOST_REPORT_FORM: '"http://172.16.9.29:6017"',
  SERVER_HOST: '"http://172.16.9.24"'
})
