import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  companyFundAccountSearch: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/companyFundAccount/getComFundAccountList', params);
    return await response.data;
  },
  conFundAccountDetail: async (params) => {
    let response = await AJAX.get(`/api/fundcommandservice/companyFundAccount/getConFundAccountDetail/${params.params.comAccountId}/${params.params.hfType}`);
    return await response.data;
  },
  companyFundAccount: async (params) => {
    let response = await AJAX.get(`/api/fundcommandservice/companyFundAccount/getComFundAccountCompanyList/${params.params.comAccountId}`);
    return await response.data;
  }
}
