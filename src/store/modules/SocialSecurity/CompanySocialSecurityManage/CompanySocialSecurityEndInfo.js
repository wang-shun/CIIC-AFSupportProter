/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/SocialSecurity/companysocialsecuritymanage/CompanySocialSecurityEndInfoData";
import EventTypes from './EventTypes'

const state = {
  rows: [],
  data:{
    company:{},
    chatList:[],
  }
}


const actions = {
  [EventTypes.COMPANYSOCIALSECURITYENDINFOTYPE]({commit}, params) {
    mock.companySocialSecurityEndInfo(params).then(response => {
      commit(EventTypes.COMPANYSOCIALSECURITYENDINFOTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYSOCIALSECURITYENDINFOTYPE](state, data) {
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
