var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    env: '"prod"',
    SITE_HOST: '"http://172.16.100.106:6025"', // 证件管理
    SITE_HOST_REPORT_FORM: '"http://172.16.100.106:6017"',//弹性福利
    HOST_SUPPLEMENTMEDICAL: '"http://172.16.100.106:6013"', //健康医疗
    HOME_HOST: '"http://172.16.100.104"',//大首页地址
    SERVER_HOST: '"http://172.16.100.103"' //公共服务地址
})
