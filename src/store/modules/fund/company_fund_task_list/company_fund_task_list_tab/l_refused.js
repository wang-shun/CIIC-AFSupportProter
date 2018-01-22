/**
 * Created by huangye on 2018/1/16.
 */
import mock from '../../../../../data/Fund/company_fund_task_list/company_fund_task_list_tab/l_refused_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.LREFUSED]({commit}, params) {
    mock.lRefused(params).then(response => {
      commit(EventTypes.LREFUSED, response.data)
    })
  }
}

const mutations = {
  [EventTypes.LREFUSED](state, data) {
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
