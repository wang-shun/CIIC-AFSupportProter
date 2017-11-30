/**
 * Created by huangye on 2017/10/23.
 */
import mock from "../../../../data/social_security/employee_operator/employee_operator_view_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {}
}

const actions = {
  [EventTypes.EMPLOYEEOPERATORVIEW]({commit}, params) {
    mock.employeeOperatorView(params).then(response => {
      commit(EventTypes.EMPLOYEEOPERATORVIEW, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEOPERATORVIEW](state, data) {
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
