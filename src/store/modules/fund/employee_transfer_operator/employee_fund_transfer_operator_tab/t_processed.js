/**
 * Created by huangye on 2018/1/15.
 */
import mock from '../../../../../data/Fund/employee_transfer_operator/employee_fund_transfer_operator_tab/t_processed_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.TPROCESSED]({commit}, params) {
    mock.tProcessed(params).then(response => {
      commit(EventTypes.TPROCESSED, response.data)
    })
  }
}

const mutations = {
  [EventTypes.TPROCESSED](state, data) {
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
