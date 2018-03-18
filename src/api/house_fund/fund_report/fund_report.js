import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  hfMonthChargeQuery: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfMonthCharge/hfMonthChargeQuery', params);
    return await response.data;
  },
  hfMonthChargeExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/hfMonthChargeExport', params);
  },
  basicDetailListExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/basicDetailListExport', params);
  },
}
