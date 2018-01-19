/**
 * Created by huangye on 2018/1/19.
 */
import mock from '../../../../data/Fund/fund_year_adjust/fund_year_adjust_status_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.FUNDYEARADJUSTSTATUS]({commit}, params) {
    mock.fundYearAdjustStatus(params).then(response => {
      commit(EventTypes.FUNDYEARADJUSTSTATUS, response.data)
    })
  }
}

const mutations = {
  [EventTypes.FUNDYEARADJUSTSTATUS](state, data) {
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
