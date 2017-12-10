/**
 * Created by xiweizhen on 2017-11-16 16:13:12.
 */
import mock from "../../../../data/flexible_benefit/gift/gift_application.js";
import EventTypes from "../../../EventTypes";

const state = {
  rows: [],
  data: {
    giftManagerData: [],
    addResult: "",
    page: {
      current: 1,
      pageSize: 10,
      total: 1
    },
    giftInfo: {}

  }
};


const actions = {
  [EventTypes.GIFTAPPLICATIONTYPE]({commit}, params) {
    mock.giftData(params).then(response => {
      commit(EventTypes.GIFTAPPLICATIONTYPE, response.data.data)
    })
  },
  [EventTypes.GIFTINSERTTYPE]({commit}, params) {
    mock.giftInsert(params.data).then(response => {
      commit(EventTypes.GIFTINSERTTYPE, response.data);
      params.callback(response)
    }, () => {
      params.errCallback()
    }).catch(() => {
      params.errCallback()
    })
  },
};

const mutations = {
  [EventTypes.GIFTAPPLICATIONTYPE](state, data) {
    state.data.giftManagerData = data.list;
    state.data.page.current = data.pageNum;
    state.data.page.pageSize = data.pageSize;
    state.data.page.total = data.total;
  },
  [EventTypes.GIFTINSERTTYPE](state, data) {
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

