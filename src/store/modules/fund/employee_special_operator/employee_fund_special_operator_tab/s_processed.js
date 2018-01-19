/**
 * Created by huangye on 2018/1/15.
 */
import mock from '../../../../../data/Fund/employee_special_operator/employee_fund_special_operator_tab/s_processed_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.SPROCESSED]({commit}, params) {
    mock.sProcessed(params).then(response => {
      commit(EventTypes.SPROCESSED, response.data)
    })
  }
}

const mutations = {
  [EventTypes.SPROCESSED](state, data) {
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
