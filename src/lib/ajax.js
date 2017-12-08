import axios from "axios";
import qs from "qs";

const config = require('./config')
const DEBUG = config.env.debug;
const BASE_PATHS = config.basePaths;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';

const AJAX = {
  DEBUG: DEBUG,
  formatDate: (format, date) => {
    date = date || new Date();
    var o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  },
  handle: (config = {}) => {
    let vm = config.vm;
    let ajax = config.ajax;
    let cb = config.callback;
    let title = config.title || '';

    // vm 和 ajax 是必须的
    if (!Boolean(ajax)) {
      return;
    }

    ajax.then((response) => {
      if (response.data.code == 200) {
        if (cb) {
          cb(response.data);// 回调处理
        }
        if (vm) {
          vm.$Notice.success({
            title: title,
            desc: "恭喜你，操作成功"
          });
        }
      } else {
        // code 500
        if (vm) {
          this.$Notice.error({
            title: title,
            desc: response.data.message
          });
        }
      }
    }).catch((error) => {
      let response = error.response
      let message = '';
      if (response) {
        switch (response.status) {
          case 404:
            message = '请求地址不存在: [' + response.data.path + ']';
            break;
          default:
            message = response.statusText;
        }
      }

      if (vm) {
        vm.$Notice.error({
          title: title,
          desc: message
        });
      }
    })
  }
};

/**
 * 创建 AJAX 对象
 * @param config
 */
let createAjax = config => {
  let ajax = axios.create(config);

  // 添加一个 request 拦截器
  ajax.interceptors.request.use(config => {
      // Do something before request is sent
      var contentType = config.headers['Content-Type'];

      if (!Boolean(contentType)) {
        // 不区分大小写查找
        for (var header in config.headers) {
          if (header.indexOf(CONTENT_TYPE) >= 0) {
            contentType = header;
            break;
          }
        }
      }

      if (contentType.indexOf(CONTENT_TYPE) >= 0) {
        config.data = qs.stringify(config.data);
      }

      // outer log
      if (DEBUG) {
        let logInfo = {
          url: config.url,
          method: config.method,
          time: AJAX.formatDate('yyyy-MM-dd hh:mm:ss:S'),
          data: null,
        };
        if (contentType.indexOf(CONTENT_TYPE) >= 0) {
          logInfo.data = decodeURIComponent(config.data);
        } else {
          logInfo.data = JSON.stringify(config.data);
        }

        console.log(JSON.stringify(logInfo));
      }

      return config;
    }
    , error => {
      // Do something with request error
      return Promise.reject(error);
    }
  )
  // 添加一个 response 拦截器
  ajax.interceptors.response.use(response => {
      if (response) {
        if (response.status === 200
          || response.status === 304
          || response.status === 500 // 后端业务处理返回的内部错误
        ) {
          return response
        }
      } else {
        return {
          data: {
            code: 400,
            message: '服务器拒绝请求',
            data: ''
          }
        }
      }
      return {
        data: {
          code: -404,
          message: response.statusText,
          data: ''
        }
      }
    }
    , error => {
      // Do something with request error
      return Promise.reject(error);
    }
  )
  return ajax;
}

let createAjaxForName = name => {
  return createAjax({
    baseURL: BASE_PATHS[name],
    timeout: DEBUG ? 0 : 5000,
    headers: {
      'Content-Type': CONTENT_TYPE
    }
  });
}

let createProxyAjaxForName = name => {
  var instance = createAjaxForName(name)
  var proxy = {};
  for (var method of ['get', 'post']) {
    proxy[method] = async (url, data, config) => {
      return await instance[method](url, data, config);
    }
  }
  return proxy;
}

AJAX.ajaxSsq = createProxyAjaxForName('ss-q');
AJAX.ajaxSsc = createProxyAjaxForName('ss-c');

export default AJAX;
