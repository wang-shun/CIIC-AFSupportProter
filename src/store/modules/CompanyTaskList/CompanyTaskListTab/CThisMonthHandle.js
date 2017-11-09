
import mock from '../../../../data/companytasklist/companytasklisttab/CThisMonthHandleData'
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
