/**
 * Created by huangye on 2018/1/16.
 */
import mock from '../../../../data/Fund/company_fund_task_list/company_fund_task_progress_three_data'
import EventTypes from './event_types'

const state = {
  rows: [],
  data:{

  }
}

const actions = {
  [EventTypes.COMPANYFUNDTASKPROGRESSTHREE]({commit}, params) {
    mock.companyFundTaskProgressThree(params).then(response => {
      commit(EventTypes.COMPANYFUNDTASKPROGRESSTHREE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.COMPANYFUNDTASKPROGRESSTHREE](state, data) {
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
