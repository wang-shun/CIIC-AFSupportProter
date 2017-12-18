import mock from '../../../../data/social_security/sh_social_security/company_social_security_new_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{
    company:{},
    employee:{},
    taskNewInfo:{},
    taskChangeInfo:{},
    taskNewInfoData:[],
    taskOutInfo:{},
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

