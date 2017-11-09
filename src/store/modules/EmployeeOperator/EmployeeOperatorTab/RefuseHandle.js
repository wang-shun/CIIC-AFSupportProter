import mock from "../../../../data/employeeoperator/employeeoperatortab/RefuseHandleData";
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
  [EventTypes.REFUSEHANDLETYPE]({commit}, params) {
    mock.refusehandle(params).then(response => {
      commit(EventTypes.REFUSEHANDLETYPE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.REFUSEHANDLETYPE](state, data) {
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
