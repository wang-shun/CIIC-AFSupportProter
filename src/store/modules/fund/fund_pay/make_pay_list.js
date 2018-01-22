/**
 * Created by huangye on 2018/1/17.
 */
import mock from '../../../../data/Fund/fund_pay/make_pay_list_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.MAKEPAYLIST]({commit}, params) {
    mock.makePayList(params).then(response => {
      commit(EventTypes.MAKEPAYLIST, response.data)
    })
  }
}

const mutations = {
  [EventTypes.MAKEPAYLIST](state, data) {
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
