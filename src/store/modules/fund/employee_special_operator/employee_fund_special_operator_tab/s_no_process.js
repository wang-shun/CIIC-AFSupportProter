/**
 * Created by huangye on 2018/1/12.
 */
import mock from '../../../../../data/Fund/employee_special_operator/employee_fund_special_operator_tab/s_no_process_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.SNOPROCESS]({commit}, params) {
    mock.sNoProcess(params).then(response => {
      commit(EventTypes.SNOPROCESS, response.data)
    })
  }
}

const mutations = {
  [EventTypes.SNOPROCESS](state, data) {
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
