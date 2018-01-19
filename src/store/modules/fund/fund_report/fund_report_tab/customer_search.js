/**
 * Created by huangye on 2018/1/19.
 */
import mock from '../../../../../data/Fund/fund_report/fund_report_tab/customer_search_data'
import EventTypes from '../event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.CUSTOMERSEARCH]({commit}, params) {
    mock.customerSearch(params).then(response => {
      commit(EventTypes.CUSTOMERSEARCH, response.data)
    })
  }
}

const mutations = {
  [EventTypes.CUSTOMERSEARCH](state, data) {
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
