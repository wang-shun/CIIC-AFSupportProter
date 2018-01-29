import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxGyg;

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
  }


}

