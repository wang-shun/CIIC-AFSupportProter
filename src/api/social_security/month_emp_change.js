import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {

  // 主表信息查询
  serachMonthEmpChange: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssMonthEmpChange/serachMonthEmpChange', params);
    return await response.data;
  },

  // 明细表信息展示
  showMonthEmpChangeDetail: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssMonthEmpChangeDetail/showMonthEmpChangeDetail', params);
    return await response.data;
  },

  yysExport: (params) => {
    AJAX.download('/api/soccommandservice/ssMonthEmpChangeDetail/yysExport', params);
  },

  gsyExport: (params) => {
    AJAX.download('/api/soccommandservice/ssMonthEmpChangeDetail/gsyExport', params);
  },
}

