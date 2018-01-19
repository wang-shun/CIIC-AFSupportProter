/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../../data/Fund/company_task_list/company_task_list_tab/c_refused_data";
import EventTypes from "../EventTypes";

const state = {
  rows: [],
  data: {
    customerData: [],
    taskData: [],
  }
}


const actions = {
  [EventTypes.CREFUSEDTYPE]({commit}, params) {
    mock.cRefused(params).then(response => {
      commit(EventTypes.CREFUSEDTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.CREFUSEDTYPE](state, data) {
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
