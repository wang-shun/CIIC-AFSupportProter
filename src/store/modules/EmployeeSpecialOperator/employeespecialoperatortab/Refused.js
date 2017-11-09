/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/employeespecialoperator/employeespecialoperatortab/RefusedData";
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
  [EventTypes.REFUSEDTYPE]({commit}, params) {
    mock.refused(params).then(response => {
      commit(EventTypes.REFUSEDTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.REFUSEDTYPE](state, data) {
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
