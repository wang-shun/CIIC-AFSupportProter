import Vue from 'vue'
import Router from 'vue-router'

const main = r => require.ensure([], () => r(require('@/components/main')), 'main') //首页
const login = r => require.ensure([], () => r(require('@/components/login')), 'login') //登录
const charts = r => require.ensure([], () => r(require('@/components/charts')), 'charts') //报表

const approvalstep2 = r => require.ensure([], () => r(require('@/views/commoncontrol/approvalstep2')), 'approvalstep2') //审核步骤2

/* ================== 本地社保 ================== */
/*
 * employeesocialsecuritysearch      --- 雇员社保查询
   employeesocialsecurityinfo        --- 基本信息
   companysocialsecuritynew          --- 基本信息
 */

const employeesocialsecuritysearch = r => require.ensure([], () => r(require('@/views/socialsecurity/shsocialsecurity/employeesocialsecuritysearch')), 'employeesocialsecuritysearch')
const employeesocialsecurityinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/shsocialsecurity/employeesocialsecurityinfo')), 'employeesocialsecurityinfo')
const companysocialsecuritynew = r => require.ensure([], () => r(require('@/views/socialsecurity/shsocialsecurity/companysocialsecuritynew')), 'companysocialsecuritynew')


/*
 * employeeoperatorview              --- 雇员日常操作
 * employeecommcialoperator          --- 雇员日常操作、办理
 */

const employeeoperatorview = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeoperator/employeeoperatorview')), 'employeeoperatorview')
const employeecommcialoperator = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeoperator/employeecommcialoperator')), 'employeecommcialoperator')


/*
 * employeespecialoperatorview       --- 雇员特殊操作
   employeespecialprogress2          --- 雇员特殊操作、办理(步骤2)
   employeespecialprogress3          --- 雇员特殊操作、办理(步骤3)
 */

const employeespecialoperatorview = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeSpecialOperator/employeespecialoperatorview')), 'employeespecialoperatorview')
const employeespecialprogress2 = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeSpecialOperator/employeespecialprogress2')), 'employeespecialprogress2')
const employeespecialprogress3 = r => require.ensure([], () => r(require('@/views/socialsecurity/employeeSpecialOperator/employeespecialprogress3')), 'employeespecialprogress3')


/*
 * companytasklist                   --- 企业任务单
   companytaskprogress2              --- 企业任务单、办理(步骤2)
   companytaskprogresstypeinfo       --- 企业任务单、办理(输入)
   companytaskprogresstransferinfo   --- 企业任务单、办理(转移)
   companytaskprogresschangeinfo     --- 企业任务单、办理(变更)
   companytaskprogressendinfo        --- 企业任务单、办理(终止)
 */

const companytasklist = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytasklist')), 'companytasklist')
const companytaskprogress2 = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogress2')), 'companytaskprogress2')
const companytaskprogresstypeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogresstypeinfo')), 'companytaskprogresstypeinfo')
const companytaskprogresstransferinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogresstransferinfo')), 'companytaskprogresstransferinfo')
const companytaskprogresschangeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogresschangeinfo')), 'companytaskprogresschangeinfo')
const companytaskprogressendinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companytasklist/companytaskprogressendinfo')), 'companytaskprogressendinfo')


/*
 * companysocialsecuritymanage       --- 企业社保账户管理
   companysocialsecurity             --- 企业社保账户信息
   companysocialsecurityprogress2    --- 企业社保账户信息2
   companysocialsecuritytypeinfo     --- 企业社保账户信息(输入)
   companysocialsecuritychangeinfo   --- 企业社保账户信息(变更)
   companysocialsecurityendinfo      --- 企业社保账户信息(终止)
 */

const companysocialsecuritymanage = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecuritymanage')), 'companysocialsecuritymanage')
const companysocialsecurity = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecurity')), 'companysocialsecurity')
const companysocialsecurityprogress2 = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecurityprogress2')), 'companysocialsecurityprogress2')
const companysocialsecuritytypeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecuritytypeinfo')), 'companysocialsecuritytypeinfo')
const companysocialsecuritychangeinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecuritychangeinfo')), 'companysocialsecuritychangeinfo')
const companysocialsecurityendinfo = r => require.ensure([], () => r(require('@/views/socialsecurity/companysocialsecuritymanage/companysocialsecurityendinfo')), 'companysocialsecurityendinfo')


