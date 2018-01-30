import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxHfc;

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
  },

  //特殊任务的办理材料页面信息查询
  accAndEmpDetailQuery:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpMaterial/queryEmpMaterialByTaskId', params);
    return await response.data;
  },

  //特殊任务的信息查询
  specialTaskQuery:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/queryEmpSpecialTaskById', params);
    return await response.data;
  },

  //雇员特殊任务办理
  empSpecialTaskHandle:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/empSpecialTaskHandle', params);
    return await response.data;
  },
  //保存材料
  saveMaterial:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpMaterial/saveMaterial', params);
    return await response.data;
  },

  //雇员公积金查询
  employeeQuery:async (params)=>{
    console.log(params);
    let response = await AJAX.post('/api/fundcommandservice/hfEmpArchive/queryEmpArchive', params);
    return await response.data;
  },
  //查询雇员详细信息
  employeeDetailInfoQuery:async (params)=>{
    let response = await AJAX.post('/api/fundcommandservice/hfEmpArchive/viewEmpArchiveInfo', params);
    return await response.data;
  },
  //雇员公积金查询-- 查看明细 -- 保存动作
  saveEmpAccount: async (params) => {
    return AJAX.post('/api/fundcommandservice/hfEmpArchive/saveEmpAccount', params);
  },

  //查询退账金额
  queryRefundAmountByTaskId:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/queryRefundAmountByTaskId', params);
    return await response.data;
  }

}

