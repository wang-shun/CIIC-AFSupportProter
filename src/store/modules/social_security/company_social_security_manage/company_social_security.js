/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_social_security_manage/company_social_security_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {
    childCompanyData:[],
    historyTaskData:[],
    workInjuryData:[],
    chatList:[],
  }
}

const actions = {
  [EventTypes.COMPANYSOCIALSECURITYTYPE]({commit}, params) {
    mock.companySocialSecurity(params).then(response => {
      commit(EventTypes.COMPANYSOCIALSECURITYTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYSOCIALSECURITYTYPE](state, data) {
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
