/**
 * Created by huangye on 2018/1/19.
 */
import mock from '../../../../../data/Fund/fund_report/fund_report_tab/personal_search_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.PERSONALSEARCH]({commit}, params) {
    mock.personalSearch(params).then(response => {
      commit(EventTypes.PERSONALSEARCH, response.data)
    })
  }
}

const mutations = {
  [EventTypes.PERSONALSEARCH](state, data) {
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
