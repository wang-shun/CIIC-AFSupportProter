import mock from "../../../../../data/social_security/employee_operator/employee_operator_tab/Finish_handle_data";
import EventTypes from "../event_types";

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
