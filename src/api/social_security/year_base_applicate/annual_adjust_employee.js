import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保雇员数据查询
  annualAdjustEmployeeQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustEmployee/annualAdjustEmployeeQuery', params);
    return await response.data;
  },

  annualAdjustEmployeeExport: (params) => {
    AJAX.download('/api/soccommandservice/ssAnnualAdjustEmployee/annualAdjustEmployeeExport', params);
  }

}
