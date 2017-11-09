/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../data/companytasklist/CompanyTaskProgressSendInfoData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    company: {},
    chatList: []
  }
}


const actions = {
  [EventTypes.COMPANYTASKPROGRESSSENDINFOTYPE]({commit}, params) {
    mock.companyTaskProgressSendInfo(params).then(response => {
      commit(EventTypes.COMPANYTASKPROGRESSSENDINFOTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYTASKPROGRESSSENDINFOTYPE](state, data) {
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
