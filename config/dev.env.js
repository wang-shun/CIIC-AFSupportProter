var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  env: '"dev"',
  NODE_ENV: '"development"',
  SITE_HOST: '"http://localhost:6025"'
})
