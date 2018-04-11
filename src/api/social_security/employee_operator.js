import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 雇员日常操作查询
  employeeOperatorQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/employeeOperatorQuery', params);
    return await response.data;
  },
  employeeOperatorQueryExport: async (params) => {
   AJAX.download('/api/soccommandservice/ssEmpTask/employeeOperatorQueryExport', params);
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

  //雇员查询
  employeeQuery:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpArchive/employeeQuery', params);
    return await response.data;
  },
  empSSSearchExport:async (params) => {
    AJAX.download('/api/soccommandservice/ssEmpArchive/empSSSearchExport', params);
  },
  //查询雇员详细信息
  employeeDetailInfoQuery:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpArchive/employeeDetailInfoQuery', params);
    return await response.data;
  },
  //查询退账金额
  queryRefundAmountByTaskId:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/ssEmpTask/queryRefundAmountByTaskId', params);
    return await response.data;
  },
  //批量任务单查询
  queryBatchEmpArchiveByEmpTaskIds:async (params)=>{

    let response = await AJAX.postJSON('/api/soccommandservice/ssEmpTask/queryBatchEmpArchiveByEmpTaskIds', params);
    return await response.data;
  },
  queryBatchTaskByCondition:async(params)=>{
    let response = await AJAX.postJSON('/api/soccommandservice/ssEmpTask/queryBatchTaskByCondition', params);
    return await response.data;
  },
  //批量任务处理
  handleBatchEmpTask: async (params) => {
    let response = await AJAX.postJSON('/api/soccommandservice/ssEmpTask/handleBatchTask', params);
    return await response.data;
  },

  employeeDailyOperatorDiskExport: (params) => {
    AJAX.download('/api/soccommandservice/ssEmpTask/employeeDailyOperatorDiskExport', params);
  },
 // 保存社保序号
 saveEmpSerial: (params) => {
    return AJAX.post('/api/soccommandservice/ssEmpArchive/saveEmpSerial', params);
  },
  //雇员新进任务 获得用退工信息
  queryReworkInfo:(params)=>{
     let res = AJAX.post('/api/soccommandservice/amEmpTask/queryReworkInfo', params);
  },
  //获得社保序号
  getSerial: (params) => {
    return AJAX.post('/api/soccommandservice/ssEmpTask/getSerial', params);
  },
  //权限列表
  authorityList:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/authority/authorityList', params);
    return await response.data;
  },
  //配置权限详情
  authorityDeptNodes:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/authority/authorityDeptNodes', params);
    return await response.data;
  },
  //配置权限客户列表
  authority:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/authority/authority', params);
    return await response.data;
  },
  //保存配置权限客户列表
  saveAuthority:async (params)=>{
    let response = await AJAX.post('/api/soccommandservice/authority/saveAuthority', params);
    return await response.data;
  },
}

