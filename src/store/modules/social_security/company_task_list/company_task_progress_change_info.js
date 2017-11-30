/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_task_list/company_task_progress_change_info_data";
import EventTypes from "./event_types";

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
