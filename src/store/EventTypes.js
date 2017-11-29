//上海社保
import CompanySocialSecurityManage from "./modules/SocialSecurity/CompanySocialSecurityManage/EventTypes";
import CompanyTaskList from "./modules/SocialSecurity/CompanyTaskList/EventTypes";
import EmployeeOperator from "./modules/SocialSecurity/EmployeeOperator/EventTypes";
import EmployeeSpecialOperator from "./modules/SocialSecurity/EmployeeSpecialOperator/EventTypes";
import ShSocialSecurity from "./modules/SocialSecurity/ShSocialSecurity/EventTypes";
import SocialSecurityPay from "./modules/SocialSecurity/SocialSecurityPay/EventTypes";

//上海公积金
import EmployeeFundSearch from "./modules/Fund/EmployeeFundSearch/EventTypes"
import EmployeeCommonOperator from "./modules/Fund/EmployeeCommonOperator/EventTypes"

//弹性福利
import gift from "./modules/ElasticWelfare/gift/EventTypes"
import market from "./modules/ElasticWelfare/market/EventTypes"

//社保对账
import SocialSecurityReconcilate from "./modules/SocialSecurity/socialsecurityreconcilate/EventTypes";

//社保报表
import Socialsecurityreport from './modules/SocialSecurity/socialsecurityreport/EventTypes'
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
