/**
 * Created by huangye on 2017/10/23.
 */
import mock from "../../../../data/social_security/employee_special_operator/employee_special_progress_two_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {
    company: {},
    employee: {},
    companyInfo: {},
    operatorMaterialListData: [],
  }
}


const actions = {
  [EventTypes.EMPLOYEESPECIALPROGRESS2]({commit}, params) {
    mock.employeeSpecialProgress2(params).then(response => {
      commit(EventTypes.EMPLOYEESPECIALPROGRESS2, response.data)
    })
  }
}
const mutations = {
  [EventTypes.EMPLOYEESPECIALPROGRESS2](state, data) {
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
