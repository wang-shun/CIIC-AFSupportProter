import Vue from 'vue'
import Router from 'vue-router'
import SsRouter from './ss_router'

const main = r => require.ensure([], () => r(require('@/components/main')), 'main') //首页
const login = r => require.ensure([], () => r(require('@/components/login')), 'login') //登录
const charts = r => require.ensure([], () => r(require('@/components/charts')), 'charts') //报表
const demo = r => require.ensure([], () => r(require('@/components/demo')), 'demo') // 演示

const approvalstep2 = r => require.ensure([], () => r(require('@/components/commoncontrol/approvalstep2')), 'approvalstep2') //审核步骤2

/* ================== 本地公积金 ================== */
/*
 * employeefundsearch          --- 雇员公积金查询
   employeefundhistory         --- 雇员公积金批量导入历史
   employeefundbasicinfo       --- 雇员公积金详情
   employeefundhistorydetail   --- 雇员公积金历史任务单详情
 * employeefundcommonoperator  --- 雇员日常操作
 * employeefundspecialoperator --- 雇员特殊操作
 * companyfundtasklist         --- 企业任务单
 * companyfundaccountsearch    --- 企业公积金账户查询
 * fundreconciliation          --- 公积金对账
 * fundpay                     --- 公积金汇缴支付
 * fundreport                  --- 公积金报表
 * fundyearadjust              --- 公积金年调
 */

const employeefundsearch = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/employeefundsearch')), 'employeefundsearch')
const employeefundhistory = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/employeefundhistory')), 'employeefundhistory')
const employeefundbasicinfo = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/employeefundbasicinfo')), 'employeefundbasicinfo')
const employeefundhistorydetail = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/employeefundhistorydetail')), 'employeefundhistorydetail')

const employeefundcommonoperator = r => require.ensure([], () => r(require('@/components/fund/employeecommonoperator/employeefundcommonoperator')), 'employeefundcommonoperator')
const employeefundspecialoperator = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/employeefundspecialoperator')), 'employeefundspecialoperator')
const companyfundtasklist = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/companyfundtasklist')), 'companyfundtasklist')
const companyfundaccountsearch = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/companyfundaccountsearch')), 'companyfundaccountsearch')
const fundreconciliation = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/fundreconciliation')), 'fundreconciliation')
const fundpay = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/fundpay')), 'fundpay')
const fundreport = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/fundreport')), 'fundreport')
const fundyearadjust = r => require.ensure([], () => r(require('@/components/fund/employeefundsearch/fundyearadjust')), 'fundyearadjust')



//任务单管理
const pendingTaskList = r => require.ensure([], () => r(require('@/components/health_medical/medical_task_management/PendingTaskList')), 'pendingTaskList') //待处理任务单列表
const processedTaskList = r => require.ensure([], () => r(require('@/components/health_medical/medical_task_management/ProcessedTaskList')), 'processedTaskList') //已处理任务单列表

//补充医疗理赔
const supplementaryMedicalList = r => require.ensure([], () => r(require('@/components/health_medical/medical_supplementary/SupplementaryMedicalList')), 'supplementaryMedicalList') //审核受理单
const supplementaryMedicalBatchList = r => require.ensure([], () => r(require('@/components/health_medical/medical_supplementary/SupplementaryMedicalBatchList')), 'supplementaryMedicalBatchList') //补充医疗理赔批量
const invoiceList = r => require.ensure([], () => r(require('@/components/health_medical/medical_supplementary/InvoiceList')), 'invoiceList') //发票列表

//未投保医疗
const acceptanceList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AcceptanceList')), 'acceptanceList') //受理单列表
const checkMedicalList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/CheckMedicalList')), 'checkMedicalList') //新增未投保列表
const acceptanceAuditList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AcceptanceAuditList')), 'acceptanceAuditList') //未投保审核列表
const addAcceptanceEmployeeList = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AddAcceptanceEmployeeList')), 'addAcceptanceEmployeeList') //理赔人员列表
const addAcceptance = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AddAcceptance')), 'addAcceptance') //新增受理单
const auditAcceptance = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AuditAcceptance')), 'auditAcceptance') //审核受理单

const medicalRelationTransform = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/MedicalRelationTransform')), 'medicalRelationTransform') //医疗关系转移
const addFragmentaryReimbursement = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AddFragmentaryReimbursement')), 'addFragmentaryReimbursement') //发票列表
const addMedicalTransform = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AddMedicalTransform')), 'addMedicalTransform') //医疗关系转移
const auditNurseryFee = r => require.ensure([], () => r(require('@/components/health_medical/medical_uninsured/AuditNurseryFee')), 'auditNurseryFee') //医疗关系转移


