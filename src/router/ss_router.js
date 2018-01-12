/* ================== 本地社保 ================== */
/*
 * employeesocialsecuritysearch      --- 雇员社保查询
   employeesocialsecurityinfo        --- 基本信息
   companysocialsecuritynew          --- 基本信息
   EmployeeSocialSecurityTaskInfo    --- 雇员任务详情
 */

const employeesocialsecuritysearch = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/EmployeeSocialSecuritySearch')), 'employeesocialsecuritysearch')
const employeesocialsecurityinfo = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/EmployeeSocialSecurityInfo')), 'employeesocialsecurityinfo')
const companysocialsecuritynew = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/CompanySocialSecurityNew')), 'companysocialsecuritynew')
const employeesocialsecuritytaskinfo = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/EmployeeSocialSecurityTaskInfo')), 'employeesocialsecuritytaskinfo')

/*
 * employeeoperatorview              --- 雇员日常操作
 * employeecommcialoperator          --- 雇员日常操作、办理
 */

const employeeoperatorview = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/EmployeeOperatorView')), 'employeeoperatorview')
const employeecommcialoperator = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/EmployeeCommcialOperator')), 'employeecommcialoperator')


/*
 * employeespecialoperatorview       --- 雇员特殊操作
   employeespecialprogressTwo          --- 雇员特殊操作、办理(步骤2)
   employeespecialprogressThree          --- 雇员特殊操作、办理(步骤3)
   empSpecialtaskdetail                 ---特殊任务单查看详情页
 */

const employeespecialoperatorview = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmployeeSpecialOperatorView')), 'employeespecialoperatorview')
const employeespecialprogresstwo = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmployeeSpecialProgressTwo')), 'employeespecialprogresstwo')
const employeespecialprogressthree = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmployeeSpecialProgressThree')), 'employeespecialprogressthree')
const empspecialtaskdetail = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmpSpecialTaskDetail')), 'empspecialtaskdetail')

// 雇员任务办理
const empTaskHandleView = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandleView')), 'empTaskHandleView')
const empTaskHandle3View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle3View')), 'empTaskHandle3View')
const empTaskHandle4View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle4View')), 'empTaskHandle4View')
const empTaskHandle5View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle5View')), 'empTaskHandle5View')
// 雇员任务批量办理
const empTaskBatchHandleView = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandleView')), 'empTaskBatchHandleView')
const empTaskBatchHandle3View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle3View')), 'empTaskBatchHandle3View')
const empTaskBatchHandle4View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle4View')), 'empTaskBatchHandle4View')
const empTaskBatchHandle5View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle5View')), 'empTaskBatchHandle5View')


/*
 * companytasklist                   --- 企业任务单
   companytaskprogress2              --- 企业任务单、办理(步骤2)
   companytaskprogresstypeinfo       --- 企业任务单、办理(输入)
   companytaskprogresstransferinfo   --- 企业任务单、办理(转移)
   companytaskprogresschangeinfo     --- 企业任务单、办理(变更)
   companytaskprogressendinfo        --- 企业任务单、办理(终止)
   openaccountinfo                   --- 开户信息查看
   transferinfo                      --- 转移信息查看
   changeinfo                        --- 变更信息查看
   endinfo                           --- 终止信息查看
   refresh                           --- 刷新跳转页面
 */

const companytasklist = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskList')), 'companytasklist')
const companytaskprogress2 = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressTwo')), 'companytaskprogress2')
const companytaskprogresstypeinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressTypeInfo')), 'companytaskprogresstypeinfo')
const companytaskprogresstransferinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressTransferInfo')), 'companytaskprogresstransferinfo')
const companytaskprogresschangeinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressChangeInfo')), 'companytaskprogresschangeinfo')
const companytaskprogressendinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressEndInfo')), 'companytaskprogressendinfo')
const openaccountinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/OpenAccountInfo')), 'openaccountinfo')
const transferinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/TransferInfo')), 'transferinfo')
const changeinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/ChangeInfo')), 'changeinfo')
const endinfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/EndInfo')), 'endinfo')
const refresh = r=> require.ensure([], () => r(require('@/components/social_security/company_task_list/company_task_list_tab/ReFresh')), 'refresh')

