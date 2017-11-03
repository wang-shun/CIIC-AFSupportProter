/**
 * Created by huangye on 2017/10/23.
 */
import mock from "../../../data/employeeoperator/EmployeeCommcialOperatorData";
import EventTypes from "../../EventTypes";

const state = {
  rows: [],
  data: {
    operatorTableNewData: [],
    operatorTableRepairData: [],
    operatorTableChangeData: [],
    operatorTableOutData: [],
  }
}


const actions = {
  [EventTypes.EMPLOYEECOMMCIALOPERATOR]({commit}, params) {
    mock.employeeCommcialOperator(params).then(response => {
      commit(EventTypes.EMPLOYEECOMMCIALOPERATOR, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEECOMMCIALOPERATOR](state, data) {
    state.data = data.data;
  }
}
const getters = {
  gerRows() {
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

