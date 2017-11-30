import Vue from 'vue'
import Vuex from 'vuex'

import leftNavigation from './modules/leftNavigation'

//上海社保
<<<<<<< HEAD
import CompanySocialSecurityManage from './modules/SocialSecurity/CompanySocialSecurityManage'
import CompanyTaskList from './modules/SocialSecurity/CompanyTaskList'
import EmployeeOperator from './modules/SocialSecurity/EmployeeOperator'
import EmployeeSpecialOperator from './modules/SocialSecurity/EmployeeSpecialOperator'
import ShsocialSecurity from './modules/SocialSecurity/ShSocialSecurity'
import SocialSecurityPay from './modules/SocialSecurity/social_security_pay'
=======
import CompanySocialSecurityManage from './modules/social_security/company_social_security_manage'
import CompanyTaskList from './modules/social_security/company_task_list'
import EmployeeOperator from './modules/social_security/employee_operator'
import EmployeeSpecialOperator from './modules/social_security/employee_special_operator'
import ShsocialSecurity from './modules/social_security/sh_social_security'
import SocialSecurityPay from './modules/social_security/SocialSecurityPay'
>>>>>>> 909fefb55a359a06600f5642f1cdb5252b21c414

//上海公积金
import EmployeeFundSearch from './modules/Fund/EmployeeFundSearch'
import EmployeeCommonOperator from './modules/Fund/EmployeeCommonOperator'

//弹性福利
import gift from "./modules/flexible_benefit/gift"
import market from "./modules/flexible_benefit/market"
//社保对账
<<<<<<< HEAD
import SocialSecurityReconcilate from './modules/SocialSecurity/social_security_recon_cilate'
//社保报表
import Socialsecurityreport from './modules/SocialSecurity/social_security_report' 
=======
import SocialSecurityReconcilate from './modules/social_security/socialsecurityreconcilate'
//社保报表
import Socialsecurityreport from './modules/social_security/socialsecurityreport'
>>>>>>> 909fefb55a359a06600f5642f1cdb5252b21c414
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
    ...SocialSecurityReconcilate,
    ...Socialsecurityreport
  }
});
