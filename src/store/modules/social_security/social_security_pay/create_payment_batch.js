const state = {
  rows: [],
  data: {
    companyName: '',
    companySocialSecurityAccount: '',
    noticeData: [],
    shouldPayAmount: '',
    changeAmount: '',
    applyAmountLower: '',
    applyAmountUpper: '',
    notes: ''
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
