import axios from "axios"
import qs from "qs"

const config = require('./config')
const DEBUG = config.env.debug
const BASE_PATHS = config.basePaths
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000
const AJAX = {
  formatDate: (format, date) => {
    date = date || new Date()
    var o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    }
    if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    return format
  },
  handle: (config = {}) => {
    let vm = config.vm
    let ajax = config.ajax
    let cb = config.callback
    let errCb = config.errCallback
    let title = config.title || ''
    // vm 和 ajax 是必须的
    if (!Boolean(ajax)) {
      return
    }
    ajax.then((response) => {
      if (response.data.code == 200) {
        if (cb) {
          cb(response.data) // 回调处理
        }
        if (vm) {
          vm.$Notice.success({
            title: title,
            desc: "恭喜你，操作成功"
          })
        }
      } else {
        // code 500
        if (vm) {
          this.$Notice.error({
            title: title,
            desc: response.data.message
          })
        }
      }
    }).catch((error) => {
      let response = error.response
      let message = ''
      if (response) {
        switch (response.status) {
          case 404:
            message = '请求地址不存在: [' + response.data.path + ']'
            break
          default:
            message = response.statusText
        }
        if (vm) {
          vm.$Notice.error({
            title: title,
            desc: message
          })
        }
      }
      if (errCb) {
        errCb(error)
      }
    })
  },
}

const logInfo = (method, url, data, timeout) => {
  // outer log
  if (DEBUG) {
    let logInfo = {
      url: url,
      method: method,
      time: AJAX.formatDate('yyyy-MM-dd hh:mm:ss:S'),
      timeout: timeout,
      data: null,
    }
    if (typeof(data) === 'string') {
      logInfo.data = decodeURIComponent(data)
    } else {
      logInfo.data = qs.stringify(data)
    }
  }
}

const getUrl = (url, data) => {
  // 分析 url 包含 "?"
  if (data && Object.keys(data).length > 0) {
    if (url.indexOf("?") < 0) {
      url += "?"
    }
    var uri = data
    // 参数类型如果不是字符串类型 序列号
    if (typeof(data) !== "string") {
      uri = qs.stringify(data)
    }
    // 问号结尾不添加 "&"
    if (url.lastIndexOf("?") != url.length - 1) {
      url += "&"
    }
    url += uri

    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      if (uri) {
        url += '&token=' + encodeURIComponent(JSON.parse(userInfo).token)
      } else {
        url += 'token=' + encodeURIComponent(JSON.parse(userInfo).token)
      }
    }
  } else {
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      url += '?token=' + encodeURIComponent(JSON.parse(userInfo).token)
    }
  }
  return url
}

// 创建 AJAX 对象
const createAjax = config => {
  let ajax = axios.create(config)

  // 添加一个 request 拦截器
  ajax.interceptors.request.use(config => {
    var contentType = config.headers['Content-Type']

    if (contentType.indexOf(CONTENT_TYPE) >= 0) {
      config.data = qs.stringify(config.data)
    }

    // log
    logInfo(config.method, config.url, config.data, config.timeout)
    let userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      config.headers['token'] = JSON.parse(userInfo).token
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
  // 添加一个 response 拦截器
  ajax.interceptors.response.use(response => {
    var contentType = response.headers['content-type']
    // 响应数据不是 json 直接返回
    if (contentType.indexOf('application/json') < 0) {
      return response
    }
    if (response) {
      if (response.status === 200 || response.status === 304 || response.status === 500) { // 后端业务处理返回的内部错误
        if (response.data && response.data.code === '2') {
          localStorage.removeItem('userInfo')
          window.location.href = process.env.LOGIN_URL + '/#/?refer=' + encodeURIComponent(encodeURIComponent(window.location.href))
          return
        }
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
  }, error => {
    return Promise.reject(error)
  })
  return ajax
}

const createAjaxForName = name => {
  return createAjax({
    baseURL: BASE_PATHS[name],
    timeout: DEBUG ? 0 : 120000,
    headers: {
      'Content-Type': CONTENT_TYPE
    }
  })
}

let createProxyAjaxForName = name => {
  var instance = createAjaxForName(name)
  var baseURL = BASE_PATHS[name]
  var proxy = {
    baseURL: baseURL
  }

  proxy.get = async (url, config) => {
    return await instance['get'](url, config)
  }

  proxy.post = async (url, data, config) => {
    return await instance['post'](url, data, config)
  }

  proxy.getJSON = async (url, data, config) => {
    url = getUrl(url, data)
    return await proxy.get(url, config)
  }
  proxy.postJSON = async (url, data, config = {}) => {
    config.headers = config.headers || {}
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    return await proxy.post(url, data, config)
  }

  // 下载
  proxy.download = (url, data) => {
    url = getUrl(url, data)
    data = {}
    logInfo('get', url, data)

    // 下载
    // let iframe = document.createElement('iframe')
    // iframe.style.display = 'none'
    // iframe.src = baseURL + url
    // iframe.onload = () => {
    //   document.body.removeChild(iframe)
    // }
    // document.body.appendChild(iframe)
    //window.open(baseURL + url)


    var downloadElement = document.createElement('a')
    downloadElement.href = baseURL + url
    downloadElement.target='_blank'
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement)


  }

  // 上传
  proxy.upload = async (url, data, config = {}) => {
    let formData = new FormData()

    Object.keys(data).forEach(key => {
      let value = data[key]
      if (value instanceof Array) {
        for (var ele of value) {
          formData.append(key, ele)
        }
      } else {
        formData.append(key, data[key])
      }
    })

    config.headers = config.headers || {}
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'multipart/form-data'

    return await proxy.post(url, formData, config)
  }
  return proxy
}

AJAX.createAjax = createAjax
AJAX.createAjaxForName = createAjaxForName
AJAX.createProxyAjaxForName = createProxyAjaxForName

AJAX.basePaths = BASE_PATHS['health-c']
AJAX.fbqBasePaths = BASE_PATHS['fb-q'];
AJAX.fbcBasePaths = BASE_PATHS['fb-c'];
AJAX.ajaxFbq = createProxyAjaxForName('fb-q')
AJAX.ajaxFbc = createProxyAjaxForName('fb-c')
AJAX.ajaxSsq = createProxyAjaxForName('ss-q')
AJAX.ajaxSsc = createProxyAjaxForName('ss-c')
AJAX.ajaxHmc = createProxyAjaxForName('health-c')
AJAX.userInfo = createProxyAjaxForName('userInfo')
AJAX.ajaxHfc = createProxyAjaxForName('hf-c')
AJAX.ajaxGyg = createProxyAjaxForName('gy-c')
AJAX.ajaxAlertJob = createProxyAjaxForName('AlertJob')
AJAX.ajaxAuthService = createProxyAjaxForName('AuthService')
AJAX.ajaxBasicDataService = createProxyAjaxForName('BasicDataService')
AJAX.ajaxSiteLetterService = createProxyAjaxForName('SiteLetterService')
AJAX.ajaxSSPService = createProxyAjaxForName('SSPService')
AJAX.ajaxSpecialOperationService = createProxyAjaxForName('SpecialOperationService')
AJAX.ajaxSocMessage = createProxyAjaxForName('soc')
AJAX.ajaxHfMessage = createProxyAjaxForName('hf-m')
AJAX.ajaxCM = createProxyAjaxForName('cm')

export default AJAX
