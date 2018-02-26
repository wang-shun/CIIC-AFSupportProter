var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"dev"',
  NODE_ENV: '"development"',
  SITE_HOST: '"http://localhost:6025"',
  SITE_HOST_REPORT_FORM: '"http://localhost:6017"'
})
