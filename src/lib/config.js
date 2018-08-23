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
    basePaths['userInfo'] = localhost + ':9703';

    //健康医疗
    basePaths['health-c'] = localhost + ':6013';

    // 社保 query 服务
    basePaths['ss-q'] = localhost + ':6001';
    // 社保 command 服务
    basePaths['ss-c'] = localhost + ':6003';
    // 公积金 command 服务
    basePaths['hf-c'] = localhost + ':6007';
    // 公积金 message 服务
    basePaths['hf-m'] = localhost + ':6031';
	  //雇佣管理
    basePaths['gy-c'] = localhost + ':6011';

    basePaths['soc'] = localhost + ':6029';
    //证件管理
    basePaths['cm'] = localhost + ':6025';

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
  '/soc/messageservice': apiProxyTable('soc'),
  '/api/socqueryservice': apiProxyTable('ss-q'),
  '/api/fundcommandservice': apiProxyTable('hf-c'),
}

module.exports = {
  env: Env,
  basePaths: basePaths,
  proxyTable: proxyTable
};

