import axios from "axios";
import moment from "moment";
import qs from "qs";

const config = require('./config')
const DEBUG = config.env.debug;
const BASE_PATHS = config.basePaths;
const CONTENT_TYPE = 'application/x-www-form-urlencoded';
const DATA_TYPE = 'multipart/form-data';

let utils = {
  // 默认分页大小 5
  DEFAULT_PAGE_SIZE: 5,
  DEFAULT_PAGE_SIZE_OPTS: [5,10],
  DEBUG: DEBUG
};

/**
 * 空函数
 */
utils.noop = () => {
}


/**
 * copy 属性
 * @param source
 * @param target
 */
utils.copy = (source, target) => {
  // copy attr
  for (var attr in source) {
    if (target[attr] != undefined) {
      target[attr] = source[attr];
    }
  }
}


/**
 * 格式化日期
 * @param date 日期
 * @param fmt 日期格式
 * @returns string
 */
utils.formatDate = (date, fmt) => {
  return moment(date).format(fmt);
};

/**
 * 解析日期
 * @param dateString 日期字符串
 * @param fmt 日期格式
 * @returns Date
 */
utils.parseDate = (dateString, fmt) => {
  // utc 解决时区问题
  return moment.utc(dateString, fmt);
};

/**
 * var response = {
      data: {
        code: 200,
        data: [],
      }
    };
 * @param response
 * @returns {Promise}
 */
utils.promise = response => {
  return new Promise((resolve, reject) => { // 异步处理
    if (response.data.code == 200) {
      resolve(response);
    } else {
      reject(response);
    }
  });
}


/**
 * 清楚指定 value ，默认清楚 '[全部]'
 * @param params
 * @param value
 */
utils.clear = (params,value = '[全部]') =>{
  var p = {};
  for(var key of Object.keys(params)){
    if(params[key] != value){
      p[key] = params[key];
    }
  }
  return p
}

/**
 * 创建 ajax 对象
 * @param config
 */
let createAjax = config => {
  let ajax = axios.create(config);

  // 添加一个请求拦截器
  ajax.interceptors.request.use(
    config => {
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
        let formatDate = (format, date) => {
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
        }

        let logInfo = {
          url: config.url,
          method: config.method,
          time: formatDate('yyyy-MM-dd hh:mm:ss:S'),
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
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    })
  return ajax;
}

let createAjaxForName = name => {
  
  return createAjax({
    baseURL: BASE_PATHS[name],
    timeout: utils.DEBUG ? 0 : 5000,
    headers: {
      'Content-Type': CONTENT_TYPE
    }
  });
}


let createAjaxForData = name => {
  return createAjax({
    baseURL: config.basePaths[name],
    timeout: utils.DEBUG ? 0 : 5000,
    headers: {
      'Content-Type': DATA_TYPE
    }
  });
};

utils.ajaxFbq = createAjaxForName('fb-q');
utils.ajaxFbc = createAjaxForName('fb-c');
utils.ajaxData = createAjaxForData('fb-c');

utils.ajaxSsq = createAjaxForName('ss-q');
utils.ajaxSsc = createAjaxForName('ss-c');

/**
 * clone
 * @param {*} obj 
 */
let self = this
utils.deepClone=obj=>{
  var newObj = obj instanceof Array ? [] : {};
  for(var k in obj) 
  newObj[k] = obj[k] instanceof Object ? self.a.deepClone(obj[k]) : obj[k];
  return newObj;
}

export default utils;
