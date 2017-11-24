/**
 * Created by huangye on 2017/11/22.
 */
import mock from '../../../../data/Fund/employeefundsearch/EmployeeFundBasicInfoData'
import EventTypes from './EventTypes'

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
