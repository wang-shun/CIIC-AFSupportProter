/**
 * Created by xiweizhen on 2017-11-16 16:13:12.
 */
import mock from "../../../../data/marketActivity/marketApplication.js";
import EventTypes from "../../../EventTypes";

const state = {
  rows: [],
  data: {
    marketListData: [],
    peopleTypes: []
  }
}


const actions = {
  [EventTypes.MARKETAPPLICATIONTYPE]({commit}, params) {
    mock.marketData(params).then(response => {
      commit(EventTypes.MARKETAPPLICATIONTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.MARKETAPPLICATIONTYPE](state, data) {
    state.data.marketListData = data;
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

