import ajax from "../../../lib/ajax";


const AJAX = ajax.ajaxHfc;

export default {

  queryHfRimittedBookReport: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfMonthCharge/queryHfRimittedBookReport', params);
    return await response.data;
  },
  queryHfRimittedBookReportExport:(params) =>{
    AJAX.download('/api/fundcommandservice/hfMonthCharge/queryHfRimittedBookReportExport', params);
  },
  hfMonthChargeQuery: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfMonthCharge/hfMonthChargeQuery', params);
    return await response.data;
  },
  hfMonthChargeExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/hfMonthChargeExport', params);
  },
  chgDetailListExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/chgDetailListExport', params);
  },
  repairDetailListExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/repairDetailListExport', params);
  },

  //获取汇缴书信息
   getRemittedBook:(params) =>{
    let url ="/api/fundcommandservice/hfMonthCharge/printRemittedBook";
    return new Promise(function(resolve,reject){
      AJAX.post(url, params).then(function (response) {
        let responseData = {
            code:response.data.code,
            message:response.data.message,
            data:response.data.data,
        }
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  },
}
