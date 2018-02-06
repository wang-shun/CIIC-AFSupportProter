import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  getDictData: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/DictAccess/getDictData', params);
    return await response.data;
  }

}
