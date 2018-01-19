import mock from "../../data/left_navigation_data";
import EventTypes from "../event_types";

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

