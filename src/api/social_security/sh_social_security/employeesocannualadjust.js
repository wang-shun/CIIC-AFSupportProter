import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保雇员数据查询
  annualAdjustEmployeeQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssEmpArchive/annualAdjustEmployeeQuery', params);
    return await response.data;
  }
}
