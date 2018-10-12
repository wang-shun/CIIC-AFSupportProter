/**
 * Created by huangye on 2018/10/12.
 */
let localStorage = {
  getItem: function(key) {
    var value = window.localStorage.getItem(`test_${key}`);
    if (value) {
      try {
        var value_json = JSON.parse(value);
        if (typeof value_json === 'object') {
          return value_json;
        } else if (typeof value_json === 'number') {
          return value_json;
        }
      } catch(e) {
        return value;
      }
    } else {
      return false;
    }
  },
  setItem: function(key, value) {
    window.localStorage.setItem(`test_${key}`, value);
  },
  removeItem: function(key) {
    window.localStorage.removeItem(`test_${key}`);
  },
  clear: function() {
    window.localStorage.clear();
  }
}

let sessionStorage = {
  getItem: function(key) {
    var value = window.sessionStorage.getItem(`test_${key}`);
    if (value) {
      try {
        var value_json = JSON.parse(value);
        if (typeof value_json === 'object') {
          return value_json;
        } else if (typeof value_json === 'number') {
          return value_json;
        }
      } catch(e) {
        return value;
      }
    } else {
      return false;
    }
  },
  setItem: function(key, value) {
    window.sessionStorage.setItem(`test_${key}`, value);
  },
  removeItem: function(key) {
    window.sessionStorage.removeItem(`test_${key}`);
  },
  clear: function() {
    window.sessionStorage.clear();
  }
}

export {
  localStorage,
  sessionStorage
}
