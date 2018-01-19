/**
 * Created by huangye on 2018/1/19.
 */
import mock from '../../../../../data/Fund/fund_year_adjust/fund_year_adjust_tab/step2_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.STEP2]({commit}, params) {
    mock.step2(params).then(response => {
      commit(EventTypes.STEP2, response.data)
    })
  }
}

const mutations = {
  [EventTypes.STEP2](state, data) {
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
