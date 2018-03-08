import Vue from 'vue'
import Router from 'vue-router'
import SsRouter from './ss_router'
import EmployManageRouter from './employ_manage_router'
import {CrossStorageClient} from 'cross-storage'
import userInfoApi from '../store/modules/health_medical/data_sources/supplementary_medica.js'


const main = r => require.ensure([], () => r(require('@/components/main')), 'main') //首页
const login = r => require.ensure([], () => r(require('@/components/login')), 'login') //登录
const charts = r => require.ensure([], () => r(require('@/components/charts')), 'charts') //报表
const demo = r => require.ensure([], () => r(require('@/components/demo')), 'demo') // 演示
const welcome = r => require.ensure([], () => r(require('@/components/Welcome')), 'Welcome') // 欢迎页

const approvalStep2 = r => require.ensure([], () => r(require('@/components/common_control/ApprovalStep2')), 'approvalStep2') //审核步骤2

/* ================== 本地公积金 ================== */
/*
 * employeeFundSearch             --- 雇员公积金查询
   employeeFundHistory            --- 雇员公积金批量导入历史
   employeeFundBasicInfo          --- 雇员公积金详情
   employeeFundHistoryDetail      --- 雇员公积金历史任务单详情
 * employeeFundCommonOperator     --- 雇员日常操作
 * employeeFundSpecialOperator    --- 雇员特殊操作
   employeeFundSpecialProgressTwo --- 雇员特殊操作 步骤2
 * companyFundTaskList            --- 企业任务单
 * companyFundAccountSearch       --- 企业公积金账户查询
 * fundReconciliation             --- 公积金对账
 * fundPay                        --- 公积金汇缴支付
 * fundReport                     --- 公积金报表
 * fundYearAdjust                 --- 公积金年调
 */

const employeeFundSearch = r => require.ensure([], () => r(require('@/components/fund/employee_fund_search/EmployeeFundSearch')), 'EmployeeFundSearch')
const employeeFundHistory = r => require.ensure([], () => r(require('@/components/fund/employee_fund_search/EmployeeFundHistory')), 'EmployeeFundHistory')
const employeeFundBasicInfo = r => require.ensure([], () => r(require('@/components/fund/employee_fund_search/EmployeeFundBasicInfo')), 'EmployeeFundBasicInfo')
const employeeFundHistoryDetail = r => require.ensure([], () => r(require('@/components/fund/employee_fund_search/EmployeeFundHistoryDetail')), 'EmployeeFundHistoryDetail')

const employeeFundCommonOperator = r => require.ensure([], () => r(require('@/components/fund/employee_common_operator/EmployeeFundCommonOperator')), 'employeeFundCommonOperator')
const employeeFundCommonOperatorInTaskHandle = r => require.ensure([], () => r(require('@/components/fund/employee_common_operator/handle/InTaskHandle')), 'employeeFundCommonOperatorInTaskHandle')
const employeeFundCommonOperatorOutTaskHandle = r => require.ensure([], () => r(require('@/components/fund/employee_common_operator/handle/OutTaskHandle')), 'employeeFundCommonOperatorOutTaskHandle')
const employeeFundCommonOperatorRepairTaskHandle = r => require.ensure([], () => r(require('@/components/fund/employee_common_operator/handle/RepairTaskHandle')), 'employeeFundCommonOperatorRepairTaskHandle')

