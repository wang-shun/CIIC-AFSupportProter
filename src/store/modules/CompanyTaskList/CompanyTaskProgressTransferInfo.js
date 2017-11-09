/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../data/companytasklist/CompanyTaskProgressTransferInfoData";
import EventTypes from "./EventTypes";

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
