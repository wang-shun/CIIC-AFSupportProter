/**
 * Created by huangye on 2017/10/25.
 */
import mock from "../../../../data/social_security/social_security_recon_cilate/social_security_recon_cilate_data";
import EventTypes from "./event_types";

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
