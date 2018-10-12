import utils from "../lib/utils";
import {localStorage, sessionStorage} from '../assets/api/storage'

export default {
  setJsonDataToSession(key, obj) {
    for (var k of Object.keys(obj)) {
      if (obj[k] instanceof Date) {
        obj[k] = utils.formatDate(obj[k]);
      } else if (obj[k] instanceof Array) {
        obj[k].forEach((element, index, array) => {
          if (obj[k][index] instanceof Date) {
            obj[k][index] = utils.formatDate(obj[k][index]);
          }
        })
      }
    }
    sessionStorage.setItem(key, JSON.stringify(obj));
  },
  getJsonDataFromSession(key, obj) {
    let jsonData = sessionStorage.getItem(key);
    if (jsonData) {
      utils.copy(JSON.parse(jsonData), obj);
      sessionStorage.removeItem(key);
    }
  }
}
