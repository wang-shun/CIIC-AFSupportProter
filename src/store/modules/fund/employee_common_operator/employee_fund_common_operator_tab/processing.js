/**
 * Created by huangye on 2017/11/24.
 */
import mock from '../../../../../data/Fund/employee_common_operator/employee_fund_common_operator_tab/processing_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.PROCESSING]({commit}, params) {
    mock.processing(params).then(response => {
      commit(EventTypes.PROCESSING, response.data)
    })
  }
}

const mutations = {
  [EventTypes.PROCESSING](state, data) {
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
