/**
 * Created by huangye on 2018/1/15.
 */
import mock from '../../../../data/Fund/employee_transfer_operator/employee_fund_transfer_operator_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.EMPLOYEETRANSFEROPERATOR]({commit}, params) {
    mock.employeeFundTransferOperator(params).then(response => {
      commit(EventTypes.EMPLOYEETRANSFEROPERATOR, response.data)
    })
  }
}

const mutations = {
  [EventTypes.EMPLOYEETRANSFEROPERATOR](state, data) {
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
