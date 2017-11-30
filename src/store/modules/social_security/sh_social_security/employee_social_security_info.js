import mock from "../../../../data/social_security/sh_social_security/employee_social_security_info_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {
    customer: {},
    employee: {},
    ssinfo: {},
    socialSecurityInfoListData: [],
    changeListData: [],
  }
}


const actions = {
  [EventTypes.EMPLOYEESOCIALSECURITYINFO]({commit}, params) {
    mock.employeeSocialSecurityInfo(params).then(response => {
      commit(EventTypes.EMPLOYEESOCIALSECURITYINFO, response.data)
    })
  }
}
 
const mutations = {
  [EventTypes.EMPLOYEESOCIALSECURITYINFO](state, data) {
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
