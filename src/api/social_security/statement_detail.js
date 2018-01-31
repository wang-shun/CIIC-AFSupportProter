import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {

  // 对账主表信息查询
  serachStatementData: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssStatement/serachStatementData', params);
    return await response.data;
  },

  // 对账结果列查询
  serachStatementResultData: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssStatementResult/statementResultQuery', params);
    return await response.data;
  },

  // 重算结果
  calculate: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssStatementResult/calculateSstatementResult', params);
    return await response.data;
  }
}

