import Vue from 'vue'
import Vuex from 'vuex'

import leftNavigation from './modules/left_navigation'

//上海社保
import CompanySocialSecurityManage from './modules/social_security/company_social_security_manage'
import CompanyTaskList from './modules/social_security/company_task_list'
import EmployeeOperator from './modules/social_security/employee_operator'
import EmployeeSpecialOperator from './modules/social_security/employee_special_operator'
import ShsocialSecurity from './modules/social_security/sh_social_security'
import SocialSecurityPay from './modules/social_security/social_security_pay'


//上海公积金
import EmployeeFundSearch from './modules/fund/employee_fund_search'
import EmployeeCommonOperator from './modules/fund/employee_common_operator'
import EmployeeFundSpecialOperator from './modules/fund/employee_special_operator'
import EmployeeFundTransferOperator from './modules/fund/employee_transfer_operator'
import CompanyFundTaskList from './modules/fund/company_fund_task_list'
import CompanyFundAccountSearch from './modules/fund/company_fund_account_search'

//弹性福利
import gift from "./modules/flexible_benefit/gift"
import market from "./modules/flexible_benefit/market"

//健康医疗
import transfer from './modules/health_medical/relationship_transfer'
//社保对账

import SocialSecurityReconcilate from './modules/social_security/social_security_recon_cilate'
//社保报表
import Socialsecurityreport from './modules/social_security/social_security_report'
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
    ...EmployeeFundSpecialOperator,
    ...EmployeeFundTransferOperator,
    ...CompanyFundTaskList,
    ...CompanyFundAccountSearch,

    ...gift,
    ...market,

    ...transfer,
    ...SocialSecurityReconcilate,
    ...Socialsecurityreport
  }
});
