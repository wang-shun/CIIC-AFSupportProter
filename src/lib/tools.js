import moment from "moment";

let tools = {};


/**
 * copy 属性
 * @param source
 * @param target
 */
tools.copy = (source, target) => {
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
tools.formatDate = function (date, fmt) {
  return moment(date).format(fmt);
};

/**
 * 解析日期
 * @param dateString 日期字符串
 * @param fmt 日期格式
 * @returns Date
 */
tools.parseDate = function (dateString, fmt) {
  // utc 解决时区问题
  return moment.utc(dateString, fmt);
};


export default tools;




