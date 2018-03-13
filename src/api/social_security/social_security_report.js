import ajax from "../../lib/ajax";


const AJAX = ajax.ajaxSsc;
const AJAXMsg=ajax.ajaxSocMessage;

export default {
    queryRefundDetails:async (params)=>{
        let response = await AJAX.post('/api/soccommandservice/ssEmpRefund/queryRefundDetails', params);
        return await response.data;
    },
    queryEmlpyeeMonthFeeDetail:async(params)=>{ 
        let response = await AJAX.post('/api/soccommandservice/ssMonthChargeItem/queryEmlpyeeMonthFeeDetail', params);
        return await response.data;
    },
    monthChargeExport:async(params)=>{ 
      AJAX.download('/api/soccommandservice/ssMonthChargeItem/monthChargeExport', params);
  },

    getAccountRelationByAccountId:async(params)=>{
      let response = await AJAX.post('/api/soccommandservice/ssAccountComRelation/getAccountCompanyRelationByAccountId', params);
      return await response.data;
    },

    // 付款通知查询
    getPaymentDetail: async (params) => {
      let response = await AJAX.post('/api/soccommandservice/ssPaymentDetail/paymentDetailQuery', params);
      return await response.data;
    },

    summaryCalculate:async(params)=>{
       let response = await AJAXMsg.post('/soc/messageservice/summarycalculate',params);
       return await response.data;
    },

    getAccountById:async(params)=>{
      let response = await AJAX.post('/api/soccommandservice/ssComAccount/getAccountByAccountId',params);
      return await response.data;
    }
}
