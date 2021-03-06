/**
 * 医疗关系转移
 */
import mock from "../../../../data/health_medical/transfer_application.js";
import EventTypes from "../../../event_types";

const state = {
  rows: [],
  data: {
    transferData: [],
    reimbursementData: [],
    addResult: null,
    //返回的总条数
    transferTotal: 1,
    reimbursementTotal: null,
    employeeInfo: {},
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
  [EventTypes.TRANSFER_UPDATE]({commit}, params) {
    mock.transferUpdate(params.data).then(response => {
      commit(EventTypes.TRANSFER_UPDATE, response.data);
      params.callback(response.data);
    }, error => {
      params.errCallback(error);
    }).catch(error => {
      params.errCallback(error);
    })
  },
  [EventTypes.REIMBURSEMENT_UPDATE]({commit}, params) {
    mock.reimbursementUpdate(params.data).then(response => {
      commit(EventTypes.REIMBURSEMENT_UPDATE, response.data);
      params.callback(response.data);
    }, error => {
      params.errCallback(error);
    }).catch(error => {
      params.errCallback(error);
    })
  },
  [EventTypes.EMPLOYEEINFO]({commit}, params) {
    mock.getEmployeeInfo(params.data).then(response => {
      commit(EventTypes.EMPLOYEEINFO, response.data.object);
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
    state.data.transferData = data.object.records;
    state.data.transferTotal = data.object.total;
  },
  [EventTypes.REIMBURSEMENT_LIST](state, data) {
    state.data.reimbursementData = data.object.records;
    state.data.reimbursementTotal = data.object.total;
  },
  [EventTypes.TRANSFER_INSERT](state, data) {
    state.data.addResult = data.object.code;
  },
  [EventTypes.REIMBURSEMENT_INSERT](state, data) {
    state.data.addResult = data.object.code;
  },
  [EventTypes.TRANSFER_UPDATE](state, data) {
    state.data.addResult = data.object.code;
  },
  [EventTypes.REIMBURSEMENT_UPDATE](state, data) {
    state.data.addResult = data.object.code;
  },
  [EventTypes.EMPLOYEEINFO](state, data) {
    state.data.employeeInfo = data.data;
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

