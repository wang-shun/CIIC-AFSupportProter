/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../../data/Fund/company_task_list/company_task_list_tab/c_next_month_handle_data";
import EventTypes from "../EventTypes";

const state = {
  rows: [],
  data: {
    customerData: [],
    taskData: [],
  }
}


const actions = {
  [EventTypes.CNEXTMONTHHANDLETYPE]({commit}, params) {
    mock.cNextMonthHandle(params).then(response => {
      commit(EventTypes.CNEXTMONTHHANDLETYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.CNEXTMONTHHANDLETYPE](state, data) {
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
