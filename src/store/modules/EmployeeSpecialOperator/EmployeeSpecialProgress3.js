/**
 * Created by huangye on 2017/10/23.
 */
import mock from "../../../data/employeespecialoperator/EmployeeSpecialProgress3Data";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    company: {},
    employee: {},
    companyInfo: {},
  }
}

const actions = {
  [EventTypes.EMPLOYEESPECIALPROGRESS3]({commit}, params) {
    mock.employeeSpecialProgress3(params).then(response => {
      commit(EventTypes.EMPLOYEESPECIALPROGRESS3, response.data)
    })
  }
}


const mutations = {
  [EventTypes.EMPLOYEESPECIALPROGRESS3](state, data) {
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
