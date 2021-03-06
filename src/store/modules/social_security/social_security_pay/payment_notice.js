/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/social_security_pay/payment_notice_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {
    companyName: '',
    companySocialSecurityAccount: '',
    noticeData: [],
    shouldPayAmount: '',
    changeAmount: '',
    applyAmountLower: '',
    applyAmountUpper: '',
    notes: ''
  }
}

const actions = {
  [EventTypes.PAYMENTNOTICETYPE]({commit}, params) {
    mock.paymentNotice(params).then(response => {
      commit(EventTypes.PAYMENTNOTICETYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.PAYMENTNOTICETYPE](state, data) {
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
