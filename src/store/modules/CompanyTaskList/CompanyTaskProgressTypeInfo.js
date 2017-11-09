/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../data/companytasklist/CompanyTaskProgressTypeInfoData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {}
}


const actions = {
  [EventTypes.COMPANYTASKPROGRESSTYPEINFOTYPE]({commit}, params) {
    mock.companyTaskProgressTypeInfo(params).then(response => {
      commit(EventTypes.COMPANYTASKPROGRESSTYPEINFOTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYTASKPROGRESSTYPEINFOTYPE](state, data) {
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
