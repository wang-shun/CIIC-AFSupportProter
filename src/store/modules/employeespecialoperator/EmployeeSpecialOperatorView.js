/**
 * Created by huangye on 2017/10/23.
 */
import mock from "../../../data/employeespecialoperator/EmployeeSpecialOperatorViewData";
import EventTypes from "../../EventTypes";

const state = {
  rows: [],
  data: {
    customerData: [],
    sSocialSecurityTypeData: [],
    employeeResultData: [],
  }
}


const actions = {
  [EventTypes.EMPLOYEESPECIALOPERATORVIEW]({commit}, params) {
    mock.employeeSpecialOperatorView(params).then(response => {
      commit(EventTypes.EMPLOYEESPECIALOPERATORVIEW, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEESPECIALOPERATORVIEW](state, data) {
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

