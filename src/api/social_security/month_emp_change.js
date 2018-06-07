import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;
const AJAXMsg=ajax.ajaxSocMessage;

export default {

  // 主表信息查询
  serachMonthEmpChange: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssMonthEmpChange/serachMonthEmpChange', params);
    return await response.data;
  },

  // 明细表信息展示
  showMonthEmpChangeDetail: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssMonthEmpChangeDetail/showMonthEmpChangeDetail', params);
    return await response.data;
  },
  // 根据公积金账户+月份得到getMonthEmpChangeId
  getSsMonthEmpChangeId: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssMonthEmpChange/getSsMonthEmpChangeId', params);
    return await response.data;
  },
  queryYysReport: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssMonthCharge/queryYysReport', params);
    return await response.data;
  },

  yysExport: (params) => {
    AJAX.download('/api/soccommandservice/ssMonthCharge/yysExport', params);
  },

  // yysExport: (params) => {
  //   AJAX.download('/api/soccommandservice/ssMonthEmpChangeDetail/yysExport', params);
  // },

  gsyExport: (params) => {
    AJAX.download('/api/soccommandservice/ssMonthEmpChangeDetail/gsyExport', params);
  },

  summaryCalculate:async(params)=>{
    let response = await AJAXMsg.post('/soc/messageservice/summarycalculate',params);
    return await response.data;
 },
}

