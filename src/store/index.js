import Vue from 'vue'
import Vuex from 'vuex'

import leftNavigation from './modules/leftNavigation'

//上海社保
import CompanySocialSecurityManage from './modules/SocialSecurity/CompanySocialSecurityManage'
import CompanyTaskList from './modules/SocialSecurity/CompanyTaskList'
import EmployeeOperator from './modules/SocialSecurity/EmployeeOperator'
import EmployeeSpecialOperator from './modules/SocialSecurity/EmployeeSpecialOperator'
import ShsocialSecurity from './modules/SocialSecurity/ShSocialSecurity'
import SocialSecurityPay from './modules/SocialSecurity/SocialSecurityPay'

//上海公积金
import EmployeeFundSearch from './modules/Fund/EmployeeFundSearch'
import EmployeeCommonOperator from './modules/Fund/EmployeeCommonOperator'

//弹性福利
import gift from "./modules/ElasticWelfare/gift"
import market from "./modules/ElasticWelfare/market"

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

    ...EmployeeFundSearch,
    ...EmployeeCommonOperator,

    ...gift,
    ...market,
  }
});
