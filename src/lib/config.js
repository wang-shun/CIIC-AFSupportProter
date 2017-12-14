let Env = require('./env');

// 默认测试
let isJar = Env.isJar;
let localhost = Env.localhost;

let basePaths = {};

{
  if (isJar) {
    // 弹性福利 query 服务
    basePaths['fb-q'] = localhost + ':6017';
    // 弹性福利 command 服务
    basePaths['fb-c'] = localhost + ':6019';

    //健康医疗
    basePaths['health-q'] = localhost + ':6013';
    basePaths['health-c'] = localhost + ':6015';

    // 社保 query 服务
    basePaths['ss-q'] = localhost + ':6001';
    // 社保 command 服务
    basePaths['ss-c'] = localhost + ':6003';
  } else {
    // war
    basePaths['AlertJob'] = localhost + '/AlertJob-Host';
  }
}


let apiProxyTable = (name) => {
  return {
    target: basePaths[name] + '/api',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/'
    }
  };
}

let proxyTable = {
  '/api/soccommandservice': apiProxyTable('ss-c'),
  '/api/socqueryservice': apiProxyTable('ss-q'),
}

module.exports = {
  env: Env,
  basePaths: basePaths,
  proxyTable: proxyTable
};

