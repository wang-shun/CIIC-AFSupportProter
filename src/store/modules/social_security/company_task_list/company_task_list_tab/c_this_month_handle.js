
import mock from '../../../../../data/social_security/company_task_list/company_task_list_tab/c_this_month_handle_data'
import EventTypes from '../event_types'
import Axios from 'axios'
import {domainJson,getLocation} from '../../../../../data/domain_info'
const state = {
    customerName:'',
    customerIdentity:''
}


const actions = {
  [EventTypes.CTHISMONTHHANDLETYPE]({commit}, params) {
    mock.cThisMonthHandle(params).then(response => {
      
      commit(EventTypes.CTHISMONTHHANDLETYPE, response.data)
    })
  }
}

const mutations = {
  [EventTypes.CTHISMONTHHANDLETYPE](state, data) {
 
    state.customerName = data.name;
    state.customerIdentity = data.code;
  }
}
const getters = {
  getRows() {
    return state.rows
  }
}

const namespaced = false;

export default {
  namespaced: namespaced,
  state,
  mutations,
  actions,
  getters
}
