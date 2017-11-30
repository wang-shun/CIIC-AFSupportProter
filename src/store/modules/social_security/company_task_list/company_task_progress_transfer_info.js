/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_task_list/company_task_progress_transfer_info_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {
    company: {},
    chatList: []
  }
}


const actions = {
  [EventTypes.COMPANYTASKPROGRESSTRANSFERINFOTYPE]({commit}, params) {
    mock.companyTaskProgressTransferInfo(params).then(response => {
      commit(EventTypes.COMPANYTASKPROGRESSTRANSFERINFOTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYTASKPROGRESSTRANSFERINFOTYPE](state, data) {
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
