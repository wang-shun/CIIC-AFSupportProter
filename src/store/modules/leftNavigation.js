import mock from "../../data/LeftNavigationData";
import EventTypes from "../EventTypes";

const state = {
  rows: []
}

const actions = {
  [EventTypes.LEFTNAVIGATION_SETLIST]({commit}, params){
    mock.leftNavigationList(params).then(response => {
        commit(EventTypes.LEFTNAVIGATION_SETLIST, response.data)
      }
    )
  }
}

const mutations = {
  [EventTypes.LEFTNAVIGATION_SETLIST](state, data){
    state.rows = data.data;
  }
}

const getters = {
  getRows(){
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

