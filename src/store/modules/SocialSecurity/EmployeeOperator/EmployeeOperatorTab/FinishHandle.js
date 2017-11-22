import mock from "../../../../../data/SocialSecurity/employeeoperator/employeeoperatortab/FinishHandleData";
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
  [EventTypes.FINISHHANDLETYPE]({commit}, params) {
    mock.finishHandle(params).then(response => {
      commit(EventTypes.FINISHHANDLETYPE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.FINISHHANDLETYPE](state, data) {
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
