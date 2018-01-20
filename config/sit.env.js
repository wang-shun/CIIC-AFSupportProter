var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  SITE_HOST: '"http://172.16.9.24:6025"' // sit环境host
})
