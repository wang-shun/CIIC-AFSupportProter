//上海社保
import CompanySocialSecurityManage from "./modules/social_security/company_social_security_manage/event_types";
import CompanyTaskList from "./modules/social_security/company_task_list/event_types";
import EmployeeOperator from "./modules/social_security/employee_operator/event_types";
import EmployeeSpecialOperator from "./modules/social_security/employee_special_operator/event_types";
import ShSocialSecurity from "./modules/social_security/sh_social_security/event_types";
import SocialSecurityPay from "./modules/social_security/social_security_pay/event_types";


//上海公积金
import EmployeeFundSearch from "./modules/fund/employee_fund_search/event_types"
import EmployeeCommonOperator from "./modules/fund/employee_common_operator/event_types"

//弹性福利
import gift from "./modules/flexible_benefit/gift/event_types"
import market from "./modules/flexible_benefit/market/event_types"

//健康医疗
import transfer from './modules/health_medical/relationship_transfer/event_types';

//社保对账

import SocialSecurityReconcilate from "./modules/social_security/social_security_recon_cilate/event_types";

//社保报表
import Socialsecurityreport from './modules/social_security/social_security_report/event_types'


export default {
  LEFTNAVIGATION_SETLIST: "LEFTNAVIGATION_SETLIST",
  LEFTNAVIGATION_GETLIST: "LEFTNAVIGATION_GETLIST",

  ...CompanySocialSecurityManage,
  ...CompanyTaskList,
  ...EmployeeOperator,
  ...EmployeeSpecialOperator,
  ...ShSocialSecurity,
  ...SocialSecurityPay,

  ...EmployeeFundSearch,
  ...EmployeeCommonOperator,
  //弹性福利
  ...gift,
  ...market,

  //健康医疗
  ...transfer,

  ...SocialSecurityReconcilate,
  ...Socialsecurityreport,
};
