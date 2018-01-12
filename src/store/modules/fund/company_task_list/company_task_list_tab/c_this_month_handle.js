
import mock from '../../../../../data/Fund/company_task_list/company_task_list_tab/c_this_month_handle_data'
import EventTypes from '../EventTypes'

const state = {
  rows: [],
  data:{
    customerData:[],
    taskData:[]
  }
}


const actions = {
  [EventTypes.CTHISMONTHHANDLETYPE]({commit}, params) {
    mock.cThisMonthHandle(params).then(response => {
      commit(EventTypes.CTHISMONTHHANDLETYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.CTHISMONTHHANDLETYPE](state, data) {
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
