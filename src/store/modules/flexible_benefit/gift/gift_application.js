/**
 * Created by xiweizhen on 2017-11-16 16:13:12.
 */
import mock from "../../../../data/flexible_benefit/gift/gift_application.js";
import EventTypes from "../../../EventTypes";

const state = {
  rows: [],
  data: {
    giftManagerData: [],
    addResult: null,
    total: null,
    current: 1,
    giftInfo: {}

  }
};


const actions = {
  [EventTypes.GIFTAPPLICATIONTYPE]({commit}, params) {
    return mock.giftData(params).then(response => {
      commit(EventTypes.GIFTAPPLICATIONTYPE, response.data)
    })
  },
  [EventTypes.GIFTINSERTTYPE]({commit}, params) {
    mock.giftInsert(params.data).then(response => {
      commit(EventTypes.GIFTINSERTTYPE, response.data);
      params.callback(response)
    }, error => {
      params.errCallback(error);
    }).catch(error => {
      params.errCallback(error);
    })
  },
  [EventTypes.GIFTUPDATETYPE]({commit}, params) {
    mock.giftUpdate(params.data).then(response => {
      commit(EventTypes.GIFTUPDATETYPE, response.data);
      params.callback(response)
    }, error => {
      params.errCallback(error);
    }).catch(error => {
      params.errCallback(error);
    })
  },
};

const mutations = {
  [EventTypes.GIFTAPPLICATIONTYPE](state, data) {
    state.data.giftManagerData = data.object.records;
    //不需要的数据，覆盖前台会出现显示问题
    // state.data.current = data.pageNum;
    // state.data.pageSize = data.pageSize;
    state.data.total = data.object.total;
  },
  [EventTypes.GIFTINSERTTYPE](state, data) {
    state.data.addResult = data;
  },
  [EventTypes.GIFTUPDATETYPE](state, data) {
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

