import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 雇员日常操作查询
  employeeOperatorQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/employeeOperatorQuery', params);
    return await response.data;
  },
  // 批退
  refuseReason: (params) => {
    return AJAX.post('/api/soccommandservice/ssEmpTask/rejection', params);
  }
}

