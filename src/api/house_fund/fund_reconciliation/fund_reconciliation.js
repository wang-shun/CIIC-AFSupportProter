import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  getStatements: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/statement/getStatements', params);
    return await response.data;
  }
}
