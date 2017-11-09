import Vue from 'vue'
import Vuex from 'vuex'

import leftNavigation from './modules/leftNavigation'
import CompanySocialSecurityManage from './modules/CompanySocialSecurityManage'
import CompanyTaskList from './modules/CompanyTaskList'
import EmployeeOperator from './modules/EmployeeOperator'
import EmployeeSpecialOperator from './modules/EmployeeSpecialOperator'
import ShsocialSecurity from './modules/ShSocialSecurity'
import SocialSecurityPay from './modules/SocialSecurityPay'


Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    leftNaviModule : leftNavigation,
    ...CompanySocialSecurityManage,
    ...CompanyTaskList,
    ...EmployeeOperator,
    ...EmployeeSpecialOperator,
    ...ShsocialSecurity,
    ...SocialSecurityPay,
  }
});
