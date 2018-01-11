/**
 * Created by huangye on 2017/11/22.
 */
import mock from '../../../../data/Fund/employee_fund_search/employee_fund_basic_info_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.EMPLOYEEFUNDBASICINFO]({commit}, params) {
    mock.employeeFundBasicInfo(params).then(response => {
      commit(EventTypes.EMPLOYEEFUNDBASICINFO, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEFUNDBASICINFO](state, data) {
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