const employeeFundSpecialOperator = r => require.ensure([], () => r(require('@/components/fund/employee_special_operator/EmployeeFundSpecialOperator')), 'EmployeeFundSpecialOperator')
const employeeFundSpecialProgressTwo = r => require.ensure([], () => r(require('@/components/fund/employee_special_operator/EmployeeFundSpecialProgressTwo')), 'EmployeeFundSpecialProgressTwo')
const employeeFundSpecialProgressThree = r => require.ensure([], () => r(require('@/components/fund/employee_special_operator/EmployeeFundSpecialProgressThree')), 'EmployeeFundSpecialProgressThree')
const employeeFundTransferOperator = r => require.ensure([], () => r(require('@/components/fund/employee_transfer_operator/EmployeeFundTransferOperator')), 'EmployeeFundTransferOperator')
const employeeFundTransferProgressTwo = r => require.ensure([], () => r(require('@/components/fund/employee_transfer_operator/EmployeeFundTransferProgressTwo')), 'EmployeeFundTransferProgressTwo')
const companyFundTaskList = r => require.ensure([], () => r(require('@/components/fund/company_fund_task_list/CompanyFundTaskList')), 'CompanyFundTaskList')
const companyFundTaskCommit = r => require.ensure([], () => r(require('@/components/fund/company_fund_task_list/companyFundTaskCommit')), 'companyFundTaskCommit')
const companyFundTaskProgressChangeInfo = r => require.ensure([], () => r(require('@/components/fund/company_fund_task_list/companyFundTaskProgressChangeInfo')), 'companyFundTaskProgressChangeInfo')
const companyFundTaskProgressEndInfo = r => require.ensure([], () => r(require('@/components/fund/company_fund_task_list/companyFundTaskProgressEndInfo')), 'companyFundTaskProgressEndInfo')
const companyFundTaskInfo = r => require.ensure([], () => r(require('@/components/fund/company_fund_task_list/companyFundTaskInfo')), 'companyFundTaskInfo')


const companyFundAccountSearch = r => require.ensure([], () => r(require('@/components/fund/company_fund_account_search/CompanyFundAccountSearch')), 'CompanyFundAccountSearch')
const companyFundAccountProgressTwo = r => require.ensure([], () => r(require('@/components/fund/company_fund_account_search/CompanyFundAccountProgressTwo')), 'CompanyFundAccountProgressTwo')
const fundReconciliation = r => require.ensure([], () => r(require('@/components/fund/fund_reconciliation/FundReconciliation')), 'FundReconciliation')
const fundPay = r => require.ensure([], () => r(require('@/components/fund/fund_pay/FundPay')), 'FundPay')
const makePayList = r => require.ensure([], () => r(require('@/components/fund/fund_pay/MakePayList')), 'MakePayList')
const fundReport = r => require.ensure([], () => r(require('@/components/fund/fund_report/FundReport')), 'FundReport')
const fundYearAdjust = r => require.ensure([], () => r(require('@/components/fund/fund_year_adjust/FundYearAdjust')), 'FundYearAdjust')
const fundYearAdjustMaintain = r => require.ensure([], () => r(require('@/components/fund/fund_year_adjust/FundYearAdjustMaintain')), 'FundYearAdjustMaintain')
const fundYearAdjustStatus = r => require.ensure([], () => r(require('@/components/fund/fund_year_adjust/FundYearAdjustStatus')), 'FundYearAdjustStatus')
const fundYearAdjustViewDifference = r => require.ensure([], () => r(require('@/components/fund/fund_year_adjust/FundYearAdjustViewDifference')), 'FundYearAdjustViewDifference')


//任务单管理
const PendingTaskList = r => require.ensure([], () => r(require('@/components/health_medical/medical_task_management/PendingTaskList')), 'PendingTaskList') //待处理任务单列表
const ProcessedTaskList = r => require.ensure([], () => r(require('@/components/health_medical/medical_task_management/ProcessedTaskList')), 'ProcessedTaskList') //已处理任务单列表

//补充医疗理赔
const supplementaryMedicalList = r => require.ensure([], () => r(require('@/components/health_medical/medical_supplementary/SupplementaryMedicalList')), 'supplementaryMedicalList') //充医疗理赔
const InvoiceList = r => require.ensure([], () => r(require('@/components/health_medical/medical_supplementary/InvoiceList')), 'InvoiceList') //发票列表

//未投保医疗
const acceptanceList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AcceptanceList')), 'acceptanceList') //受理单列表
const checkMedicalList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/CheckMedicalList')), 'checkMedicalList') //新增未投保列表
const addAcceptanceEmployeeList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AddAcceptanceEmployeeList')), 'addAcceptanceEmployeeList') //理赔人员列表
const addAcceptance = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AddAcceptance')), 'addAcceptance') //新增受理单

