import ajax from "../../lib/ajax";

const AJAX = ajax.ajaxSsc;

export default {
  
  // 对账查询
  paymentComQuery: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentCom/paymentComQuery', params);
    return await response.data;
  },

  // 保存调整信息
  saveAdjustment: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentCom/saveAdjustment', params);
    return await response.data;
  },

  // 显示可加入批次
  showAddBatch: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPayment/showAddBatch', params);
    return await response.data;
  },
  

  // 添加到出账批次
  doAddBatch: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentCom/doAddBatch', params);
    return await response.data;
  },


  // 从出账批次移除
  doDelBatch: async (params) => {
    let response = await AJAX.post('/api/soccommandservice/ssPaymentCom/doDelBatch', params);
    return await response.data;
  },

}

