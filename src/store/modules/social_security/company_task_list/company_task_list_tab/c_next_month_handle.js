/**
 * Created by huangye on 2017/10/25.
 */
//import mock from "../../../../../data/social_security/company_task_list/company_task_list_tab/c_next_month_handle_data";
import EventTypes from "../event_types";

const state = {
  customerName:'',
  customerIdentity:''
}


// const actions = {
//   [EventTypes.CNEXTMONTHHANDLETYPE]({commit}, params) {
//     mock.cNextMonthHandle(params).then(response => {
//       commit(EventTypes.CNEXTMONTHHANDLETYPE, response.data)
//     })
//   }
// }

const mutations = {
  [EventTypes.CNEXTMONTHHANDLETYPE](state, data) {
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
 // actions,
  getters
}