/*
 * socialsecurityreconcilate       --- 社保对账
 */

const socialsecurityreconcilate = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecurityreconcilate/socialsecurityreconcilate')), 'socialsecurityreconcilate')


/*
 * socialsecuritypay               --- 社保支付
 * paymentnotice                   --- 查看付款通知书
 */

const socialsecuritypay = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecuritypay/socialsecuritypay')), 'socialsecuritypay')
const paymentnotice = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecuritypay/paymentnotice')), 'paymentnotice')


/*
 * socialsecuritypay               --- 社保报表
 */

const socialsecurityreport = r => require.ensure([], () => r(require('@/views/socialsecurity/socialsecurityreport/socialsecurityreport')), 'socialsecurityreport')


/*
 * yearbaseapplicate               --- 年度基数申报
 */

const yearbaseapplicate = r => require.ensure([], () => r(require('@/views/socialsecurity/yearbaseapplicate/yearbaseapplicate')), 'yearbaseapplicate')


/*
 * systemmanage                    --- 系统管理
 */

const systemmanage = r => require.ensure([], () => r(require('@/views/socialsecurity/systemmanage/systemmanage')), 'systemmanage')


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

const employeefundsearch = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundsearch')), 'employeefundsearch')
const employeefundhistory = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundhistory')), 'employeefundhistory')
const employeefundbasicinfo = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundbasicinfo')), 'employeefundbasicinfo')
const employeefundhistorydetail = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundhistorydetail')), 'employeefundhistorydetail')

const employeefundcommonoperator = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundcommonoperator')), 'employeefundcommonoperator')
const employeefundspecialoperator = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/employeefundspecialoperator')), 'employeefundspecialoperator')
const companyfundtasklist = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/companyfundtasklist')), 'companyfundtasklist')
const companyfundaccountsearch = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/companyfundaccountsearch')), 'companyfundaccountsearch')
const fundreconciliation = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/fundreconciliation')), 'fundreconciliation')
const fundpay = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/fundpay')), 'fundpay')
const fundreport = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/fundreport')), 'fundreport')
const fundyearadjust = r => require.ensure([], () => r(require('@/views/fund/employeefundsearch/fundyearadjust')), 'fundyearadjust')


//任务单管理
const pendingTaskList = r => require.ensure([], () => r(require('@/views/medicalTaskManagement/pendingTaskList')), 'pendingTaskList') //待处理任务单列表
const processedTaskList = r => require.ensure([], () => r(require('@/views/medicalTaskManagement/processedTaskList')), 'processedTaskList') //已处理任务单列表

//补充医疗理赔
const supplementaryMedicalList = r => require.ensure([], () => r(require('@/views/medicalSupplementary/supplementaryMedicalList')), 'supplementaryMedicalList') //审核受理单
const supplementaryMedicalBatchList = r => require.ensure([], () => r(require('@/views/medicalSupplementary/supplementaryMedicalBatchList')), 'supplementaryMedicalBatchList') //补充医疗理赔批量
const invoiceList = r => require.ensure([], () => r(require('@/views/medicalSupplementary/invoiceList')), 'invoiceList') //发票列表

//未投保医疗
const acceptanceList = r => require.ensure([], () => r(require('@/views/medicalUninsured/acceptanceList')), 'acceptanceList') //受理单列表
const checkMedicalList = r => require.ensure([], () => r(require('@/views/medicalUninsured/checkMedicalList')), 'checkMedicalList') //新增未投保列表
const acceptanceAuditList = r => require.ensure([], () => r(require('@/views/medicalUninsured/acceptanceAuditList')), 'acceptanceAuditList') //未投保审核列表
const addAcceptanceEmployeeList = r => require.ensure([], () => r(require('@/views/medicalUninsured/addAcceptanceEmployeeList')), 'addAcceptanceEmployeeList') //理赔人员列表
const addAcceptance = r => require.ensure([], () => r(require('@/views/medicalUninsured/addAcceptance')), 'addAcceptance') //新增受理单
const auditAcceptance = r => require.ensure([], () => r(require('@/views/medicalUninsured/auditAcceptance')), 'auditAcceptance') //审核受理单

