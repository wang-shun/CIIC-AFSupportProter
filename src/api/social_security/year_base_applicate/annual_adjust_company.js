import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保客户数据查询
  annualAdjustCompanyQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompany/annualAdjustCompanyQuery', params);
    return await response.data;
  },
  // 客户雇员信息上传临时表查询
  annualAdjustCompanyEmpTempQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompanyEmp/annualAdjustCompanyEmpTempQuery', params);
    return await response.data;
  },
  // 客户雇员信息插入正式表
  annualAdjustCompanyEmpInsert: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustCompanyEmp/annualAdjustCompanyEmpInsert', params);
    return await response.data;
  },
  annualAdjustCompanyEmpUpload: async(params) => {
    let response = await AJAX.upload('/api/soccommandservice/ssAnnualAdjustCompany/annualAdjustCompanyEmpUpload', params);
    return await response.data;
  },
  // 修改当前页客户信息
  annualAdjustCompanysUpdate: async (params) => {
    let response = await AJAX.postJSON('/api/soccommandservice/ssAnnualAdjustCompany/annualAdjustCompanysUpdate', params);
    return await response.data;
  },
}
