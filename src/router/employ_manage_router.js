/* ================== 雇佣管理 ================== */
/*
 * employmentDataManagementTaskList      --- 用工资料管理任务单
   employHandleEmployment                --- 办理用工
   employHandleEmploymentBatch           --- 批量办理用工
 * dismissalHandleTaskList               --- 退工办理任务单
   dismissalHandleEmployment             --- 退工档案任务单
 * recordComprehensiveHandling           --- 档案综合办理
   recordComprehensive                   --- 档案综合办理详细
   fileMatrialsUseAndBorrow              --- 档案材料利用与借出
 * recordMatch                           --- 档案配对
   matchImportFile                       --- 配对导入数据
 */

const employmentDataManagementTaskList = r => require.ensure([], () => r(require('@/components/employ_manage/EmploymentDataManagementTaskList')), 'employmentDataManagementTaskList');
const employHandleEmployment = r => require.ensure([], () => r(require('@/components/employ_manage/EmployHandleEmployment')), 'employHandleEmployment');
const employHandleEmploymentBatch = r => require.ensure([], () => r(require('@/components/employ_manage/EmployHandleEmploymentBatch')), 'employHandleEmploymentBatch');

const dismissalHandleTaskList = r => require.ensure([], () => r(require('@/components/employ_manage/DismissalHandleTaskList')), 'dismissalHandleTaskList');
const dismissalHandleEmployment = r => require.ensure([], () => r(require('@/components/employ_manage/DismissalHandleEmployment')), 'dismissalHandleEmployment');

const recordComprehensiveHandling = r => require.ensure([], () => r(require('@/components/employ_manage/RecordComprehensiveHandling')), 'recordComprehensiveHandling');
const recordComprehensive = r => require.ensure([], () => r(require('@/components/employ_manage/RecordComprehensive')), 'recordComprehensive');
const fileMatrialsUseAndBorrow = r => require.ensure([], () => r(require('@/components/employ_manage/FileMatrialsUseAndBorrow')), 'fileMatrialsUseAndBorrow');

const recordMatch = r => require.ensure([], () => r(require('@/components/employ_manage/RecordMatch')), 'recordMatch');
const matchImportFile = r => require.ensure([], () => r(require('@/components/employ_manage/MatchImportFile')), 'matchImportFile');

const independentCustomList = r => require.ensure([], () => r(require('@/components/employ_manage/IndependentCustomList')), 'independentCustomList');
const independentHandleCustom = r => require.ensure([], () => r(require('@/components/employ_manage/IndependentHandleCustom')), 'independentHandleCustom');

export default [
  {
    path: '/employment_data_management_task_list',
    name:'employmentDataManagementTaskList',
    component: employmentDataManagementTaskList,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"用工资料管理任务单",
      openNames:['3'],
      activeName: '3-1'
    }
  },
  {
    path: '/employ_handle_employment',
    name:'employHandleEmployment',
    component: employHandleEmployment,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"用工资料任务单",
      openNames:['3'],
      activeName: '3-1'
    }
  },

  {
    path: '/employ_handle_employment_batch',
    name:'employHandleEmploymentBatch',
    component: employHandleEmploymentBatch,
    meta:{
      level1:'雇佣管理',
      level2:"用工资料任务单批量办理",
      level3:"批理办理",
      openNames:['3'],
      activeName: '3-1'
    }
  },

  {
    path: '/dismissal_handle_task_list',
    name:'dismissalHandleTaskList',
    component: dismissalHandleTaskList,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"退工办理任务单",
      openNames:['3'],
      activeName: '3-2'
    }
  },
  {
    path: '/dismissal_handle_employment',
    name:'dismissalHandleEmployment',
    component: dismissalHandleEmployment,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"退工档案任务单",
      openNames:['3'],
      activeName: '3-2'
    }
  },

  {
    path: '/record_comprehensive_handling',
    name:'recordComprehensiveHandling',
    component: recordComprehensiveHandling,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"档案综合办理",
      openNames:['3'],
      activeName: '3-3'
    }
  },
  {
    path: '/record_comprehensive',
    name:'recordComprehensive',
    component: recordComprehensive,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"档案综合办理",
      openNames:['3'],
      activeName: '3-3'
    }
  },
  {
    path: '/file_matrials_use_and_borrow',
    name:'fileMatrialsUseAndBorrow',
    component: fileMatrialsUseAndBorrow,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"档案材料利用与借出",
      openNames:['3'],
      activeName: '3-3'
    }
  },

  {
    path: '/record_match',
    name:'recordMatch',
    component: recordMatch,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"档案配对",
      openNames:['3']
    }
  },
  {
    path: '/match_import_file',
    name:'matchImportFile',
    component: matchImportFile,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"档案配对",
      openNames:['3'],
      activeName: '3-4'
    }
  },
  {
    path: '/independent_handle_task_list',
    name:'independentCustomList',
    component: independentCustomList,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"独立户客户管理",
      openNames:['3'],
      activeName: '3-5'
    }
  },
  {
    path: '/independent_handle_custom',
    name:'independentHandleCustom',
    component: independentHandleCustom,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"独立账户维护表单",
      openNames:['3'],
      activeName: '3-5'
    }
  },
]
