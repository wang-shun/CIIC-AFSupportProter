/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/socialsecurityreport/socialsecurityreportData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    tableData: []
  }
}


const actions = {
  [EventTypes.MONTHLYPAYMENTNOTICE]({commit}, params) {
    mock.monthlyPaymentNotice(params).then(response => {
      commit(EventTypes.MONTHLYPAYMENTNOTICE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.MONTHLYPAYMENTNOTICE](state, data) {
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
