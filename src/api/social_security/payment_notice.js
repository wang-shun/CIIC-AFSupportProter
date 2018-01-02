import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  
  // 根据ID获取客户费用信息及扩展信息
  getPaymentComDtoByPaymentId: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentCom/getPaymentComDtoByPaymentId', params);
    return await response.data;
  },
  
  // 付款通知查询
  statementResultQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentDetail/paymentDetailQuery', params);
    return await response.data;
  },

}

