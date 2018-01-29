import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保账户雇员数据查询
  annualAdjustAccountEmpQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustAccountEmp/annualAdjustAccountEmpQuery', params);
    return await response.data;
  },
  annualAdjustAccountEmpExport: (params) => {
    AJAX.download('/api/soccommandservice/ssAnnualAdjustAccountEmp/annualAdjustAccountEmpExport', params);
  }
}
