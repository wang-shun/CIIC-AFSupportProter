import mock from "../../../../data/social_security/sh_social_security/employee_social_security_search_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data:{
    customerData:[],
    sSocialSecurityTypeData:[],
    employeeSocialSecurityData:[],
  }
}

const actions = {
  [EventTypes.EMPLOYEESOCIALSECURITYSEARCH]({commit}, params) {
    mock.employeeSocialSecuritySearch(params).then(response => {
      commit(EventTypes.EMPLOYEESOCIALSECURITYSEARCH, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEESOCIALSECURITYSEARCH](state, data) {
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

