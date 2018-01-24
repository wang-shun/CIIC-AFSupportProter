import ajax from "../../../lib/ajax";

/**后台结构变动，现在只有一个服务*/
const ajaxApi = ajax.ajaxHmc;

const queryEmployeeList = params => ajaxApi.postJSON("/uninsuredService/queryEmployeeList", params);
const queryEmpMember = params => ajaxApi.postJSON("/uninsuredService/queryEmpMember", params);
const addAcceptance = params => ajaxApi.postJSON("/uninsuredService/addAcceptance", params);
const queryAcceptanceList = params => ajaxApi.postJSON("/uninsuredService/queryAcceptanceList", params);
const queryAcceptanceAuditList = params => ajaxApi.postJSON("/uninsuredAuditService/queryAcceptanceList", params);

export default {
  queryEmployeeList,
  queryEmpMember,
  addAcceptance,
  queryAcceptanceList,
  queryAcceptanceAuditList,
}
