import mock from '../../../../data/credentials_management/emp_credentials_data'
import eventType from './event_types'

const state = {
  employeeList: []
}

const mutations = {
  [eventType.EMPLOYEE_PAGE_SET] (state, payload) {
    state.employeeList = payload.list.data
  }
}

const actions = {
  [eventType.EMPLOYEE_PAGE_SET] ({commit}, payload) {
    mock.getEmployeeList.then(response => {
      commit(eventType.EMPLOYEE_PAGE_SET, { list: response.data })
    })
  }
}

const getters = {
  [eventType.EMPLOYEE_PAGE_GET]: state => state.employeeList
}

export default {
  state,
  mutations,
  actions,
  getters
}
