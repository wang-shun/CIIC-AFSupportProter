/**
 * Created by huangye on 2018/1/5.
 */
const COMMON_METHODS = {
  TRIM_WHITESPACE: (obj) => {
    let tmpObj = obj;
    tmpObj = tmpObj.replace(/(^\s*)|(\s*$)/g, "");
    return tmpObj;
  },
  IS_ARRAY: (arr) => {
    return Array.isArray(arr);
  },
  IS_DEFINED: (obj) => {
    return obj !== undefined ? true : false;
  },
  IS_EMPTY: (obj) => {
    if(!this.a.IS_DEFINED(obj)) {
      return true;
    } else if(typeof obj === "string") {
      return this.a.TRIM_WHITESPACE(obj) === "";
    } else if(this.a.IS_ARRAY(obj)) {
      return obj.length === 0;
    } else if(Object.prototype.isPrototypeOf(obj)) {
      return JSON.stringify(obj) === "{}";
    } else {
      return false;
    }
  },
  HAS_PROPERTY: (obj, property) => {
    return this.a.IS_DEFINED(obj[property])
  }
};

export default COMMON_METHODS;
