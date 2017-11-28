/**
 * Created by huangye on 2017/11/24.
 */
import mock from '../../../../../data/Fund/employeecommonoperator/employeefundcommonoperatortab/noProcessData'
import EventTypes from '../EventTypes'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.NOPROCESS]({commit}, params) {
    mock.noProcess(params).then(response => {
      commit(EventTypes.NOPROCESS, response.data)
    })
  }
}

const mutations = {
  [EventTypes.NOPROCESS](state, data) {
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
