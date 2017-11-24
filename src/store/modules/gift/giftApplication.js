/**
 * Created by xiweizhen on 2017-11-16 16:13:12.
 */
import mock from "../../../data/gift/giftApplication.js";
import EventTypes from "../../EventTypes";

const state = {
  rows: [],
  data: {
    giftManagerData: [],
    addResult: "",
  }
}


const actions = {
  [EventTypes.GIFTAPPLICATIONTYPE]({commit}, params) {
    mock.giftData(params).then(response => {
      commit(EventTypes.GIFTAPPLICATIONTYPE, response.data)

    })
  },
  [EventTypes.GIFTINSERTTYPE]({commit}, params) {
    mock.giftInsert(params.data).then(response => {
      commit(EventTypes.GIFTINSERTTYPE, response.data)
      params.callback(response)
    }, () => {
      params.errCallback()
    }).catch(() => {
      params.errCallback()
    })
  }
}

const mutations = {
  [EventTypes.GIFTAPPLICATIONTYPE](state, data) {
    state.data.giftManagerData = data;
  },
  [EventTypes.GIFTINSERTTYPE](state, data) {
    state.data.addResult = data;
  },
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

