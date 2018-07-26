import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;
const AJAXMsg=ajax.ajaxSocMessage;
export default {
  
  // 对账查询
  paymentBatchQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/paymentQuery', params);
    return await response.data;
  },

  // 申请支付
  doApplyPay: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/doApplyPay', params);
    return await response.data;
  },
  
  // 删除批次
  doDelPayment: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/doDelPayment', params);
    return await response.data;
  },

  //获取支付年月
  getPaymentMonth: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/getPaymentMonth', params);
    return await response.data;
  },

  //添加批次
  addPayment: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/addPayment', params);
    return await response.data;
  },
  //询问财务是否可付
  enquireFinanceComAccount: async(params)=>{
    let response = await AJAXMsg.post('/soc/messageservice/summarycalculate',params);
    return await response.data;
  },

}

