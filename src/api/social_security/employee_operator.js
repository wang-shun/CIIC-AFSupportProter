import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 雇员日常操作查询
  employeeOperatorQuery: (params) => {
    return AJAX.post('/api/soccommandservice/ssEmpTask/employeeOperatorQuery', params);
  }
}

