/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_social_security_manage/company_social_security_end_info_data";
import EventTypes from './event_types'

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