//在保管理
const insuredList = r => require.ensure([], () => r(require('@/components/health_medical/medical_task_management/InsuredList')), 'insuredList') //在保管理


//保单管理
const InsurancePolicyList = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/InsurancePolicyList')), 'InsurancePolicyList') //保单列表
const InsurancePolicyNumEmpList = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/InsurancePolicyNumEmpList')), 'InsurancePolicyNumEmpList') //保单人员列表
const InsurancePolicyNumCostConfirmList = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/InsurancePolicyNumCostConfirmList')), 'InsurancePolicyNumCostConfirmList') //保单费用确认
const InsurancePolicyNumList = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/InsurancePolicyNumList')), 'InsurancePolicyNumList') //保单号列表
const AddInsurancePolicyNum = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/AddInsurancePolicyNum')), 'AddInsurancePolicyNum') //新增保单号
const AddPayRate = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/AddPayRate')), 'AddPayRate') //新增付费比例
const AgentBusinessList = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/AgentBusinessList')), 'AgentBusinessList') //代收代付列表
const AddAgentBusiness = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/AddAgentBusiness')), 'AddAgentBusiness') //新增代收代付
const AgentBusinessBatchList = r => require.ensure([], () => r(require('@/components/health_medical/insurance_policy_management/AgentBusinessBatchList')), 'AgentBusinessBatchList') //新增代收代付

/*
 * giftApplicationManager              --弹性福利
 * marketActivitiesManager
 * grantManager
 * reportFormManager
 */
const giftApplicationManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftApplicationManager')), 'giftApplicationManager'); //礼品管理
const giftPersonChoose = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftPersonChoose')), 'giftPersonChoose'); //人员选择
const giftAdd = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftAdd')), 'GiftAdd'); //新增礼品单
const giftUpdate = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftUpdate')), 'GiftUpdate'); //编辑礼品
const giftApply = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftApply')), 'GiftApply'); //申请礼品
const giftConfirm = r => require.ensure([], () => r(require('@/components/flexible_benefit/gift/GiftConfirm')), 'GiftConfirm'); //礼品确认

const marketActivitiesManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/MarketActivitiesManager')), 'marketActivitiesManager'); //市场活动管理
const addActivity = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/AddActivity')), 'AddActivity'); //新增活动
const updateActivity = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/UpdateActivity')), 'UpdateActivity'); //更新活动
const applyActivity = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/ApplyActivity')), 'ApplyActivity'); //申请活动
const marketPersonChoose = r => require.ensure([], () => r(require('@/components/flexible_benefit/market_activities/MarketPersonChoose')), 'MarketPersonChoose'); //人员选择

const grantManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/GrantManager')), 'GrantManager'); //发放管理
const giftExamine = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/GiftExamine')), 'GiftExamine'); //礼品审批
const giftGrant = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/GiftGrant')), 'GiftGrant'); //礼品发放
const marketExamine = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/MarketExamine')), 'MarketExamine'); //活动审批
const marketGrant = r => require.ensure([], () => r(require('@/components/flexible_benefit/grant/MarketGrant')), 'MarketGrant'); //活动发放

const reportFormManager = r => require.ensure([], () => r(require('@/components/flexible_benefit/report_form/ReportFormManager')), 'ReportFormManager'); //报表查询



