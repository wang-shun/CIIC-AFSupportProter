import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  getComFundAccountClassNameList: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/companyFundAccount/getComFundAccountClassNameList', params);
    return await response.data;
  },
  getComFundAccountNameList: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/companyFundAccount/getComFundAccountNameList', params);
    return await response.data;
  },
}
