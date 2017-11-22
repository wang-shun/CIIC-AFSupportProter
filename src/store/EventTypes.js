import CompanySocialSecurityManage from "./modules/SocialSecurity/CompanySocialSecurityManage/EventTypes";
import CompanyTaskList from "./modules/SocialSecurity/CompanyTaskList/EventTypes";
import EmployeeOperator from "./modules/SocialSecurity/EmployeeOperator/EventTypes";
import EmployeeSpecialOperator from "./modules/SocialSecurity/EmployeeSpecialOperator/EventTypes";
import ShSocialSecurity from "./modules/SocialSecurity/ShSocialSecurity/EventTypes";
import SocialSecurityPay from "./modules/SocialSecurity/SocialSecurityPay/EventTypes";

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
