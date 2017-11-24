/**
 * Created by huangye on 2017/11/22.
 */
import mock from '../../../../data/Fund/employeefundsearch/EmployeeFundHistoryDetailData'
import EventTypes from './EventTypes'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]({commit}, params) {
    mock.employeeFundHistoryDetail(params).then(response => {
      commit(EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE](state, data) {
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
