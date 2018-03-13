let env = {};

let dev = 'dev';
 //let dev = 'sit';
//let dev = 'uat';
// let dev = 'prod';

if ("dev" === dev) {
  env.localhost = "http://localhost";
  env.isJar = true;
  env.debug = true;
}
else if ("sit" === dev) {
  env.localhost = "http://172.16.9.29";
  env.isJar = true;
  env.debug = false;
}
else if ("uat" === dev) {
  env.localhost = "http://172.16.9.61";
  env.isJar = true;
  env.debug = false;
}
else {
  env.localhost = "";
  env.isJar = true;
  env.debug = false;
}
env.dev = dev

module.exports = env;
