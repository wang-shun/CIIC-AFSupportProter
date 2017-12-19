let env = {};

let dev = 'development';

// development

env.localhost = "http://localhost";
env.isJar = true;
env.debug = true;

if("production" === dev){
  env.localhost = "http://172.16.9.24";
  env.isJar = true;
  env.debug = true;
}

module.exports = env;
