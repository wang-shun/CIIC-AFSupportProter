import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  getComFundAccountNameList: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/companyFundAccount/getComFundAccountNameList', params);
    return await response.data;
  }
}
