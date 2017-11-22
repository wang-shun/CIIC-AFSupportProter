import Vue from 'vue'
import Vuex from 'vuex'

import leftNavigation from './modules/leftNavigation'
import CompanySocialSecurityManage from './modules/SocialSecurity/CompanySocialSecurityManage'
import CompanyTaskList from './modules/SocialSecurity/CompanyTaskList'
import EmployeeOperator from './modules/SocialSecurity/EmployeeOperator'
import EmployeeSpecialOperator from './modules/SocialSecurity/EmployeeSpecialOperator'
import ShsocialSecurity from './modules/SocialSecurity/ShSocialSecurity'
import SocialSecurityPay from './modules/SocialSecurity/SocialSecurityPay'


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