const medicalRelationTransform = r => require.ensure([], () => r(require('@/views/medicalUninsured/medicalRelationTransform')), 'medicalRelationTransform') //医疗关系转移
const addFragmentaryReimbursement = r => require.ensure([], () => r(require('@/views/medicalUninsured/addFragmentaryReimbursement')), 'addFragmentaryReimbursement') //发票列表
const addMedicalTransform = r => require.ensure([], () => r(require('@/views/medicalUninsured/addMedicalTransform')), 'addMedicalTransform') //医疗关系转移
const auditNurseryFee = r => require.ensure([], () => r(require('@/views/medicalUninsured/auditNurseryFee')), 'auditNurseryFee') //医疗关系转移


//在保管理
const insuredList = r => require.ensure([], () => r(require('@/views/medicalTaskManagement/insuredList')), 'insuredList') //在保管理


//保单管理
const InsurancePolicyList = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/InsurancePolicyList')), 'InsurancePolicyList') //保单列表
const InsurancePolicyNumEmpList = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/InsurancePolicyNumEmpList')), 'InsurancePolicyNumEmpList') //保单人员列表
const InsurancePolicyNumCostConfirmList = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/InsurancePolicyNumCostConfirmList')), 'InsurancePolicyNumCostConfirmList') //保单费用确认
const InsurancePolicyNumList = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/InsurancePolicyNumList')), 'InsurancePolicyNumList') //保单号列表
const AddInsurancePolicyNum = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/AddInsurancePolicyNum')), 'AddInsurancePolicyNum') //新增保单号
const AddPayRate = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/AddPayRate')), 'AddPayRate') //新增付费比例
const AgentBusinessList = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/AgentBusinessList')), 'AgentBusinessList') //代收代付列表
const AddAgentBusiness = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/AddAgentBusiness')), 'AddAgentBusiness') //新增代收代付
const AgentBusinessBatchList = r => require.ensure([], () => r(require('@/views/InsurancePolicyManagement/AgentBusinessBatchList')), 'AgentBusinessBatchList') //新增代收代付

/*
 * giftApplicationManager              --弹性福利
 * marketActivitiesManager
 * grantManager
 * reportFormManager
 */
const giftApplicationManager = r => require.ensure([], () => r(require('@/views/gift/giftApplicationManager')), 'giftApplicationManager') //礼品管理
const giftPersonChoose = r => require.ensure([], () => r(require('@/views/gift/giftPersonChoose')), 'giftPersonChoose') //人员选择
const giftAdd = r => require.ensure([], () => r(require('@/views/gift/giftAdd')), 'giftAdd') //新增礼品单
const giftApply = r => require.ensure([], () => r(require('@/views/gift/giftApply')), 'giftApply') //申请礼品
const giftConfirm = r => require.ensure([], () => r(require('@/views/gift/giftConfirm')), 'giftConfirm') //礼品确认

const marketActivitiesManager = r => require.ensure([], () => r(require('@/views/marketActivities/marketActivitiesManager')), 'marketActivitiesManager') //市场活动管理
const addActivity = r => require.ensure([], () => r(require('@/views/marketActivities/addActivity')), 'addActivity') //新增活动
const applyActivity = r => require.ensure([], () => r(require('@/views/marketActivities/applyActivity')), 'applyActivity') //申请活动
const marketPersonChoose = r => require.ensure([], () => r(require('@/views/marketActivities/marketPersonChoose')), 'marketPersonChoose'); //人员选择

const grantManager = r => require.ensure([], () => r(require('@/views/grant/grantManager')), 'grantManager') //发放管理
const giftExamine = r => require.ensure([], () => r(require('@/views/grant/giftExamine')), 'giftExamine') //礼品审批
const giftGrant = r => require.ensure([], () => r(require('@/views/grant/giftGrant')), 'giftGrant') //礼品发放
const marketExamine = r => require.ensure([], () => r(require('@/views/grant/marketExamine')), 'marketExamine') //活动审批
const marketGrant = r => require.ensure([], () => r(require('@/views/grant/marketGrant')), 'marketGrant') //活动发放

const reportFormManager = r => require.ensure([], () => r(require('@/views/reportForm/reportFormManager')), 'reportFormManager') //报表查询




