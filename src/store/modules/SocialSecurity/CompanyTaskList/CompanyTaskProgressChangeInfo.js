/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/SocialSecurity/companytasklist/CompanyTaskProgressChangeInfoData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    company: {},
    chatList: []
  }
}


const actions = {
  [EventTypes.COMPANYTASKPROGRESSCHANGEINFOTYPE]({commit}, params) {
    mock.companyTaskProgressChangeInfo(params).then(response => {
      commit(EventTypes.COMPANYTASKPROGRESSCHANGEINFOTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYTASKPROGRESSCHANGEINFOTYPE](state, data) {
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
