/**
 * 医疗关系转移
 */
import mock from "../../../../data/health_medical/relationship_transfer/transfer_application.js";
import EventTypes from "../../../EventTypes";

const state = {
  rows: [],
  data: {
    transferData: [],
    reimbursementData: [],
    addResult: null,
    //返回的总条数
    transferTotal: 1,
    reimbursementTotal: null,
  }
};


const actions = {
  [EventTypes.TRANSFER_LIST]({commit}, params) {
    mock.transferList(params).then(response => {
      commit(EventTypes.TRANSFER_LIST, response.data)
    })
  },
  [EventTypes.REIMBURSEMENT_LIST]({commit}, params) {
    mock.reimbursementList(params).then(response => {
      commit(EventTypes.REIMBURSEMENT_LIST, response.data)
    })
  },
  [EventTypes.TRANSFER_INSERT]({commit}, params) {
    mock.transferAdd(params.data).then(response => {
      commit(EventTypes.TRANSFER_INSERT, response.data);
      params.callback(response.data);
    }, error => {
      params.errCallback(error);
    }).catch(error => {
      params.errCallback(error);
    })
  },
  [EventTypes.REIMBURSEMENT_INSERT]({commit}, params) {
    mock.reimbursementAdd(params.data).then(response => {
      commit(EventTypes.REIMBURSEMENT_INSERT, response.data);
      params.callback(response.data);
    }, error => {
      params.errCallback(error);
    }).catch(error => {
      params.errCallback(error);
    })
  },

};

const mutations = {
  [EventTypes.TRANSFER_LIST](state, data) {
    state.data.transferData = data.data;
    state.data.transferTotal = data.total;
  },
  [EventTypes.REIMBURSEMENT_LIST](state, data) {
    state.data.reimbursementData = data.data;
    state.data.reimbursementTotal = data.total;
  },
  [EventTypes.TRANSFER_INSERT](state, data) {
    state.data.addResult = data.code;
  },
  [EventTypes.REIMBURSEMENT_INSERT](state, data) {
    state.data.addResult = data.code;
  },

};

const getters = {
  getRows() {
    return state.rows
  }
};

const namespaced = true;

export default {
  namespaced: namespaced,
  state,
  mutations,
  actions,
  getters
}

