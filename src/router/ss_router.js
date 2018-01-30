/* ================== 本地社保 ================== */
/*
 * employeeSocialSecuritySearch      --- 雇员社保查询
   employeeSocialSecurityInfo        --- 基本信息
   companySocialSecurityNew          --- 基本信息
   employeeSocialSecurityTaskInfo    --- 雇员任务详情
 */

const employeeSocialSecuritySearch = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/EmployeeSocialSecuritySearch')), 'EmployeeSocialSecuritySearch')
const employeeSocialSecurityInfo = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/EmployeeSocialSecurityInfo')), 'EmployeeSocialSecurityInfo')
const companySocialSecurityNew = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/CompanySocialSecurityNew')), 'CompanySocialSecurityNew')
const employeeSocialSecurityTaskInfo = r => require.ensure([], () => r(require('@/components/social_security/sh_social_security/EmployeeSocialSecurityTaskInfo')), 'EmployeeSocialSecurityTaskInfo')

/*
 * employeeOperatorView              --- 雇员日常操作
 * employeeCommcialOperator          --- 雇员日常操作、办理
 */

const employeeOperatorView = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/EmployeeOperatorView')), 'EmployeeOperatorView')
const employeeCommcialOperator = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/EmployeeCommcialOperator')), 'EmployeeCommcialOperator')


/*
 * employeeSpecialOperatorView       --- 雇员特殊操作
   employeeSpecialProgressTwo        --- 雇员特殊操作、办理(步骤2)
   employeeSpecialProgressThree      --- 雇员特殊操作、办理(步骤3)
   empSpecialTaskDetail              ---特殊任务单查看详情页
 */

const employeeSpecialOperatorView = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmployeeSpecialOperatorView')), 'EmployeeSpecialOperatorView')
const employeeSpecialProgressTwo = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmployeeSpecialProgressTwo')), 'EmployeeSpecialProgressTwo')
const employeeSpecialProgressThree = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmployeeSpecialProgressThree')), 'EmployeeSpecialProgressThree')
const empSpecialTaskDetail = r => require.ensure([], () => r(require('@/components/social_security/employee_special_operator/EmpSpecialTaskDetail')), 'EmpSpecialTaskDetail')

// 雇员任务办理
const empTaskHandleView = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandleView')), 'EmpTaskHandleView')
const empTaskHandle3View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle3View')), 'EmpTaskHandle3View')
const empTaskHandle4View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle4View')), 'EmpTaskHandle4View')
const empTaskHandle5View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle5View')), 'EmpTaskHandle5View')
const empTaskHandle7View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/handle/EmpTaskHandle7View')), 'EmpTaskHandle7View')


// 雇员任务批量办理
const empTaskBatchHandleView = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandleView')), 'empTaskBatchHandleView')
const empTaskBatchHandle3View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle3View')), 'empTaskBatchHandle3View')
const empTaskBatchHandle4View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle4View')), 'empTaskBatchHandle4View')
const empTaskBatchHandle5View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle5View')), 'empTaskBatchHandle5View')
const empTaskBatchHandle7View = r => require.ensure([], () => r(require('@/components/social_security/employee_operator/batch_handle/EmpTaskBatchHandle7View')), 'empTaskBatchHandle7View')

/*
 * companyTaskList                   --- 企业任务单
   companyTaskProgress2              --- 企业任务单、办理(步骤2)
   companyTaskProgressTypeInfo       --- 企业任务单、办理(输入)
   companyTaskProgressTransferInfo   --- 企业任务单、办理(转移)
   companyTaskProgressChangeInfo     --- 企业任务单、办理(变更)
   companyTaskProgressEndInfo        --- 企业任务单、办理(终止)
   openAccountInfo                   --- 开户信息查看
   transferinfo                      --- 转移信息查看
   changeinfo                        --- 变更信息查看
   endinfo                           --- 终止信息查看
   refresh                           --- 刷新跳转页面
 */

const companyTaskList = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskList')), 'CompanyTaskList')
const companyTaskProgressTwo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressTwo')), 'CompanyTaskProgressTwo')
const companyTaskProgressTypeInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressTypeInfo')), 'companyTaskProgressTypeInfo')
const companyTaskProgressTransferInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressTransferInfo')), 'CompanyTaskProgressTransferInfo')
const companyTaskProgressChangeInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressChangeInfo')), 'CompanyTaskProgressChangeInfo')
const companyTaskProgressEndInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/CompanyTaskProgressEndInfo')), 'CompanyTaskProgressEndInfo')
const openAccountInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/OpenAccountInfo')), 'OpenAccountInfo')
const transferInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/TransferInfo')), 'Transferinfo')
const changeInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/ChangeInfo')), 'ChangeInfo')
const endInfo = r => require.ensure([], () => r(require('@/components/social_security/company_task_list/EndInfo')), 'EndInfo')
const refresh = r=> require.ensure([], () => r(require('@/components/social_security/company_task_list/company_task_list_tab/ReFresh')), 'Refresh')

