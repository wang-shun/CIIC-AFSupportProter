/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../data/companysocialsecuritymanage/CompanySocialSecurityManageData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    accountManageData: []
  }
}

const actions = {
  [EventTypes.COMPANYSOCIALSECURITYMANAGETYPE]({commit}, params) {
    mock.companySocialSecurityManage(params).then(response => {
      commit(EventTypes.COMPANYSOCIALSECURITYMANAGETYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYSOCIALSECURITYMANAGETYPE](state, data) {
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
