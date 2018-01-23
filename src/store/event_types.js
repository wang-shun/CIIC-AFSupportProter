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
import EmployeeFundSpecialOperator from "./modules/fund/employee_special_operator/event_types"
import EmployeeFundTransferOperator from "./modules/fund/employee_transfer_operator/event_types"
import CompanyFundTaskList from "./modules/fund/company_fund_task_list/event_types"
import CompanyFundAccountSearch from "./modules/fund/company_fund_account_search/event_types"
import FundReconciliation from "./modules/fund/fund_reconciliation/event_types"
import FundPay from "./modules/fund/fund_pay/event_types"
import FundReport from "./modules/fund/fund_report/event_types"
import FundYearAdjust from "./modules/fund/fund_year_adjust/event_types"
import FundYearAdjustViewDifference from "./modules/fund/fund_year_adjust/event_types"

//弹性福利
import gift from "./modules/flexible_benefit/gift/event_types"
import market from "./modules/flexible_benefit/market/event_types"

//健康医疗
import transfer from './modules/health_medical/relationship_transfer/event_types';

//社保对账

import SocialSecurityReconcilate from "./modules/social_security/social_security_recon_cilate/event_types";

//社保报表
import Socialsecurityreport from './modules/social_security/social_security_report/event_types'


//证件管理
import CompanyDataMaintenance from './modules/credentials_management/company_data_maintenance/event_types'
import EmpCredebtialsManagement from './modules/credentials_management/emp_credentials_deal/event_types'
import OrgPolicyMaintenance from './modules/credentials_management/org_policy_maintenance/event_types'

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
  ...EmployeeFundSpecialOperator,
  ...EmployeeFundTransferOperator,
  ...CompanyFundTaskList,
  ...CompanyFundAccountSearch,
  ...FundReconciliation,
  ...FundPay,
  ...FundReport,
  ...FundYearAdjust,
  ...FundYearAdjustViewDifference,

  //弹性福利
  ...gift,
  ...market,

  //健康医疗
  ...transfer,

  ...SocialSecurityReconcilate,
  ...Socialsecurityreport,

  //证件管理
  ...CompanyDataMaintenance,
  ...EmpCredebtialsManagement,
  ...OrgPolicyMaintenance,
};
