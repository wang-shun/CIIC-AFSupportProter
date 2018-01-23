/**
 * Created by huangye on 2018/1/16.
 */
import mock from '../../../../../data/Fund/company_fund_task_list/company_fund_task_list_tab/l_no_process_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.LNOPROCESS]({commit}, params) {
    mock.lNoProcess(params).then(response => {
      commit(EventTypes.LNOPROCESS, response.data)
    })
  }
}

const mutations = {
  [EventTypes.LNOPROCESS](state, data) {
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
