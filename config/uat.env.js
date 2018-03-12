var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"uat"',
  SITE_HOST: '"http://172.16.9.61:6025"', // uat环境host
  SITE_HOST_REPORT_FORM: '"http://172.16.9.61:6017"',
  HOST_SUPPLEMENTMEDICAL: '"http://172.16.9.61:6015"' //健康医疗
})