/*
 * companySocialSecurityManage       --- 企业社保账户管理
   companySocialSecurity             --- 企业社保账户信息
   companySocialSecurityProgress2    --- 企业社保账户信息2
   companySocialSecurityTypeInfo     --- 企业社保账户信息(输入)
   companySocialSecurityChangeInfo   --- 企业社保账户信息(变更)
   companySocialSecurityEndInfo      --- 企业社保账户信息(终止)
 */

const companySocialSecurityManage = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityManage')), 'CompanySocialSecurityManage')
const companySocialSecurity = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurity')), 'CompanySocialSecurity')
const companySocialSecurityProgress2 = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityProgressTwo')), 'CompanySocialSecurityProgress2')
const companySocialSecurityTypeInfo = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityTypeInfo')), 'CompanySocialSecurityTypeInfo')
const companySocialSecurityChangeInfo = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialSecurityChangeInfo')), 'CompanySocialSecurityChangeInfo')
const companySocialSecurityEndInfo = r => require.ensure([], () => r(require('@/components/social_security/company_social_security_manage/CompanySocialsecurityEndInfo')), 'CompanySocialSecurityEndInfo')

/*
 * socialSecurityReconcilate       --- 社保对账
 * socialSecurityReconcilateDetail ---社保对账查看页面
 */


const socialSecurityReconcilate = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/SocialSecurityReconcilate')), 'SocialSecurityReconcilate')
const socialSecurityReconcilateDetail = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/social_security_recon_cilate_child/SocialSecurityReconCilateDetail')), 'SocialSecurityReconcilateDetail')
const socialSecurityEmpChangeDetailYys = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/social_security_recon_cilate_child/SocialSecurityEmpChangeDetailYys')), 'SocialSecurityEmpChangeDetailYys')
const socialSecurityEmpChangeDetailGsy = r => require.ensure([], () => r(require('@/components/social_security/social_security_recon_cilate/social_security_recon_cilate_child/SocialSecurityEmpChangeDetailGsy')), 'SocialSecurityEmpChangeDetailGsy')

/*
 * socialSecurityPay               --- 社保支付
 * paymentNotice                   --- 查看付款通知书
 */


const socialSecurityPay = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay/SocialSecurityPay')), 'SocialSecurityPay')
const paymentNotice = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay/PaymentNotice')), 'PaymentNotice')

/*
 * socialSecurityPay               --- 社保支付批次审核
 * paymentNotice                   --- 查看批次明细
 */


const paymentBatchReviewed = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay_reviewed/PaymentBatchReviewed')), 'PaymentBatchReviewed')
const paymentComReviewed = r => require.ensure([], () => r(require('@/components/social_security/social_security_pay_reviewed/PaymentComReviewed')), 'PaymentComReviewed')

/*
 * socialSecurityReport               --- 社保报表
 * monthlyPaymentNotice            --- 月缴费通知
 * EmployeeCostDetail              --- 雇员缴费明细
 * RefundDetails                   --- 退费明细
 */


const socialSecurityReport = r => require.ensure([], () => r(require('@/components/social_security/social_security_report/SocialSecurityReport')), 'SocialSecurityReport')
const monthlyPaymentNotice = r => require.ensure([], () => r(require('@/components/social_security/social_security_report/MonthlyPaymentNotice')), 'MonthlyPaymentNotice')
const employeeCostDetail = r => require.ensure([], () => r(require('@/components/social_security/social_security_report/EmployeeCostDetail')), 'EmployeeCostDetail')
const refundDetails = r => require.ensure([], () => r(require('@/components/social_security/social_security_report/RefundDetails')), 'RefundDetails')

/*
 * yearBaseApplicate               --- 年度基数申报
 */

const yearBaseApplicate = r => require.ensure([], () => r(require('@/components/social_security/year_base_applicate/YearBaseApplicate')), 'YearBaseApplicate')


/*
 * systemManage                    --- 系统管理
 */

const systemManage = r => require.ensure([], () => r(require('@/components/social_security/system_manage/SystemManage')), 'SystemManage')

