/**
 * Created by huangye on 2017/11/22.
 */
import mock from '../../../../data/Fund/employee_fund_search/employee_fund_search_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{
    employeeFundData: [],
    companyFundAccountList:[],
    companyData: [],
    importFailedData: []
  }
}

const actions = {
  [EventTypes.EMPLOYEEFUNDSEARCHTYPE]({commit}, params) {
    mock.employeeFundSearch(params).then(response => {
      commit(EventTypes.EMPLOYEEFUNDSEARCHTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEFUNDSEARCHTYPE](state, data) {
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
