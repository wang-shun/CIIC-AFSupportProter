/**
 * Created by huangye on 2018/1/12.
 */
import mock from '../../../../data/Fund/employee_special_operator/employee_fund_special_progress_two_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.EMPLOYEEFUNDSPECIALPROGRESSTWO]({commit}, params) {
    mock.employeeFundSpecialProgressTwo(params).then(response => {
      commit(EventTypes.EMPLOYEEFUNDSPECIALPROGRESSTWO, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEFUNDSPECIALPROGRESSTWO](state, data) {
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
