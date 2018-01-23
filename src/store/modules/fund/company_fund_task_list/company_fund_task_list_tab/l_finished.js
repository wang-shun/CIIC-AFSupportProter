/**
 * Created by huangye on 2018/1/16.
 */
import mock from '../../../../../data/Fund/company_fund_task_list/company_fund_task_list_tab/l_finished_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.LFINISHED]({commit}, params) {
    mock.lFinished(params).then(response => {
      commit(EventTypes.LFINISHED, response.data)
    })
  }
}

const mutations = {
  [EventTypes.LFINISHED](state, data) {
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
