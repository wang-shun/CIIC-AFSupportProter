/**
 * Created by huangye on 2017/10/24.
 */
import mock from "../../../../data/employeespecialoperator/employeespecialoperatortab/ProgressingData";
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
  [EventTypes.PROGRESSINGTYPE]({commit}, params) {
    mock.Progressing(params).then(response => {
      commit(EventTypes.PROGRESSINGTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.PROGRESSINGTYPE](state, data) {
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
