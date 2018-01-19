import mock from '../../../../data/credentials_management/company_maintenance_data'
import eventType from './event_types'

const state = {
  companyList: []
}

const mutations = {
  [eventType.COMPANY_PAGE_SET] (state, payload) {
    state.companyList = payload.list.data
  }
}

const actions = {
  [eventType.COMPANY_PAGE_SET] ({commit}, payload) {
    mock.getCompanyList.then(response => {
      commit(eventType.COMPANY_PAGE_SET, { list: response.data })
    })
  }
}

const getters = {
  [eventType.COMPANY_PAGE_GET]: state => state.companyList
}

export default {
  state,
  mutations,
  actions,
  getters
}
