import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  
  // 对账查询
  paymentBatchQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/paymentReviewedQuery', params);
    return await response.data;
  },

  
  // 审批通过
  doReviewdePass: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/doReviewdePass', params);
    return await response.data;
  },
  
  // 批退
  doRejection: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/doRejection', params);
    return await response.data;
  },


}

