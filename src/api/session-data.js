import utils from "../lib/utils";

export default {
  setJsonDataToSession(key, obj) {
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
