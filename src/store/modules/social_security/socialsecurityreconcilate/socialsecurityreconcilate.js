/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/socialsecurityreconcilate/socialsecurityreconcilateData";
import EventTypes from "./EventTypes";

const state = {
  rows: [],
  data: {
    tableData: []
  }
}


const actions = {
  [EventTypes.SOCIALSECURITYRECONCILATE]({commit}, params) {
    mock.socialSecurityReconcilate(params).then(response => {
      commit(EventTypes.SOCIALSECURITYRECONCILATE, response.data)
    })
  }
}
const mutations = {
  [EventTypes.SOCIALSECURITYRECONCILATE](state, data) {
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
