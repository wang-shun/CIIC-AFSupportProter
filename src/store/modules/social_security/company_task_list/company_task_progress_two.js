/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/company_task_list/company_task_progress_two_data";
import EventTypes from "./event_types";

const state = {
  rows: [],
  data: {
    operatorMaterialListData: [],
    chatList: [],
  }
}

const actions = {
  [EventTypes.COMPANYTASKPROGRESS2TYPE]({commit}, params) {
    mock.companyTaskProgress2(params).then(response => {
      commit(EventTypes.COMPANYTASKPROGRESS2TYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYTASKPROGRESS2TYPE](state, data) {
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
