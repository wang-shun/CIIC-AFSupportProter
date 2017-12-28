/**
 * Created by xiweizhen on 2017-11-16 16:13:12.
 */
import mock from "../../../../data/flexible_benefit/market/market_application.js";
import EventTypes from "../../../EventTypes";

const state = {
  rows: [],
  data: {
    marketListData: [],
    addResult: '',
    total: null,
  }
};


const actions = {
  [EventTypes.MARKETAPPLICATIONTYPE]({commit}, params) {
    return mock.marketData(params).then(response => {
      commit(EventTypes.MARKETAPPLICATIONTYPE, response.data)
    })
  },
  [EventTypes.MARKETINSERTTYPE]({commit}, params) {
    mock.marketInsert(params.data).then(response => {
      commit(EventTypes.MARKETINSERTTYPE, response.data);
      params.callback(response)
    }, error => {
      params.errCallback(error)
    }).catch(error => {
      params.errCallback(error)
    })
  },
  [EventTypes.MARKETUPDATETYPE]({commit}, params) {
    mock.marketUpdate(params.data).then(response => {
      commit(EventTypes.MARKETUPDATETYPE, response.data);
      params.callback(response)
    }, error => {
      params.errCallback(error)
    }).catch(error => {
      params.errCallback(error)
    })
  },
};

const mutations = {
  [EventTypes.MARKETAPPLICATIONTYPE](state, data) {
    state.data.marketListData = data.object.records;
    //不需要的数据，覆盖前台会出现显示问题
    // state.data.page.current = data.pageNum;
    // state.data.page.pageSize = data.pageSize;
    state.data.total = data.object.total;
  },
  [EventTypes.MARKETINSERTTYPE](state, data) {
    state.data.addResult = data;
  },
  [EventTypes.MARKETUPDATETYPE](state, data) {
    state.data.addResult = data;
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

