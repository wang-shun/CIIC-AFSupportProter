/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_task_list/company_task_progress_send_info_data";
import EventTypes from "./event_types";

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
