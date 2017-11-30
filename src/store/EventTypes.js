//上海社保
<<<<<<< HEAD
import CompanySocialSecurityManage from "./modules/SocialSecurity/CompanySocialSecurityManage/EventTypes";
import CompanyTaskList from "./modules/SocialSecurity/CompanyTaskList/EventTypes";
import EmployeeOperator from "./modules/SocialSecurity/EmployeeOperator/EventTypes";
import EmployeeSpecialOperator from "./modules/SocialSecurity/EmployeeSpecialOperator/EventTypes";
import ShSocialSecurity from "./modules/SocialSecurity/ShSocialSecurity/EventTypes";
import SocialSecurityPay from "./modules/SocialSecurity/social_security_pay/event_types";
=======
import CompanySocialSecurityManage from "./modules/social_security/company_social_security_manage/event_types";
import CompanyTaskList from "./modules/social_security/company_task_list/event_types";
import EmployeeOperator from "./modules/social_security/employee_operator/event_types";
import EmployeeSpecialOperator from "./modules/social_security/employee_special_operator/event_types";
import ShSocialSecurity from "./modules/social_security/sh_social_security/event_types";
import SocialSecurityPay from "./modules/social_security/SocialSecurityPay/EventTypes";
>>>>>>> 909fefb55a359a06600f5642f1cdb5252b21c414

//上海公积金
import EmployeeFundSearch from "./modules/Fund/EmployeeFundSearch/EventTypes"
import EmployeeCommonOperator from "./modules/Fund/EmployeeCommonOperator/EventTypes"

//弹性福利
import gift from "./modules/flexible_benefit/gift/event_types"
import market from "./modules/flexible_benefit/market/event_types"

//社保对账
<<<<<<< HEAD
import SocialSecurityReconcilate from "./modules/SocialSecurity/social_security_recon_cilate/event_types";

//社保报表
import Socialsecurityreport from './modules/SocialSecurity/social_security_report/event_types'
=======
import SocialSecurityReconcilate from "./modules/social_security/socialsecurityreconcilate/EventTypes";

//社保报表
import Socialsecurityreport from './modules/social_security/socialsecurityreport/EventTypes'
>>>>>>> 909fefb55a359a06600f5642f1cdb5252b21c414
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
