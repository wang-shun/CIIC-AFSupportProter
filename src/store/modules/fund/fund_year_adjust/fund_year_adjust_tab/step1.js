/**
 * Created by huangye on 2018/1/19.
 */
import mock from '../../../../../data/Fund/fund_year_adjust/fund_year_adjust_tab/step1_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.STEP1]({commit}, params) {
    mock.step1(params).then(response => {
      commit(EventTypes.STEP1, response.data)
    })
  }
}

const mutations = {
  [EventTypes.STEP1](state, data) {
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
