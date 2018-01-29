import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  // 社保账户数据查询
  annualAdjustAccountQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustAccount/annualAdjustAccountQuery', params);
    return await response.data;
  },
  // 社保账户雇员信息上传临时表查询
  annualAdjustAccountEmpTempQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustAccountEmp/annualAdjustAccountEmpTempQuery', params);
    return await response.data;
  },
  // 社保账户雇员信息插入正式表
  annualAdjustAccountEmpInsert: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustAccountEmp/annualAdjustAccountEmpInsert', params);
    return await response.data;
  },
  accountEmpAvgMonthSalaryExport: (params) => {
    AJAX.download('/api/soccommandservice/ssAnnualAdjustAccount/accountEmpAvgMonthSalaryExport', params);
  },
  annualAdjustAccountDelete: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssAnnualAdjustAccount/annualAdjustAccountDelete', params);
    return await response.data;
  }
}
