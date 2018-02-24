import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  getDictData: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/DictAccess/getDictData', params);
    return await response.data;
  }

}
