/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../data/companysocialsecuritymanage/CompanySocialSecurityProgress2Data";
import EventTypes from "../../EventTypes";

const state = {
  rows: [],
  data: {
    companyInfo: {},
    operatorMaterialListData: [],
    chatList: [],
  }
}


const actions = {
  [EventTypes.COMPANYSOCIALSECURITYPROGRESS2TYPE]({commit}, params) {
    mock.companySocialSecurityProgress2(params).then(response => {
      commit(EventTypes.COMPANYSOCIALSECURITYPROGRESS2TYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYSOCIALSECURITYPROGRESS2TYPE](state, data) {
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
