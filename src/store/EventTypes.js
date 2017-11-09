import CompanySocialSecurityManage from "./modules/CompanySocialSecurityManage/EventTypes";
import CompanyTaskList from "./modules/CompanyTaskList/EventTypes";
import EmployeeOperator from "./modules/EmployeeOperator/EventTypes";
import EmployeeSpecialOperator from "./modules/EmployeeSpecialOperator/EventTypes";
import ShSocialSecurity from "./modules/ShSocialSecurity/EventTypes";
import SocialSecurityPay from "./modules/SocialSecurityPay/EventTypes";

export default {
  LEFTNAVIGATION_SETLIST: "LEFTNAVIGATION_SETLIST",
  LEFTNAVIGATION_GETLIST: "LEFTNAVIGATION_GETLIST",

  ...CompanySocialSecurityManage,
  ...CompanyTaskList,
  ...EmployeeOperator,
  ...EmployeeSpecialOperator,
  ...ShSocialSecurity,
  ...SocialSecurityPay,
};