/*
 * companysocialsecuritymanage       --- 企业社保账户管理
   companysocialsecurity             --- 企业社保账户信息
   companysocialsecurityprogress2    --- 企业社保账户信息2
   companysocialsecuritytypeinfo     --- 企业社保账户信息(输入)
   companysocialsecuritychangeinfo   --- 企业社保账户信息(变更)
   companysocialsecurityendinfo      --- 企业社保账户信息(终止)
 */

const companysocialsecuritymanage = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityManage')), 'companysocialsecuritymanage')
const companysocialsecurity = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurity')), 'companysocialsecurity')
const companysocialsecurityprogress2 = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityProgressTwo')), 'companysocialsecurityprogress2')
const companysocialsecuritytypeinfo = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityTypeInfo')), 'companysocialsecuritytypeinfo')
const companysocialsecuritychangeinfo = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityChangeInfo')), 'companysocialsecuritychangeinfo')
const companysocialsecurityendinfo = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialsecurityEndInfo')), 'companysocialsecurityendinfo')

/*
 * socialsecurityreconcilate       --- 社保对账
 * socialsecurityreconcilatedetail ---社保对账查看页面
 */


const socialsecurityreconcilate = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/socialsecurityreconcilate')), 'socialsecurityreconcilate')
const socialsecurityreconcilatedetail = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/social_security_recon_cilate_child/SocialSecurityReconCilateDetail')), 'socialsecurityreconcilatedetail')
const SocialSecurityEmpChangeDetailYys = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/social_security_recon_cilate_child/SocialSecurityEmpChangeDetailYys')), 'SocialSecurityEmpChangeDetailYys')
const SocialSecurityEmpChangeDetailGsy = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/social_security_recon_cilate_child/SocialSecurityEmpChangeDetailGsy')), 'SocialSecurityEmpChangeDetailGsy')

/*
 * socialsecuritypay               --- 社保支付
 * paymentnotice                   --- 查看付款通知书
 */


const socialSecurityPay = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay/SocialSecurityPay')), 'socialSecurityPay')
const paymentnotice = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay/Paymentnotice')), 'paymentnotice')

/*
 * socialsecuritypay               --- 社保支付批次审核
 * paymentnotice                   --- 查看批次明细
 */


const paymentBatchReviewed = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay_reviewed/PaymentBatchReviewed')), 'paymentBatchReviewed')
const paymentComReviewed = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay_reviewed/PaymentComReviewed')), 'paymentComReviewed')

/*
 * socialsecurityreport               --- 社保报表
 * monthlypaymentnotice            --- 月缴费通知
 */


const socialsecurityreport = r => require.ensure([], () => r(require('@/components/social_security/social_security_report/socialsecurityreport')), 'socialsecurityreport')
const monthlypaymentnotice = r => require.ensure([], () => r(require('@/components/social_security/social_security_report/monthlyPaymentNotice')), 'socialsecurityreport')


/*
 * yearbaseapplicate               --- 年度基数申报
 */

const yearbaseapplicate = r => require.ensure([], () => r(require('@/components/social_security/year_base_applicate/employeesocannualadjust')), 'employeesocannualadjust')


/*
 * systemmanage                    --- 系统管理
 */

const systemmanage = r => require.ensure([], () => r(require('@/components/social_security/system_manage/systemmanage')), 'systemmanage')

