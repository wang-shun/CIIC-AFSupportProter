/**
 * Created by huangye on 2018/1/15.
 */
import mock from '../../../../data/Fund/employee_special_operator/employee_fund_special_progress_three_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.EMPLOYEEFUNDSPECIALPROGRESSTHREE]({commit}, params) {
    mock.employeeFundSpecialProgressThree(params).then(response => {
      commit(EventTypes.EMPLOYEEFUNDSPECIALPROGRESSTHREE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEEFUNDSPECIALPROGRESSTHREE](state, data) {
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
