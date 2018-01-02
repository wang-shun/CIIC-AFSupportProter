import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  
  // 对账查询
  paymentBatchQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/paymentQuery', params);
    return await response.data;
  }
}

