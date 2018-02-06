import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {

  // 对账查询
  statementQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssStatement/statementQuery', params);
    return await response.data;
  },

  statementExport: (params) => {
    AJAX.download('/api/soccommandservice/ssStatement/statementExport', params);
  },

  statementBeforeUpload: async(params) => {
    let response = await AJAX.upload('/api/soccommandservice/ssStatementImp/optImport', params);
    return await response.data;
  },
}

