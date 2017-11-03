import mock from "../../../data/shsocialsecurity/EmployeeSocialSecuritySearchData";
import EventTypes from "../../EventTypes";

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

