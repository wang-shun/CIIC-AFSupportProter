import mock from "../../../../../data/SocialSecurity/employeeoperator/employeeoperatortab/NextMonthHandleData";
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
