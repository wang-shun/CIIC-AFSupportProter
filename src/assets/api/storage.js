/**
 * Created by huangye on 2018/10/12.
 */
let localStorage = {
  getItem: function(key) {
    var value = key !== 'userInfo' ? window.localStorage.getItem(`afSupportCenter_${key}`) : window.localStorage.getItem(key)
    return value
  },
  setItem: function(key, value) {
    if (key !== 'userInfo') {
      window.localStorage.setItem(`afSupportCenter_${key}`, value)
    } else {
      window.localStorage.setItem(key, value)
    }
  },
  removeItem: function(key) {
    if (key !== 'userInfo') {
      window.localStorage.removeItem(`afSupportCenter_${key}`)
    } else {
      window.localStorage.removeItem(key)
    }
  },
  clear: function() {
    window.localStorage.clear()
  }
}

let sessionStorage = {
  getItem: function(key) {
    var value = key !== 'userInfo' ? window.sessionStorage.getItem(`afSupportCenter_${key}`) : window.sessionStorage.getItem(key)
    if (value) {
      try {
        var value_json = JSON.parse(value)
        if (typeof value_json === 'object') {
          return value_json
        } else if (typeof value_json === 'number') {
          return value_json
        }
      } catch(e) {
        return value
      }
    } else {
      return null
    }
  },
  setItem: function(key, value) {
    if (key !== 'userInfo') {
      window.sessionStorage.setItem(`afSupportCenter_${key}`, value)
    } else {
      window.sessionStorage.setItem(key, value)
    }
  },
  removeItem: function(key) {
    if (key !== 'userInfo') {
      window.sessionStorage.removeItem(`afSupportCenter_${key}`)
    } else {
      window.localStorage.removeItem(key)
    }
  },
  clear: function() {
    window.sessionStorage.clear()
  }
}

export {
  localStorage,
  sessionStorage
}
