/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../../data/SocialSecurity/employeespecialoperator/employeespecialoperatortab/FinishedData";
import EventTypes from "../EventTypes";

const state = {
  rows: [],
  data: {
    customerData: [],
    sSocialSecurityTypeData: [],
    employeeResultData: [],
  }
}


const actions = {
  [EventTypes.FINISHEDTYPE]({commit}, params) {
    mock.finished(params).then(response => {
      commit(EventTypes.FINISHEDTYPE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.FINISHEDTYPE](state, data) {
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
