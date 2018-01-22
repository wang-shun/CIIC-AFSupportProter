import mock from '../../../../data/credentials_management/org_policy_maintenance_data'
import eventType from './event_types'

const state = {
  orgPolicyList: []
}

const mutations = {
  [eventType.ORG_POLICY_PAGE_SET] (state, payload) {
    state.orgPolicyList = payload.list.data
  }
}

const actions = {
  [eventType.ORG_POLICY_PAGE_SET] ({commit}, payload) {
    mock.getOrgPolicyList.then(response => {
      commit(eventType.ORG_POLICY_PAGE_SET, { list: response.data })
    })
  }
}

const getters = {
  [eventType.ORG_POLICY_PAGE_GET]: state => state.orgPolicyList
}

export default {
  state,
  mutations,
  actions,
  getters
}
