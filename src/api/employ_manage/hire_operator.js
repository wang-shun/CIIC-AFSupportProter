import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxGyg;

const saveAmRemark = params => AJAX.postJSON("/api/employservice/amEmpTask/saveAmRemark", params);

const  saveAmInjury  = params => AJAX.postJSON("/api/employservice/amArchiveTask/saveAmInjury", params);

const  saveAmEmpMaterial = params => AJAX.postJSON("/api/employservice/amArchiveTask/saveAmEmpMaterial", params);

const  saveAmArchiveUse  = params => AJAX.postJSON("/api/employservice/amArchiveTask/saveAmArchiveUse", params);

const receiveMaterial = params => AJAX.postJSON("/api/employservice/amEmpTask/receiveMaterial", params);

const rejectMaterial = params => AJAX.postJSON("/api/employservice/amEmpTask/rejectMaterial", params);

const saveBatchEmploy = params => AJAX.postJSON("/api/employservice/amEmpTask/saveBatchEmploy", params);


export default {

  //雇员查询
  employeeQuery:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/queryAmEmpTask', params);
    return await response.data;
  },
  //雇员汇总查询
  employeeCollectionQuery:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/queryAmEmpTaskCount', params);
    return await response.data;
  },
  //查询雇员详细信息
  employeeDetailInfoQuery:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/employeeDetailInfoQuery', params);
    return await response.data;
  },
  //保存用工
  saveEmployee:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/saveEmployee', params);
    return await response.data;
  },
  //保存用工档案
  saveAmArchive:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/saveAmArchive', params);
    return await response.data;
  },
  //保存用工档案
  // saveAmRemark:async (params)=>{
  //   let response = await AJAX.post('/api/employservice/amEmpTask/saveAmRemark', params);
  //   return await response.data;
  // }
  saveAmRemark,
  //用工备注删除
  deleteAmRemark:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/deleteAmRemark', params);
    return await response.data;
  }, //退工查询
  queryAmResign:async (params)=>{
    let response = await AJAX.post('/api/employservice/amResignTask/queryAmResign', params);
    return await response.data;
  },//雇员汇总查询
  queryResignTaskCount:async (params)=>{
    let response = await AJAX.post('/api/employservice/amResignTask/queryResignTaskCount', params);
    return await response.data;
  },
  //查询退工详细信息
  queryAmResignDetail:async (params)=>{
    let response = await AJAX.post('/api/employservice/amResignTask/queryAmResignDetail', params);
    return await response.data;
  },//查询退工详细信息
  saveAmResign:async (params)=>{
    let response = await AJAX.post('/api/employservice/amResignTask/saveAmResign', params);
    return await response.data;
  }
  ,//查询档案信息
  queryAmArchive:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/queryAmArchive', params);
    return await response.data;
  },//雇员汇总查询
  employeeArchiveCollection:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/queryAmEmpTaskCount', params);
    return await response.data;
  },//退工汇总查询
  resignArchiveCollection:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/queryResignTaskCount', params);
    return await response.data;
  },//查询雇员详细信息
  archiveDetailInfoQuery:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/archiveDetailInfoQuery', params);
    return await response.data;
  },saveAmInjury
  ,saveAmEmpMaterial
  , deleteAmInjury:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/deleteAmInjury', params);
    return await response.data;
  },
  deleteAmEmpMaterial:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/deleteAmEmpMaterial', params);
    return await response.data;
  },
  saveAmArchiveUse,//查询雇员详细信息
  queryArchiveUse:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/queryArchiveUse', params);
    return await response.data;
  },
  deleteAmArchiveUse:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/deleteAmArchiveUse', params);
    return await response.data;
  },//用工材料签收
  receiveMaterial,//用工材料批退
  rejectMaterial,
  updateTaskStatus:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/updateTaskStatus', params);
    return await response.data;
  },
  employSearchExportOpt:async (params) => {
    AJAX.download('/api/employservice/amEmpTask/employSearchExportOpt', params);
  },
  resignSearchExportOpt:async (params) => {
    AJAX.download('/api/employservice/amResignTask/resignSearchExportOpt', params);
  },
  archiveSearchExportOpt:async (params) => {
    AJAX.download('/api/employservice/amArchiveTask/archiveSearchExportOpt', params);
  },//查询雇员详细信息
  getDefualtEmployBO:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/getDefualtEmployBO', params);
    return await response.data;
  },
  querySalCompany:async (params)=>{
    let response = await AJAX.post('/api/employservice/salCompany/querySalCompany', params);
    return await response.data;
  },
  saveCompanySet:async (params)=>{
    let response = await AJAX.post('/api/employservice/salCompany/saveCompanySet', params);
    return await response.data;
  },
  queryCompanySetDetail:async (params)=>{
    let response = await AJAX.post('/api/employservice/salCompany/queryCompanySetDetail', params);
    return await response.data;
  },//退工绑定用工序号
  bindEmploymentId:async (params)=>{
    let response = await AJAX.post('/api/employservice/amResignTask/bindEmploymentId', params);
    return await response.data;
  },

  //权限列表
  amauthorityList:async (params)=>{
    let response = await AJAX.post('/api/employservice/amauthority/amauthorityList', params);
    return await response.data;
  },
  //配置权限详情
  amauthorityDeptNodes:async (params)=>{
    let response = await AJAX.post('/api/employservice/amauthority/amauthorityDeptNodes', params);
    return await response.data;
  },
  //配置权限客户列表
  amauthority:async (params)=>{
    let response = await AJAX.post('/api/employservice/amauthority/amauthority', params);
    return await response.data;
  },
  //保存配置权限客户列表
  amsaveAuthority:async (params)=>{
    let response = await AJAX.post('/api/employservice/amauthority/amsaveAuthority', params);
    return await response.data;
  },
  // 根据预留档按类别查询预留档案编号seq
  queryDocSeqByDocType:async (params)=>{
    let response = await AJAX.post('/api/employservice/amArchiveTask/queryDocSeqByDocType', params);
    return await response.data;
  },
  // 查询预留档案编号list
  queryAmArchiveDocType:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/queryAmArchiveDocType', params);
    return await response.data;
  },
  saveBatchEmploy,
  batchSaveEmployment:async (params)=>{
    let response = await AJAX.post('/api/employservice/amEmpTask/batchSaveEmployment', params);
    return await response.data;
  }

}

