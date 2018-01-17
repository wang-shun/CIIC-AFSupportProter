import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保雇员数据查询
  annualAdjustCompanyQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompany/annualAdjustCompanyQuery', params);
    return await response.data;
  }
}
