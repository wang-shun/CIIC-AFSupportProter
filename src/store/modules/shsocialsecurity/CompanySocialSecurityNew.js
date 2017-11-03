import mock from '../../../data/shsocialsecurity/CompanySocialSecurityNewData'
import EventTypes from '../../EventTypes'

const state = {
  rows: [],
  data:{
    company:{},
    employee:{},
    taskNewInfo:{},
    taskChangeInfo:{},
    taskNewInfoData:[],
  }
}

const actions = {
  [EventTypes.COMPANYSOCIALSECURITYNEWTYPE]({commit}, params) {
    mock.companySocialSecurityNew(params).then(response => {
      commit(EventTypes.COMPANYSOCIALSECURITYNEWTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYSOCIALSECURITYNEWTYPE](state, data) {
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

