/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/SocialSecurity/companysocialsecuritymanage/CompanySocialSecurityChangeInfoData";
import EventTypes from './EventTypes'

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
