import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  
  // 对账查询
  paymentComQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentCom/paymentComQuery', params);
    return await response.data;
  }
}

