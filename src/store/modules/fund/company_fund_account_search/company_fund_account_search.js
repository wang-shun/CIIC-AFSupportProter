/**
 * Created by huangye on 2018/1/16.
 */
import mock from '../../../../data/Fund/company_fund_account_search/company_fund_account_search_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.COMPANYFUNDACCOUNTSEARCH]({commit}, params) {
    mock.companyFundAccountSearch(params).then(response => {
      commit(EventTypes.COMPANYFUNDACCOUNTSEARCH, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYFUNDACCOUNTSEARCH](state, data) {
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
