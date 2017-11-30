let Env = require('./env');

// 默认测试
let basePaths = {
  'AlertJob': 'http://localhost:8081',
  //弹性福利query服务
  'fb-q': 'http://localhost:6017',
  //弹性福利command服务
  'fb-c': 'http://localhost:6019',
}

// 生产
if (Env === 'production') {
  // let basePath = 'http://172.16.9.24:8080';
  let basePath = 'http://localhost:8080';
  basePaths = {
    'AlertJob': basePath + '/AlertJob-Host',
  }
}


module.exports = basePaths;
