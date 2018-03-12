import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  getStatements: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/statement/getStatements', params);
    return await response.data;
  },
  getStatementDetail: async (params) => {
    let response = await AJAX.get(`/api/fundcommandservice/statement/getStatementDetail/${params.params}`);
    return await response.data;
  },
  delStatement: async (params) => {
    let response = await AJAX.postJSON(`/api/fundcommandservice/statement/delStatement/${params.params}`);
    return await response.data;
  }
}
