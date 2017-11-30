//上海社保
import CompanySocialSecurityManage from "./modules/social_security/company_social_security_manage/event_types";
import CompanyTaskList from "./modules/social_security/company_task_list/event_types";
import EmployeeOperator from "./modules/social_security/employee_operator/event_types";
import EmployeeSpecialOperator from "./modules/social_security/employee_special_operator/event_types";
import ShSocialSecurity from "./modules/social_security/sh_social_security/event_types";
import SocialSecurityPay from "./modules/social_security/SocialSecurityPay/EventTypes";

//上海公积金
import EmployeeFundSearch from "./modules/Fund/EmployeeFundSearch/EventTypes"
import EmployeeCommonOperator from "./modules/Fund/EmployeeCommonOperator/EventTypes"

//弹性福利
import gift from "./modules/flexible_benefit/gift/event_types"
import market from "./modules/flexible_benefit/market/event_types"

//社保对账
import SocialSecurityReconcilate from "./modules/social_security/socialsecurityreconcilate/EventTypes";

//社保报表
import Socialsecurityreport from './modules/social_security/socialsecurityreport/EventTypes'
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

  ...gift,
  ...market,
  ...SocialSecurityReconcilate,
  ...Socialsecurityreport,
};
