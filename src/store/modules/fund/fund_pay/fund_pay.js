/**
 * Created by huangye on 2018/1/17.
 */
import mock from '../../../../data/Fund/fund_pay/fund_pay_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.FUNDPAY]({commit}, params) {
    mock.fundPay(params).then(response => {
      commit(EventTypes.FUNDPAY, response.data)
    })
  }
}

const mutations = {
  [EventTypes.FUNDPAY](state, data) {
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
