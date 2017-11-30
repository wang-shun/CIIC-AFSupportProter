/**
 * Created by xiaoshijun on 2017/11/29.
 */


 import mock from '../../../../../data/social_security/social_security_recon_cilate/social_security_recon_cilate_child/social_security_recon_cilate_detail_data'
 import EventType from '../event_types'


 const state = {
  rows:[],
  data:{
    tableData: []
  }
}
const mutations={
  [EventType.SOCIALSECURITYRECONCILATEDETAIL](state,data){
    state.data = data.data
  }
}
const actions ={
    [EventType.SOCIALSECURITYRECONCILATEDETAIL]({commit},params){
      mock.socialSecurityReconcilateDetail(params).then(response=>{
        debugger
        commit(EventType.SOCIALSECURITYRECONCILATEDETAIL,response.data)
      })

    }
}

const getters = {
  getRows(){
    return state.rows
  }
}

const namespaced = true;

export default{
  namespaced:namespaced,
  state,
  mutations,
  actions,
  getters
}