import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保客户雇员数据查询
  annualAdjustCompanyEmpQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompanyEmp/annualAdjustCompanyEmpQuery', params);
    return await response.data;
  },

  // 验证客户雇员是否存在
  checkExistsEmployee: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompanyEmp/checkExistsEmployee', params);
    return await response.data;
  },

  // 添加或修改客户雇员信息
  annualAdjustCompanyEmpInsertOrUpdate: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompanyEmp/annualAdjustCompanyEmpInsertOrUpdate', params);
    return await response.data;
  },

  // 修改当前页客户雇员信息
  annualAdjustCompanyEmpsUpdate: async (params) => {
    let response = await AJAX.postJSON('/api/soccommandservice/ssAnnualAdjustCompanyEmp/annualAdjustCompanyEmpsUpdate', params);
    return await response.data;
  },

  // 删除当前页选中的客户雇员信息
  annualAdjustCompanyEmpsDelete: async (params) => {
    let response = await AJAX.postJSON('/api/soccommandservice/ssAnnualAdjustCompanyEmp/annualAdjustCompanyEmpsDelete', params);
    return await response.data;
  }
}
