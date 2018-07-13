var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"lpt"',
  COMMON_SERVICE_HOST: '"http://172.16.9.68:9621"',
  SYSTEM_MANAGE_SERVICE_HOST: '"http://172.16.9.69:2003"',
  TOKEN_URL: '"http://172.16.9.68:8070/#/menu"',
  LOGIN_URL: '"http://172.16.9.68:8070"',
  LOCAL_URL: '"http://172.16.9.68"',
  SITE_HOST: '"http://172.16.9.69:6025"', // lpt环境host
  SITE_HOST_REPORT_FORM: '"http://172.16.9.69:6017"',
  SERVER_HOST: '"http://172.16.9.68"'
})
