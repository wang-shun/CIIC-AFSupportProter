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
  },
  // 根据雇员任务 ID 查询 企业社保账户信息
  queryComAccountByEmpTaskId: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssComAccount/queryByEmpTaskId', params);
    return await response.data;
  },
  // 根据雇员任务 ID 查询 雇员本地社保档案信息
  queryEmpArchiveByEmpTaskId: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssEmpArchive/queryByEmpTaskId', params);
    return await response.data;
  },
  // 查询任务单费用段，根据雇员任务 id
  queryEmpTaskById: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/empTaskById', params);
    return await response.data;
  },
  // 雇员任务办理
  handleEmpTask: async (params) => {
    let response = await AJAX.postJSON('/api/soccommandservice/ssEmpTask/handle', params);
    return await response.data;
  }
}

