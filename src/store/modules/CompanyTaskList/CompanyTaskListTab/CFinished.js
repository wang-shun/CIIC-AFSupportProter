/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/companytasklist/companytasklisttab/CFinishedData";
import EventTypes from "../EventTypes";

const state = {
  rows: [],
  data: {
    customerData: [],
    taskData: [],
  }
}


const actions = {
  [EventTypes.CFINISHEDTYPE]({commit}, params) {
    mock.cFinished(params).then(response => {
      commit(EventTypes.CFINISHEDTYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.CFINISHEDTYPE](state, data) {
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
