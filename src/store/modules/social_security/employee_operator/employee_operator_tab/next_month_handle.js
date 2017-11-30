import mock from "../../../../../data/social_security/employee_operator/employee_operator_tab/next_month_handle_data";
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
  [EventTypes.NEXTMONTHHANDLETYPE]({commit}, params) {
    mock.nextmonthhandle(params).then(response => {
      commit(EventTypes.NEXTMONTHHANDLETYPE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.NEXTMONTHHANDLETYPE](state, data) {
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
