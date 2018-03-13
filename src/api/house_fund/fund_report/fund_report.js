import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  hfMonthChargeQuery: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfMonthCharge/hfMonthChargeQuery', params);
    return await response.data;
  },
}
