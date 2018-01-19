/* ================== 雇佣管理 ================== */
/*
 * employmentDataManagementTaskList      --- 用工资料管理任务单
   employHandleEmployment                --- 办理用工
 * dismissalHandleTaskList               --- 退工办理任务单
   dismissalHandleEmployment             --- 退工档案任务单
 * recordComprehensiveHandling           --- 档案综合办理
   recordComprehensive                   --- 档案综合办理详细
   fileMatrialsUseAndBorrow              --- 档案材料利用与借出
 * recordMatch                           --- 档案配对
   matchImportFile                       --- 配对导入数据
 */

const employmentDataManagementTaskList = r => require.ensure([], () => r(require('@/components/employ_manage/EmploymentDataManagementTaskList')), 'EmploymentDataManagementTaskList');
const employHandleEmployment = r => require.ensure([], () => r(require('@/components/employ_manage/employHandleEmployment')), 'employHandleEmployment');

const dismissalHandleTaskList = r => require.ensure([], () => r(require('@/components/employ_manage/DismissalHandleTaskList')), 'DismissalHandleTaskList');
const dismissalHandleEmployment = r => require.ensure([], () => r(require('@/components/employ_manage/DismissalHandleEmployment')), 'DismissalHandleEmployment');

const recordComprehensiveHandling = r => require.ensure([], () => r(require('@/components/employ_manage/RecordComprehensiveHandling')), 'RecordComprehensiveHandling');
const recordComprehensive = r => require.ensure([], () => r(require('@/components/employ_manage/RecordComprehensive')), 'RecordComprehensive');
const fileMatrialsUseAndBorrow = r => require.ensure([], () => r(require('@/components/employ_manage/FileMatrialsUseAndBorrow')), 'FileMatrialsUseAndBorrow');

const recordMatch = r => require.ensure([], () => r(require('@/components/employ_manage/RecordMatch')), 'RecordMatch');
const matchImportFile = r => require.ensure([], () => r(require('@/components/employ_manage/MatchImportFile')), 'MatchImportFile');

export default [
  {
    path: '/employment_data_management_task_list',
    name:'employmentDataManagementTaskList',
    component: employmentDataManagementTaskList,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"用工资料管理任务单",
      openNames:['3']
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
    path: '/dismissal_handle_task_list',
    name:'dismissalHandleTaskList',
    component: dismissalHandleTaskList,
    meta:{
      level1:'首页',
      level2:"雇佣管理",
      level3:"退工办理任务单",
      openNames:['3']
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
      openNames:['3']
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
  }
]