export default [
  {
    path: '/employee_social_security_search',
    name:'employeeSocialSecuritySearch',
    component: employeeSocialSecuritySearch,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员社保查询",
      openNames:['1']
    }
  },
  {
    path: '/employee_social_security_info',
    name:'employeeSocialSecurityInfo',
    component: employeeSocialSecurityInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员社保基本信息",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_new',
    name:'companySocialSecurityNew',
    component: companySocialSecurityNew,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员社保办理",
      openNames:['1']
    }
  },
  {
    path: '/employee_social_security_task_info',
    name:'employeeSocialSecurityTaskInfo',
    component: employeeSocialSecurityTaskInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员社保查询",
      openNames:['1']
    }
  },

  {
    path: '/employee_operator_view',
    name:'employeeOperatorView',
    component: employeeOperatorView,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员日常操作",
      openNames:['1']
    }
  },
  {
    path: '/employee_commcial_operator',
    name:'employeeCommcialOperator',
    component: employeeCommcialOperator,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员日常操作",
      openNames:['1']
    }
  },

  {
    path: '/employee_special_operator_view',
    name: 'employeeSpecialOperatorView',
    component: employeeSpecialOperatorView,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员特殊操作",
      openNames:['1']
    },
  },
  {
    path: '/employee_special_progress_two',
    name: 'employeeSpecialProgressTwo',
    component: employeeSpecialProgressTwo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员特殊操作",
      openNames:['1']
    }
  },
  {
    path: '/employee_special_progress_three',
    name: 'employeeSpecialProgressThree',
    component: employeeSpecialProgressThree,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员特殊操作",
      openNames:['1']
    }
  },

  {
    path: '/emp_special_task_detail',
    name: 'empSpecialTaskDetail',
    component: empSpecialTaskDetail,
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
  {
    path: '/emp_task_handle7_view',
    name: 'empTaskHandle7View',
    component: empTaskHandle7View,
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
    path: '/emp_task_batch_handle7_view',
    name: 'empTaskBatchHandle7View',
    component: empTaskBatchHandle7View,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"雇员批量操作转出",
      openNames:['1']
    }
  },
  {
    path: '/company_task_list',
    name: 'companyTaskList',
    component: companyTaskList,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业任务单",
      openNames:['1']
    },
  },
  {
    path: '/company_task_progress_two',
    name: 'companyTaskProgressTwo',
    component: companyTaskProgressTwo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业任务单",
      openNames:['1']
    }
  },
  {
    path: '/company_task_progress_type_info',
    name: 'companyTaskProgressTypeInfo',
    component: companyTaskProgressTypeInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业任务单",
      openNames:['1']
    }
  },
  {
    path: '/company_task_progress_transfer_info',
    name: 'companyTaskProgressTransferInfo',
    component: companyTaskProgressTransferInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业任务单",
      openNames:['1']
    }
  },
  {
    path: '/company_task_progress_change_info',
    name: 'companyTaskProgressChangeInfo',
    component: companyTaskProgressChangeInfo,
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
    name: 'companyTaskProgressEndInfo',
    component: companyTaskProgressEndInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业任务单",
      openNames:['1']
    }
  },
  {
    path: '/open_account_info',
    name: 'openAccountInfo',
    component: openAccountInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/transfer_info',
    name: 'transferInfo',
    component: transferInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/change_info',
    name: 'changeInfo',
    component: changeInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/end_info',
    name: 'endInfo',
    component: endInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"查看",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_manage',
    name: 'companySocialSecurityManage',
    component: companySocialSecurityManage,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业社保账户管理",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security',
    name: 'companySocialSecurity',
    component: companySocialSecurity,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业社保账户管理",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_progress2',
    name: 'companySocialSecurityProgress2',
    component: companySocialSecurityProgress2,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业社保账户管理",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_type_info',
    name: 'companySocialSecurityTypeInfo',
    component: companySocialSecurityTypeInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业社保账户管理",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_change_info',
    name: 'companySocialSecurityChangeInfo',
    component: companySocialSecurityChangeInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业社保账户管理",
      openNames:['1']
    }
  },
  {
    path: '/company_social_security_end_info',
    name: 'companySocialSecurityEndInfo',
    component: companySocialSecurityEndInfo,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"企业社保账户管理",
      openNames:['1']
    }
  },

  {
    path: '/social_security_recon_cilate',
    name: 'socialSecurityReconcilate',
    component: socialSecurityReconcilate,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保对账",
      openNames:['1']
    }
  },
  {
    path: '/social_security_recon_cilate_detail',
    name: 'socialSecurityReconcilateDetail',
    component: socialSecurityReconcilateDetail,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保对账",
      openNames:['1']
    }
  },
  {
    path: '/social_security_emp_change_detail_yys',
    name: 'socialSecurityEmpChangeDetailYys',
    component: socialSecurityEmpChangeDetailYys,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保对账",
      openNames:['1']
    }
  },
  {
    path: '/social_security_emp_change_detail_gsy',
    name: 'socialSecurityEmpChangeDetailGsy',
    component: socialSecurityEmpChangeDetailGsy,
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
    name: 'paymentNotice',
    component: paymentNotice,
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
    name: 'socialSecurityReport',
    component: socialSecurityReport,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保报表",
      openNames:['1']
    }
  },
  {
    path: '/monthly_payment_notice',
    name: 'monthlyPaymentNotice',
    component: monthlyPaymentNotice,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保报表",
      openNames:['1']
    }
  },
  {
    path: '/employee_cost_detail',
    name: 'employeeCostDetail',
    component: employeeCostDetail,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保报表",
      openNames:['1']
    }
  },
  {
    path: '/refund_details',
    name: 'refundDetails',
    component: refundDetails,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"社保报表",
      openNames:['1']
    }
  },
  
  {
    path: '/year_base_applicate',
    name: 'yearBaseApplicate',
    component: yearBaseApplicate,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"年度基数申报",
      openNames:['1']
    }
  },

  {
    path: '/system_manage',
    name: 'systemManage',
    component: systemManage,
    meta:{
      level1:'全国社保',
      level2:"上海社保",
      level3:"系统管理",
      openNames:['1']
    }
  }
]
