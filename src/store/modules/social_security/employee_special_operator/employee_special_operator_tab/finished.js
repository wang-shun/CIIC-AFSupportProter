/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../../data/social_security/employee_special_operator/employee_special_operator_tab/finished_data";
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
