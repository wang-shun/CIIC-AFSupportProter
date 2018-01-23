/**
 * Created by huangye on 2018/1/17.
 */
import mock from '../../../../data/Fund/fund_reconciliation/fund_reconciliation_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.FUNDRECONCILIATION]({commit}, params) {
    mock.fundReconciliation(params).then(response => {
      commit(EventTypes.FUNDRECONCILIATION, response.data)
    })
  }
}

const mutations = {
  [EventTypes.FUNDRECONCILIATION](state, data) {
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
