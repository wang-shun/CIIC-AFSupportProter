/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_social_security_manage/company_social_security_change_info_data";
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{
    company:{},
    chatList:[],
  }
}


const actions = {
  [EventTypes.COMPANYSOCIALSECURITYCHANGEINFOTYPE]({commit}, params) {
    mock.companySocialSecurityChangeInfo(params).then(response => {
      commit(EventTypes.COMPANYSOCIALSECURITYCHANGEINFOTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYSOCIALSECURITYCHANGEINFOTYPE](state, data) {
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