const auditNurseryFee = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AuditNurseryFee')), 'auditNurseryFee') //医疗关系转移
//在保管理
const insuredList = r => require.ensure([], () => r(require('@/components/health_medical/medical_task_management/InsuredList')), 'insuredList') //在保管理
//保单管理
const AddPayRate = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/AddPayRate')), 'AddPayRate') //新增付费比例

/**
 * 证件管理
 * EmpList 雇员列表
 * EmpAdd 新增单项雇员
 * EmpCredentialsTask 雇员证件办理管理
 * CompanyList 客户数据维护列表
 * CompanyEdit 客户数据维护
 * OrgPolicyList 办理机构政策维护列表
 */
const EmpList = r => require.ensure([], () => r(require('@/components/credentials_management/emp_credentials_deal/EmpList')), 'empList')
const EmpAdd = r => require.ensure([], () => r(require('@/components/credentials_management/emp_credentials_deal/EmpAdd')), 'empAdd')
const EmpCredentialsTask = r => require.ensure([], () => r(require('@/components/credentials_management/emp_credentials_deal/EmpCredentialsTask')), 'empCredentialsTask')
const CompanyList = r => require.ensure([], () => r(require('@/components/credentials_management/company_maintenance/CompanyList')), 'companyList')
const CompanyEdit = r => require.ensure([], () => r(require('@/components/credentials_management/company_maintenance/CompanyEdit')), 'companyEdit')
const OrgPolicyList = r => require.ensure([], () => r(require('@/components/credentials_management/org_policy_maintenance/OrgPolicyList')), 'orgPolicyList')

/**
 * 健康医疗
 * relationshipTransfer     --医疗关系转移
 * collectionPayment        --代收代付
 */
const relationshipTransfer = r => require.ensure([], () => r(require('@/components/health_medical/relationship_transfer/RelationshipTransfer')), 'relationshipTransfer'); //医疗关系转移
const addMedicalRelationship = r => require.ensure([], () => r(require('@/components/health_medical/relationship_transfer/AddMedicalRelationship')), 'addMedicalRelationship'); //新增医疗关系转移
const updateMedicalRelationship = r => require.ensure([], () => r(require('@/components/health_medical/relationship_transfer/UpdateMedicalRelationship')), 'updateMedicalRelationship'); //更新医疗关系转移
const addReimbursement = r => require.ensure([], () => r(require('@/components/health_medical/relationship_transfer/AddReimbursement')), 'addReimbursement'); //新增零星报销
const updateReimbursement = r => require.ensure([], () => r(require('@/components/health_medical/relationship_transfer/UpdateReimbursement')), 'updateReimbursement'); //更新零星报销
//代收代付
const collectionPayment = r => require.ensure([], () => r(require('@/components/health_medical/collection_payment/CollectionPayment')), 'collectionPayment'); //代收代付
const addCollectionPayment = r => require.ensure([], () => r(require('@/components/health_medical/collection_payment/AddCollectionPayment')), 'addCollectionPayment'); //代收代付
//保单号管理
const policyNumManagement = r => require.ensure([], () => r(require('@/components/health_medical/policy_management/PolicyNumManagement')), 'policyNumManagement'); //保单号管理
const addPolicyNum = r => require.ensure([], () => r(require('@/components/health_medical/policy_management/AddPolicyNum')), 'addPolicyNum'); //新增保单号
//未投保审核
const uninsuredReview = r => require.ensure([], () => r(require('@/components/health_medical/uninsured/UninsuredReview')), 'uninsuredReview'); //新增保单号
const uninsuredReviewDeal = r => require.ensure([], () => r(require('@/components/health_medical/uninsured/UninsuredReviewDeal')), 'uninsuredReviewDeal'); //新增保单号
const LookAcceptanceUninsured = r => require.ensure([], () => r(require('@/components/health_medical/uninsured/LookAcceptanceUninsured')), 'LookAcceptanceUninsured'); //新增保单号
//保单管理
const policyManagement = r => require.ensure([], () => r(require('@/components/health_medical/policy_management/PolicyManagement')), 'policyManagement'); //保单管理
const addPolicy = r => require.ensure([], () => r(require('@/components/health_medical/policy_management/AddPolicy')), 'addPolicy'); //新增保单缴费
const addPolicyConfirm = r => require.ensure([], () => r(require('@/components/health_medical/policy_management/AddPolicyConfirm')), 'addPolicyConfirm'); //新增保单费用确认

