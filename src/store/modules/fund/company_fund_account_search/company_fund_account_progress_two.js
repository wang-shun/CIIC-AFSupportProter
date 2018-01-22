/**
 * Created by huangye on 2018/1/17.
 */
import mock from '../../../../data/Fund/company_fund_account_search/company_fund_account_progress_two_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.COMPANYFUNDACCOUNTPROGRESSTWO]({commit}, params) {
    mock.companyFundAccountProgressTwo(params).then(response => {
      commit(EventTypes.COMPANYFUNDACCOUNTPROGRESSTWO, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYFUNDACCOUNTPROGRESSTWO](state, data) {
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