Vue.use(Router)
let router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: main

    },
    {
      path: '/demo',
      component: demo
    },
    {
      path: '/main',
      component: main,
      children: [
        ...SsRouter,
        {
          path: '/employee_fund_search',
          name: 'employeefundsearch',
          component: employeefundsearch,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员公积金查询",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_history',
          name: 'employeefundhistory',
          component: employeefundhistory,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "查看导入历史",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_basic_info',
          name: 'employeefundbasicinfo',
          component: employeefundbasicinfo,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员公积金详情",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_history_detail',
          name: 'employeefundhistorydetail',
          component: employeefundhistorydetail,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员公积金历史任务单详情",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_common_operator',
          name: 'employeefundcommonoperator',
          component: employeefundcommonoperator,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员日常操作",
            openNames: ['1']
          }
        },
        {
          path: '/employee_fund_special_operator',
          name: 'employeefundspecialoperator',
          component: employeefundspecialoperator,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "雇员特殊操作",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_task_list',
          name: 'companyfundtasklist',
          component: companyfundtasklist,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "企业任务单",
            openNames: ['1']
          }
        },
        {
          path: '/company_fund_account_search',
          name: 'companyfundaccountsearch',
          component: companyfundaccountsearch,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "企业公积金账户查询",
            openNames: ['1']
          }
        },
        {
          path: '/fund_reconciliation',
          name: 'fundreconciliation',
          component: fundreconciliation,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "公积金对账",
            openNames: ['1']
          }
        },
        {
          path: '/fund_pay',
          name: 'fundpay',
          component: fundpay,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "公积金汇缴支付",
            openNames: ['1']
          }
        },
        {
          path: '/fund_report',
          name: 'fundreport',
          component: fundreport,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "公积金报表",
            openNames: ['1']
          }
        },
        {
          path: '/fund_year_adjust',
          name: 'fundyearadjust',
          component: fundyearadjust,
          meta: {
            level1: '全国公积金',
            level2: "上海公积金",
            level3: "公积金年调",
            openNames: ['1']
          }
        },

        {
          path: '/addAcceptanceEmployeeList',
          name:'addAcceptanceEmployeeList',
          component: addAcceptanceEmployeeList,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"新增受理单",
            openNames:['2']
          }
        },
        {
          path: '/pendingTaskList',
          name:'pendingTaskList',
          component: pendingTaskList,
          meta:{
            level1:'首页',
            level2:"任务单管理",
            level3:"待处理任务单列表",
            openNames:['2']
          }
        },
        {
          path: '/processedTaskList',
          name:'processedTaskList',
          component: processedTaskList,
          meta:{
            level1:'首页',
            level2:"任务单管理",
            level3:"已处理任务单列表",
            openNames:['2']
          }
        },
        {
          path: '/addAcceptance',
          name:'addAcceptance',
          component: addAcceptance,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"新增受理单",
            openNames:['2']
          }
        },

        {
          path: '/invoiceList',
          name:'invoiceList',
          component: invoiceList,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"发票列表",
            openNames:['2']
          }
        },
        {
          path: '/medicalRelationTransform',
          name:'medicalRelationTransform',
          component: medicalRelationTransform,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"医疗关系转移",
            openNames:['2']
          }
        },

        {
          path: '/auditAcceptance',
          name:'auditAcceptance',
          component: auditAcceptance,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"审核受理单",
            openNames:['2']
          }
        },
        {
          path: '/addFragmentaryReimbursement',
          name:'addFragmentaryReimbursement',
          component: addFragmentaryReimbursement,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"新增零星报销",
            openNames:['2']
          }
        },
        {
          path: '/addMedicalTransform',
          name:'addMedicalTransform',
          component: addMedicalTransform,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"新增医疗关系转移",
            openNames:['2']
          }
        },
        {
          path: '/auditNurseryFee',
          name:'auditNurseryFee',
          component: auditNurseryFee,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"托费报销受理",
            openNames:['2']
          }
        },
        {
          path: '/InsurancePolicyList',
          name:'InsurancePolicyList',
          component: InsurancePolicyList,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"保单批次列表",
            openNames:['2']
          }
        },
        {
          path: '/InsurancePolicyNumEmpList',
          name:'InsurancePolicyNumEmpList',
          component: InsurancePolicyNumEmpList,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"新增保单缴费批次",
            openNames:['2']
          }
        },
        {
          path: '/InsurancePolicyNumCostConfirmList',
          name:'InsurancePolicyNumCostConfirmList',
          component: InsurancePolicyNumCostConfirmList,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"保单费用确认",
            openNames:['2']
          }
        },
        {
          path: '/InsurancePolicyNumList',
          name:'InsurancePolicyNumList',
          component: InsurancePolicyNumList,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"保单号列表",
            openNames:['2']
          }
        },
        {
          path: '/AddInsurancePolicyNum',
          name:'AddInsurancePolicyNum',
          component: AddInsurancePolicyNum,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"新增保单号",
            openNames:['2']
          }
        },
        {
          path: '/AddPayRate',
          name:'AddPayRate',
          component: AddPayRate,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"新增付费比例",
            openNames:['2']
          }
        },
        {
          path: '/AgentBusinessList',
          name:'AgentBusinessList',
          component: AgentBusinessList,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"代收代付列表",
            openNames:['2']
          }
        },
        {
          path: '/AddAgentBusiness',
          name:'AddAgentBusiness',
          component: AddAgentBusiness,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"新增代收代付",
            openNames:['2']
          }
        },
        {
          path: '/AgentBusinessBatchList',
          name:'AgentBusinessBatchList',
          component: AgentBusinessBatchList,
          meta:{
            level1:'首页',
            level2:"保单管理",
            level3:"代收代付批次列表",
            openNames:['2']
          }
        },
        {
          path: '/supplementaryMedicalList',
          name:'supplementaryMedicalList',
          component: supplementaryMedicalList,
          meta:{
            level1:'首页',
            level2:"补充医疗理赔",
            level3:"补充医疗理赔",
            openNames:['2']
          }
        },
        {
          path: '/supplementaryMedicalBatchList',
          name:'supplementaryMedicalBatchList',
          component: supplementaryMedicalBatchList,
          meta:{
            level1:'首页',
            level2:"补充医疗理赔",
            level3:"补充医疗理赔批量",
            openNames:['2']
          }
        },
        {
          path: '/acceptanceAuditList',
          name:'acceptanceAuditList',
          component: acceptanceAuditList,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"未投保审核列表",
            openNames:['2']
          }
        },
        {
          path: '/acceptanceList',
          name:'acceptanceList',
          component: acceptanceList,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"受理单列表",
            openNames:['2']
          }
        },
        {
          path: '/checkMedicalList',
          name:'checkMedicalList',
          component: checkMedicalList,
          meta:{
            level1:'首页',
            level2:"未投保医疗",
            level3:"新增未投保列表",
            openNames:['2']
          }
        },
        {
          path: '/insuredList',
          name:'insuredList',
          component: insuredList,
          meta:{
            level1:'首页',
            level2:"在保管理",
            level3:"在保管理",
            openNames:['2']
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
        },{
          path: '/giftPersonChoose',
          name: 'giftPersonChoose',
          component: giftPersonChoose,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "人员选择",
            openNames: ['2']
          }
        },{
          path: '/giftAdd',
          name: 'giftAdd',
          component: giftAdd,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增礼品",
            openNames: ['2']
          }
        },{
          path: '/giftUpdate',
          name: 'giftUpdate',
          component: giftUpdate,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "修改礼品",
            openNames: ['2']
          }
        },{
          path: '/giftApply',
          name: 'giftApply',
          component: giftApply,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "申请礼品",
            openNames: ['2']
          }
        },{
          path: '/giftConfirm',
          name: 'giftConfirm',
          component: giftConfirm,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "礼品确认",
            openNames: ['2']
          }
        },{
          path: '/marketActivitiesManager',
          name: 'marketActivitiesManager',
          component: marketActivitiesManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "市场活动管理",
            openNames: ['2']
          }
        },{
          path: '/addActivity',
          name: 'addActivity',
          component: addActivity,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增市场活动",
            openNames: ['2']
          }
        },{
          path: '/updateActivity',
          name: 'updateActivity',
          component: updateActivity,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "新增市场活动",
            openNames: ['2']
          }
        },{
          path: '/marketPersonChoose',
          name: 'marketPersonChoose',
          component: marketPersonChoose,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "市场活动申请",
            openNames: ['2']
          }
        },{
          path: '/applyActivity',
          name: 'applyActivity',
          component: applyActivity,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "市场活动申请",
            openNames: ['2']
          }
        },{
          path: '/grantManager',
          name: 'grantManager',
          component: grantManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "发放管理",
            openNames: ['2']
          }
        }, {
          path: '/giftExamine',
          name: 'giftExamine',
          component: giftExamine,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "礼品审批",
            openNames: ['2']
          }
        },{
          path: '/giftGrant',
          name: 'giftGrant',
          component: giftGrant,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "礼品发放",
            openNames: ['2']
          }
        },{
          path: '/marketExamine',
          name: 'marketExamine',
          component: marketExamine,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "活动审批",
            openNames: ['2']
          }
        },{
          path: '/marketGrant',
          name: 'marketGrant',
          component: marketGrant,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "活动发放",
            openNames: ['2']
          }
        },{
          path: '/reportFormManager',
          name: 'reportFormManager',
          component: reportFormManager,
          meta: {
            level1: '首页',
            level2: "弹性福利",
            level3: "报表查询",
            openNames: ['2']
          }
        }
      ]
      }
   ]})

router.beforeEach((to,from,next)=>{
  // console.log(router.app.$local);
    window.document.title="社保中心";
    localStorage.setItem('level1',to.meta.level1);
    localStorage.setItem('level2',to.meta.level2);
    localStorage.setItem('level3',to.meta.level3);
    localStorage.setItem('level4',to.meta.level4);
    localStorage.setItem("openNames",[to.meta.openNames]);
    next();
});
router.afterEach((to,from)=>{});


export default router;