export default [
  {
    path: '/employee_social_security_search',
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
    path: '/employee_social_security_info',
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
    path: '/company_social_security_new',
    name:'companysocialsecuritynew',
    component: companysocialsecuritynew,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员社保办理",
      openNames:['1']
    }
  },
  {
    path: '/employee_social_security_task_info',
    name:'employeesocialsecuritytaskinfo',
    component: employeesocialsecuritytaskinfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员社保查询",
      openNames:['1']
    }
  },

  {
    path: '/employee_operator_view',
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
    path: '/employee_comm_cial_operator',
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
    path: '/employee_special_operator_view',
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
    path: '/employee_special_progress_two',
    name: 'employeespecialprogresstwo',
    component: employeespecialprogresstwo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员特殊操作",
      openNames:['1']
    }
  },
  {
    path: '/employee_special_progress_three',
    name: 'employeespecialprogressthree',
    component: employeespecialprogressthree,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员特殊操作",
      openNames:['1']
    }
  },

  {
    path: '/emp_special_task_detail',
    name: 'empspecialtaskdetail',
    component: empspecialtaskdetail,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员特殊操作",
      openNames:['1']
    }
  },

  // 雇员任务办理，任务类型，DicItem.DicItemValue 1:新进：2：转入 3调整 4 补缴 5 转出 6终止 7退账 8 提取 9特殊操作
  {
    path: '/emp_task_handle_view',
    name: 'empTaskHandleView',
    component: empTaskHandleView,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员操作新进转入",
      openNames:['1']
    }
  },{
    path: '/emp_task_handle3_view',
    name: 'empTaskHandle3View',
    component: empTaskHandle3View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员操作调整",
      openNames:['1']
    }
  },{
    path: '/emp_task_handle4_view',
    name: 'empTaskHandle4View',
    component: empTaskHandle4View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员操作补缴",
      openNames:['1']
    }
  },{
    path: '/emp_task_handle5_view',
    name: 'empTaskHandle5View',
    component: empTaskHandle5View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员操作转出",
      openNames:['1']
    }
  },

  // 雇员任务批量办理
  {
    path: '/emp_task_batch_handle_view',
    name: 'empTaskBatchHandleView',
    component: empTaskBatchHandleView,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员批量操作新进转入",
      openNames:['1']
    }
  },{
    path: '/emp_task_batch_handle3_view',
    name: 'empTaskBatchHandle3View',
    component: empTaskBatchHandle3View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员任务批量操作调整",
      openNames:['1']
    }
  },{
    path: '/emp_task_batch_handle4_view',
    name: 'empTaskBatchHandle4View',
    component: empTaskBatchHandle4View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员批量操作补缴",
      openNames:['1']
    }
  },{
    path: '/emp_task_batch_handle5_view',
    name: 'empTaskBatchHandle5View',
    component: empTaskBatchHandle5View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员批量操作转出",
      openNames:['1']
    }
  },


  {
    path: '/company_task_list',
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
    path: '/company_task_progress2',
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
    path: '/company_task_progress_type_info',
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
    path: '/company_task_progress_transfer_info',
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
    path: '/company_task_progress_change_info',
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
    path: '/re_fresh',
    name: 'refresh',
    component: refresh,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业任务单",
      openNames:['1']
    }
  },
  {
    path: '/company_task_progres_send_info',
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
    path: '/open_account_info',
    name: 'openaccountinfo',
    component: openaccountinfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/transfer_info',
    name: 'transfertnfo',
    component: transferinfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/change_info',
    name: 'changeinfo',
    component: changeinfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/end_info',
    name: 'endinfo',
    component: endinfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_manage',
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
    path: '/company_social_security',
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
    path: '/company_social_security_progress2',
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
    path: '/company_social_security_type_info',
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
    path: '/company_social_security_change_info',
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
    path: '/company_social_security_end_info',
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
    path: '/social_security_recon_cilate',
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
    path: '/social_security_recon_cilate_detail',
    name: 'socialsecurityreconcilatedetail',
    component: socialsecurityreconcilatedetail,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保对账",
      openNames:['1']
    }
  },
  {
    path: '/social_security_emp_change_detail_yys',
    name: 'SocialSecurityEmpChangeDetailYys',
    component: SocialSecurityEmpChangeDetailYys,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保对账",
      openNames:['1']
    }
  },
  {
    path: '/social_security_emp_change_detail_gsy',
    name: 'SocialSecurityEmpChangeDetailGsy',
    component: SocialSecurityEmpChangeDetailGsy,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保对账",
      openNames:['1']
    }
  },
  {
    path: '/social_security_pay',
    name: 'socialSecurityPay',
    component: socialSecurityPay,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保支付",
      openNames:['1']
    }
  },
  {
    path: '/payment_notice',
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
    path: '/payment_batch_reviewed',
    name: 'paymentBatchReviewed',
    component: paymentBatchReviewed,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保支付审核",
      openNames:['1']
    }
  },
  {
    path: '/payment_com_reviewed',
    name: 'paymentComReviewed',
    component: paymentComReviewed,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保支付审核",
      openNames:['1']
    }
  },

  {
    path: '/social_security_report',
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
    path: '/monthly_payment_notice',
    name: 'monthlypaymentnotice',
    component: monthlypaymentnotice,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保报表",
      openNames:['1']
    }
  },
  {
    path: '/year_base_applicate',
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
    path: '/system_manage',
    name: 'systemmanage',
    component: systemmanage,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"系统管理",
      openNames:['1']
    }
  }
]
