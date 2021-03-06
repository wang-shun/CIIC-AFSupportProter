/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/social_security_pay/social_security_pay_data";
import EventTypes from "./event_types";

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
