import moment from "moment";

let utils = {
  // 默认分页大小 5
  DEFAULT_PAGE_SIZE: 5,
  DEFAULT_PAGE_SIZE_OPTS: [5, 10],
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
 * 清楚指定 key
 * @param params
 * @param keys []
 */
utils.clearKey = (params, keys) => {
  var p = {};
  for (var name of Object.keys(params)) {
    var exists = false;
    for (var key of Object.keys(keys)) {
      if (params[name] == key) {
        exists = true;
        break;
      }
      if (!exists) {
        p[name] = params[name];
      }
    }
  }
  return p
}

/**
 * 清楚指定 value ，默认清楚 '[全部]'
 * @param params
 * @param value
 */
utils.clear = (params, value = '[全部]') => {
  var p = {};
  for (var key of Object.keys(params)) {
    if (params[key] != value) {
      p[key] = params[key];
    }
  }
  return p
}

/**
 * clone
 * @param {*} obj
 */
let self = this;
utils.deepClone = (obj) => {
  let newObj = obj instanceof Array ? [] : {};
  for (let k in obj) {
    newObj[k] = obj[k] instanceof Object ? self.a.deepClone(obj[k]) : obj[k];
  }
  return newObj;
};

export default utils;