/*
 * giftApplicationManager              --弹性福利
 * marketActivitiesManager
 * grantManager
 * reportFormManager
 */
const giftApplicationManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftApplicationManager')), 'giftApplicationManager'); //礼品管理
const giftAdd = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftAdd')), 'GiftAdd'); //新增礼品单
const giftUpdate = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftUpdate')), 'GiftUpdate'); //编辑礼品

const marketActivitiesManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/MarketActivitiesManager')), 'marketActivitiesManager'); //市场活动管理
const addActivity = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/AddActivity')), 'AddActivity'); //新增活动
const updateActivity = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/UpdateActivity')), 'UpdateActivity'); //更新活动

const grantManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/GrantManager')), 'GrantManager'); //发放管理
const giftGrant = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/GiftGrant')), 'GiftGrant'); //礼品发放
const marketGrant = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/MarketGrant')), 'MarketGrant'); //活动发放

const reportFormManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/report_form/ReportFormManager')), 'ReportFormManager'); //报表查询


Vue.use(Router)
let router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: main,
      children: [
        {
          path: '',
          name: '/main',
          component: welcome
        }
      ]
    },
    {
      path: '/main',
      component: main,
      children: [
        ...SsRouter,
        {
          path: '/employee_fund_search',
          name: 'employeeFundSearch',
          component: employeeFundSearch,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员公积金查询",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_history',
          name: 'employeeFundHistory',
          component: employeeFundHistory,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "查看导入历史",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_basic_info',
          name: 'employeeFundBasicInfo',
          component: employeeFundBasicInfo,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员公积金详情",
            openNames: ['1'],
            activeName: '2-1'
          }
        },
        {
          path: '/employee_fund_history_detail',
          name: 'employeeFundHistoryDetail',
          component: employeeFundHistoryDetail,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员公积金历史任务单详情",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_common_operator',
          name: 'employeeFundCommonOperator',
          component: employeeFundCommonOperator,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员日常操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_common_operator_in_task_handle',
          name: 'employeeFundCommonOperatorInTaskHandle',
          component: employeeFundCommonOperatorInTaskHandle,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员公积金日常操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_common_operator_out_task_handle',
          name: 'employeeFundCommonOperatorOutTaskHandle',
          component: employeeFundCommonOperatorOutTaskHandle,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员公积金日常操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_common_operator_repair_task_handle',
          name: 'employeeFundCommonOperatorRepairTaskHandle',
          component: employeeFundCommonOperatorRepairTaskHandle,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员公积金日常操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_special_operator',
          name: 'employeeFundSpecialOperator',
          component: employeeFundSpecialOperator,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员特殊操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_special_progress_two',
          name: 'employeeFundSpecialProgressTwo',
          component: employeeFundSpecialProgressTwo,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "雇员特殊操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_special_progress_three',
          name: 'employeeFundSpecialProgressThree',
          component: employeeFundSpecialProgressThree,
          meta: {
            level1: '首页',
            level2: '上海公积金',
            level3: '雇员特殊操作',
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_transfer_operator',
          name: 'employeeFundTransferOperator',
          component: employeeFundTransferOperator,
          meta: {
            level1: '首页',
            level2: '上海公积金',
            level3: '雇员转移操作',
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_transfer_progress_two',
          name: 'employeeFundTransferProgressTwo',
          component: employeeFundTransferProgressTwo,
          meta: {
            level1: '首页',
            level2: '上海公积金',
            level3: '雇员转移操作',
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_task_list',
          name: 'companyFundTaskList',
          component: companyFundTaskList,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业任务单",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_task_commit',
          name: 'companyFundTaskCommit',
          component: companyFundTaskCommit,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业任务单",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_task_progress_change_info',
          name: 'companyFundTaskProgressChangeInfo',
          component: companyFundTaskProgressChangeInfo,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业任务单",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_task_progress_end_info',
          name: 'companyFundTaskProgressEndInfo',
          component: companyFundTaskProgressEndInfo,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业任务单",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_task_info',
          name: 'companyFundTaskInfo',
          component: companyFundTaskInfo,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业任务单",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_account_search',
          name: 'companyFundAccountSearch',
          component: companyFundAccountSearch,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业公积金账户查询",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_account_progress_two',
          name: 'companyFundAccountProgressTwo',
          component: companyFundAccountProgressTwo,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "企业公积金账户查询",
            openNames: ['1']
          }
        },
        {
          path: '/fund_reconciliation',
          name: 'fundReconciliation',
          component: fundReconciliation,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "公积金对账",
            openNames: ['1']
          }
        },
        {
          path: '/fund_pay',
          name: 'fundPay',
          component: fundPay,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "公积金汇缴支付",
            openNames: ['1']
          }
        },
        {
          path: '/make_pay_list',
          name: 'makePayList',
          component: makePayList,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "公积金汇缴支付",
            openNames: ['1']
          }
        },
        {
          path: '/fund_report',
          name: 'fundReport',
          component: fundReport,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "公积金报表",
            openNames: ['1']
          }
        },
        {
          path: '/fund_year_adjust',
          name: 'fundYearAdjust',
          component: fundYearAdjust,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "公积金年调",
            openNames: ['1']
          }
        },
        {
          path: '/fund_year_adjust_maintain',
          name: 'fundYearAdjustMaintain',
          component: fundYearAdjustMaintain,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "公积金年调",
            openNames: ['1'],
            activeName: '2-10'
          }
        },
        {
          path: '/fund_year_adjust_status',
          name: 'fundYearAdjustStatus',
          component: fundYearAdjustStatus,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "数据收集状态",
            openNames: ['1'],
            activeName: '2-10'
          }
        },
        {
          path: '/fund_year_adjust_view_difference',
          name: 'fundYearAdjustViewDifference',
          component: fundYearAdjustViewDifference,
          meta: {
            level1: '首页',
            level2: "上海公积金",
            level3: "查看差异对比",
            openNames: ['1'],
            activeName: '2-10'
          }
        },


        ...EmployManageRouter,
        {
          path: '/addAcceptanceEmployeeList',
          name: 'addAcceptanceEmployeeList',
          component: addAcceptanceEmployeeList,
          meta: {
            level1: '首页',
            level2: "未投保医疗",
            level3: "新增受理单",
            openNames: ['2']
          }
        },
        {
          path: '/PendingTaskList',
          name: 'PendingTaskList',
          component: PendingTaskList,
          meta: {
            level1: '首页',
            level2: "任务单管理",
            level3: "待处理任务单列表",
            openNames: ['2']
          }
        },
        {
          path: '/ProcessedTaskList',
          name: 'ProcessedTaskList',
          component: ProcessedTaskList,
          meta: {
            level1: '首页',
            level2: "任务单管理",
            level3: "已处理任务单列表",
            openNames: ['2']
          }
        },
        {
          path: '/addAcceptance',
          name: 'addAcceptance',
          component: addAcceptance,
          meta: {
            level1: '首页',
            level2: "未投保医疗",
            level3: "新增受理单",
            openNames: ['2']
          }
        },

        {
          path: '/InvoiceList',
          name: 'InvoiceList',
          component: InvoiceList,
          meta: {
            level1: '首页',
            level2: "未投保医疗",
            level3: "发票列表",
            openNames: ['2']
          }
        },
        {
          path: '/relationshipTransfer',
          name: 'relationshipTransfer',
          component: relationshipTransfer,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "医疗关系转移",
            openNames: ['2']
          }
        },
        {
          path: '/uninsuredReviewDeal',
          name: 'uninsuredReviewDeal',
          component: uninsuredReviewDeal,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "未投保审核处理",
            openNames: ['2']
          }
        },
        {
          path: '/LookAcceptanceUninsured',
          name: 'LookAcceptanceUninsured',
          component: LookAcceptanceUninsured,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "查看受理单-投保审核信息",
            openNames: ['2']
          }
        },
        {
          path: '/addReimbursement',
          name: 'addReimbursement',
          component: addReimbursement,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "新增零星报销",
            openNames: ['2']
          }
        },
        {
          path: '/updateReimbursement',
          name: 'updateReimbursement',
          component: updateReimbursement,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "修改零星报销",
            openNames: ['2']
          }
        },
        {
          path: '/addMedicalRelationship',
          name: 'addMedicalRelationship',
          component: addMedicalRelationship,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "新增医疗关系转移",
            openNames: ['2']
          }
        },
        {
          path: '/updateMedicalRelationship',
          name: 'updateMedicalRelationship',
          component: updateMedicalRelationship,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "修改医疗关系转移",
            openNames: ['2']
          }
        },
        {
          path: '/auditNurseryFee',
          name: 'auditNurseryFee',
          component: auditNurseryFee,
          meta: {
            level1: '首页',
            level2: "未投保医疗",
            level3: "托费报销受理",
            openNames: ['2']
          }
        },
        {
          path: '/policyManagement',
          name: 'policyManagement',
          component: policyManagement,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "保单管理",
            openNames: ['2']
          }
        },
        {
          path: '/addPolicy',
          name: 'addPolicy',
          component: addPolicy,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "新增保单缴费",
            openNames: ['2']
          }
        },
        {
          path: '/addPolicyConfirm',
          name: 'addPolicyConfirm',
          component: addPolicyConfirm,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "保单费用确认",
            openNames: ['2']
          }
        },
        {
          path: '/policyNumManagement',
          name: 'policyNumManagement',
          component: policyNumManagement,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "保单号管理",
            openNames: ['2']
          }
        },
        {
          path: '/addPolicyNum',
          name: 'addPolicyNum',
          component: addPolicyNum,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增保单号",
            openNames: ['2']
          }
        },
        {
          path: '/AddPayRate',
          name: 'AddPayRate',
          component: AddPayRate,
          meta: {
            level1: '首页',
            level2: "保单管理",
            level3: "新增付费比例",
            openNames: ['2']
          }
        },
        {
          path: '/collectionPayment',
          name: 'collectionPayment',
          component: collectionPayment,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "代收代付",
            openNames: ['2']
          }
        },
        {
          path: '/addCollectionPayment',
          name: 'addCollectionPayment',
          component: addCollectionPayment,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "新增代收代付",
            openNames: ['2']
          }
        },
        {
          path: '/supplementaryMedicalList',
          name: 'supplementaryMedicalList',
          component: supplementaryMedicalList,
          meta: {
            level1: '首页',
            level2: "补充医疗理赔",
            level3: "补充医疗理赔",
            openNames: ['2']
          }
        },
        {
          path: '/uninsuredReview',
          name: 'uninsuredReview',
          component: uninsuredReview,
          meta: {
            level1: '首页',
            level2: "健康医疗",
            level3: "未投保审核",
            openNames: ['2']
          }
        },
        {
          path: '/acceptanceList',
          name: 'acceptanceList',
          component: acceptanceList,
          meta: {
            level1: '首页',
            level2: "未投保医疗",
            level3: "受理单列表",
            openNames: ['2']
          }
        },
        {
          path: '/checkMedicalList',
          name: 'checkMedicalList',
          component: checkMedicalList,
          meta: {
            level1: '首页',
            level2: "未投保医疗",
            level3: "新增未投保列表",
            openNames: ['2']
          }
        },
        {
          path: '/insuredList',
          name: 'insuredList',
          component: insuredList,
          meta: {
            level1: '首页',
            level2: "在保管理",
            level3: "在保管理",
            openNames: ['2']
          }
        },
        //弹性福利
        {
          path: '/giftApplicationManager',
          name: 'giftApplicationManager',
          component: giftApplicationManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "礼品管理",
            openNames: ['2']
          }
        },
        {
          path: '/giftAdd',
          name: 'giftAdd',
          component: giftAdd,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增礼品",
            openNames: ['2']
          }
        },
        {
          path: '/giftUpdate',
          name: 'giftUpdate',
          component: giftUpdate,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "修改礼品",
            openNames: ['2']
          }
        },
        {
          path: '/marketActivitiesManager',
          name: 'marketActivitiesManager',
          component: marketActivitiesManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "市场活动管理",
            openNames: ['2']
          }
        },
        {
          path: '/addActivity',
          name: 'addActivity',
          component: addActivity,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增市场活动",
            openNames: ['2']
          }
        },
        {
          path: '/updateActivity',
          name: 'updateActivity',
          component: updateActivity,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增市场活动",
            openNames: ['2']
          }
        },
        {
          path: '/grantManager',
          name: 'grantManager',
          component: grantManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "发放管理",
            openNames: ['2']
          }
        },
        {
          path: '/giftGrant',
          name: 'giftGrant',
          component: giftGrant,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "礼品发放",
            openNames: ['2']
          }
        },
        {
          path: '/marketGrant',
          name: 'marketGrant',
          component: marketGrant,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "活动发放",
            openNames: ['2']
          }
        },
        {
          path: '/reportFormManager',
          name: 'reportFormManager',
          component: reportFormManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "报表查询",
            openNames: ['2']
          }
        },
        /**
         * 证件管理
         */
        {
          path: '/emp_credentials_deal/emp_list',
          name: 'empList',
          component: EmpList,
          meta: {
            level1: '首页',
            level2: '证件管理',
            level3: '雇员证件办理',
            openNames: ['4']
          }
        },
        {
          path: '/emp_credentials_deal/emp_add',
          name: 'empAdd',
          component: EmpAdd,
          meta: {
            level1: '首页',
            level2: '证件管理',
            level3: '新增雇员',
            openNames: ['4']
          }
        },
        {
          path: '/emp_credentials_deal/emp_credentials_task',
          name: 'empCredentialsTask',
          component: EmpCredentialsTask,
          meta: {
            level1: '首页',
            level2: '证件管理',
            level3: '雇员证件管理',
            openNames: ['4']
          }
        },
        {
          path: '/company_maintenance/company_list',
          name: 'companyList',
          component: CompanyList,
          meta: {
            level1: '首页',
            level2: '证件管理',
            level3: '客户数据维护',
            openNames: ['4']
          }
        },
        {
          path: '/company_maintenance/company_edit',
          name: 'companyEdit',
          component: CompanyEdit,
          meta: {
            level1: '首页',
            level2: '证件管理',
            level3: '客户数据编辑',
            openNames: ['4']
          }
        },
        {
          path: '/org_policy_maintenance/org_policy_list',
          name: 'orgPolicyList',
          component: OrgPolicyList,
          meta: {
            level1: '首页',
            level2: '证件管理',
            level3: '办理机构政策维护',
            openNames: ['4']
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log(router.app.$local);
  window.document.title = "社保中心";
  localStorage.setItem('level1', to.meta.level1);
  localStorage.setItem('level2', to.meta.level2);
  localStorage.setItem('level3', to.meta.level3);
  localStorage.setItem('level4', to.meta.level4);
  localStorage.setItem("openNames", [to.meta.openNames]);

  /*let storage = new CrossStorageClient(`{变量}:8070/#/menu`);  //此处{}中变量替换为相应环境的大首页地址
  storage.onConnect().then(function () {
    return storage.get('token')
  }).then(function (res) {
    // token字符串
    let userInfo = res;
    if (userInfo) {
      localStorage.setItem('userInfo', userInfoData);
    } else {
      console.log('跨域token为空')
    }
  }).catch(function (err) {
    console.log(err)
  });*/

  next();
});
router.afterEach((to, from) => {
});

async function validToken(token) {
  console.log('in token = ' + JSON.stringify(token));
  const res = await userInfoApi.queryUserInfo(token || -1);
  let userInfoData = res.data.object;
  if (userInfoData && userInfoData.token) {
    localStorage.setItem('userInfo', userInfoData);
    next();
  } else {
    console.log('跨域token校验失败');
  }
}

export default router;