Vue.use(Router)
let router = new Router({

  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/main',
      component: main,
      children: [
        {
          path: '', //默认显示的自路由
          name:'main',
          component: charts
        },
        {
          path: '/employeesocialsecuritysearch',
          name:'employeesocialsecuritysearch',
          component: employeesocialsecuritysearch,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员社保查询",
            openNames:['1']
          }
        },
        {
          path: '/employeesocialsecurityinfo',
          name:'employeesocialsecurityinfo',
          component: employeesocialsecurityinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员社保基本信息",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecuritynew',
          name:'companysocialsecuritynew',
          component: companysocialsecuritynew,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保基本信息",
            openNames:['1']
          }
        },

        {
          path: '/employeeoperatorview',
          name:'employeeoperatorview',
          component: employeeoperatorview,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员日常操作",
            openNames:['1']
          }
        },
        {
          path: '/employeecommcialoperator',
          name:'employeecommcialoperator',
          component: employeecommcialoperator,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员日常操作",
            openNames:['1']
          }
        },

        {
          path: '/employeespecialoperatorview',
          name: 'employeespecialoperatorview',
          component: employeespecialoperatorview,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员特殊操作",
            openNames:['1']
          },
        },
        {
          path: '/employeespecialprogress2',
          name: 'employeespecialprogress2',
          component: employeespecialprogress2,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员特殊操作",
            openNames:['1']
          }
        },
        {
          path: '/employeespecialprogress3',
          name: 'employeespecialprogress3',
          component: employeespecialprogress3,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"雇员特殊操作",
            openNames:['1']
          }
        },

        {
          path: '/CompanyTaskList',
          name: 'companytasklist',
          component: companytasklist,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          },
        },
        {
          path: '/companytaskprogress2',
          name: 'companytaskprogress2',
          component: companytaskprogress2,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogresstypeinfo',
          name: 'companytaskprogresstypeinfo',
          component: companytaskprogresstypeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogresstransferinfo',
          name: 'companytaskprogresstransferinfo',
          component: companytaskprogresstransferinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogresschangeinfo',
          name: 'companytaskprogresschangeinfo',
          component: companytaskprogresschangeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },
        {
          path: '/companytaskprogressendinfo',
          name: 'companytaskprogressendinfo',
          component: companytaskprogressendinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业任务单",
            openNames:['1']
          }
        },

        {
          path: '/CompanySocialSecurityManage',
          name: 'companysocialsecuritymanage',
          component: companysocialsecuritymanage,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecurity',
          name: 'companysocialsecurity',
          component: companysocialsecurity,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecurityprogress2',
          name: 'companysocialsecurityprogress2',
          component: companysocialsecurityprogress2,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecuritytypeinfo',
          name: 'companysocialsecuritytypeinfo',
          component: companysocialsecuritytypeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecuritychangeinfo',
          name: 'companysocialsecuritychangeinfo',
          component: companysocialsecuritychangeinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },
        {
          path: '/companysocialsecurityendinfo',
          name: 'companysocialsecurityendinfo',
          component: companysocialsecurityendinfo,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"企业社保账户管理",
            openNames:['1']
          }
        },

        {
          path: '/socialsecurityreconcilate',
          name: 'socialsecurityreconcilate',
          component: socialsecurityreconcilate,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保对账",
            openNames:['1']
          }
        },

        {
          path: '/SocialSecurityPay',
          name: 'socialsecuritypay',
          component: socialsecuritypay,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保支付",
            openNames:['1']
          }
        },
        {
          path: '/paymentnotice',
          name: 'paymentnotice',
          component: paymentnotice,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保支付",
            openNames:['1']
          }
        },

        {
          path: '/socialsecurityreport',
          name: 'socialsecurityreport',
          component: socialsecurityreport,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"社保报表",
            openNames:['1']
          }
        },

        {
          path: '/yearbaseapplicate',
          name: 'yearbaseapplicate',
          component: yearbaseapplicate,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"年度基数申报",
            openNames:['1']
          }
        },

        {
          path: '/systemmanage',
          name: 'systemmanage',
          component: systemmanage,
          meta:{
            level1:'全国社保',
            level2:"上海社保",
            level3:"系统管理",
            openNames:['1']
          }
        },

        {
          path: '/employeefundsearch',
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
          path: '/employeefundhistory',
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
          path: '/employeefundbasicinfo',
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
          path: '/employeefundhistorydetail',
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
          path: '/employeefundcommonoperator',
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
          path: '/employeefundspecialoperator',
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
          path: '/companyfundtasklist',
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
          path: '/companyfundaccountsearch',
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
          path: '/fundreconciliation',
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
          path: '/fundpay',
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
          path: '/fundreport',
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
          path: '/fundyearadjust',
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
