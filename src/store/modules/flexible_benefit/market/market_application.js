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
    page: {
      current: 1,
      pageSize: 10,
      total: 1
    },
  }
};


const actions = {
  [EventTypes.MARKETAPPLICATIONTYPE]({commit}, params) {
    mock.marketData(params).then(response => {
      commit(EventTypes.MARKETAPPLICATIONTYPE, response.data.data)
    })
  },
  [EventTypes.MARKETINSERTTYPE]({commit}, params) {
    mock.marketInsert(params.data).then(response => {
      commit(EventTypes.MARKETINSERTTYPE, response.data);
      params.callback(response)
    }, () => {
      params.errCallback()
    }).catch(() => {
      params.errCallback()
    })
  }
};

const mutations = {
  [EventTypes.MARKETAPPLICATIONTYPE](state, data) {
    state.data.marketListData = data.list;
    state.data.page.current = data.pageNum;
    state.data.page.pageSize = data.pageSize;
    state.data.page.total = data.total;
  },
  [EventTypes.MARKETINSERTTYPE](state, data) {
    state.data.addResult = data;
  }
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

