/**
 * Created by huangye on 2017/11/22.
 */
import mock from '../../../../data/Fund/employee_fund_search/employee_fund_history_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.EMPLOYEEFUNDHISTORYTYPE]({commit}, params) {
    mock.employeeFundHistory(params).then(response => {
      commit(EventTypes.EMPLOYEEFUNDHISTORYTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEFUNDHISTORYTYPE](state, data) {
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
