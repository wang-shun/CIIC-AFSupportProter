/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/SocialSecurity/socialsecuritypay/SocialSecurityPayData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    customerData: [],
    changeData: [],
    payData: [],
  }
}


const actions = {
  [EventTypes.SOCIALSECURITYPAYTYPE]({commit}, params) {
    mock.socialSecurityPay(params).then(response => {
      commit(EventTypes.SOCIALSECURITYPAYTYPE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.SOCIALSECURITYPAYTYPE](state, data) {
    state.data = data.data;
  }
}

const getters = {
  getRows() {
    return state.rows
  }
}

const namespaced = true;

export default {
  namespaced: namespaced,
  state,
  mutations,
  actions,
  getters
}
