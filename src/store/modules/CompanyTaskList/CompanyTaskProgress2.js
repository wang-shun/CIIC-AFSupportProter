/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../data/companytasklist/CompanyTaskProgress2Data";
import EventTypes from "./EventTypes";

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
