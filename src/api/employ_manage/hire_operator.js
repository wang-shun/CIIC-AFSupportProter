import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxGyg;

const saveAmRemark = params => AJAX.postJSON("/api/employcommandservice/amEmpTask/saveAmRemark", params);

export default {

  //雇员查询
  employeeQuery:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amEmpTask/queryAmEmpTask', params);
    return await response.data;
  },
  //雇员汇总查询
  employeeCollectionQuery:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amEmpTask/queryAmEmpTaskCount', params);
    return await response.data;
  },
  //查询雇员详细信息
  employeeDetailInfoQuery:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amEmpTask/employeeDetailInfoQuery', params);
    return await response.data;
  },
  //保存用工
  saveEmployee:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amEmpTask/saveEmployee', params);
    return await response.data;
  },
  //保存用工档案
  saveAmArchive:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amEmpTask/saveAmArchive', params);
    return await response.data;
  },
  //保存用工档案
  // saveAmRemark:async (params)=>{
  //   let response = await AJAX.post('/api/employcommandservice/amEmpTask/saveAmRemark', params);
  //   return await response.data;
  // }
  saveAmRemark,
  //用工备注删除
  deleteAmRemark:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amEmpTask/deleteAmRemark', params);
    return await response.data;
  }, //退工查询
  queryAmResign:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amResignTask/queryAmResign', params);
    return await response.data;
  },//雇员汇总查询
  queryResignTaskCount:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amResignTask/queryResignTaskCount', params);
    return await response.data;
  },
  //查询退工详细信息
  queryAmResignDetail:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amResignTask/queryAmResignDetail', params);
    return await response.data;
  },//查询退工详细信息
  saveAmResign:async (params)=>{
    let response = await AJAX.post('/api/employcommandservice/amResignTask/saveAmResign', params);
    return await response.data;
  }


}

