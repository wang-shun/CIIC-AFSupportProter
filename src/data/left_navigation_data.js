const leftNavigation =
  [
    {
      id: 1,
      key: "上海社保",
      icon: "umbrella",
      children: [
        {cid: "1-1", ckey: "雇员社保查询", crouter: "employeeSocialSecuritySearch"},
        {cid: "1-2", ckey: "雇员日常操作", crouter: "employeeOperatorView"},
        {cid: "1-3", ckey: "企业任务单", crouter: "companyTaskList"},
        {cid: "1-4", ckey: "企业社保账户管理", crouter: "companySocialSecurityManage"},
        {cid: "1-5", ckey: "社保对账", crouter: "socialSecurityReconCilate"},
        {cid: "1-6", ckey: "社保支付", crouter: "socialSecurityPay"},
        {cid: "1-7", ckey: "社保支付审核", crouter: "paymentBatchReviewed"},
        {cid: "1-8", ckey: "社保报表", crouter: "socialSecurityReport"},
        {cid: "1-9", ckey: "年调雇员工资收集表下载", crouter: "annualadjustemployee"},
        {cid: "1-10", ckey: "年调雇员工资信息管理", crouter: "annualadjustcompany"},  // 年调雇员工资信息管理
        {cid: "1-11", ckey: "导出申报表", crouter: "annualadjustaccount"},  // 导出申报表
        {cid: "1-12", ckey: "权限管理", crouter: "authorityList"},  // 权限管理
        // {cid: "1-11", ckey: "系统管理", crouter: "systemManage"},
        // {cid: "1-3", ckey: "雇员特殊操作", crouter: "employeeSpecialOperatorView"},
      ]
    },
    {
      id: 2,
      key: "上海公积金",
      icon: "stats-bars",
      children: [
        {cid: "2-1", ckey: "雇员公积金查询", crouter: "employeeFundSearch"},
        {cid: "2-2", ckey: "雇员日常操作", crouter: "employeeFundCommonOperator"},
        {cid: "2-3", ckey: "雇员转移操作", crouter: "employeeFundTransferOperator"},
        {cid: "2-4", ckey: "企业任务单", crouter: "companyFundTaskList"},
        {cid: "2-5", ckey: "企业公积金账户查询", crouter: "companyFundAccountSearch"},
        {cid: "2-6", ckey: "公积金对账", crouter: "fundReconciliation"},
        {cid: "2-7", ckey: "公积金汇缴支付", crouter: "fundPay"},
        {cid: "2-8", ckey: "公积金报表", crouter: "fundReport"},
        {cid: "2-9", ckey: "权限管理", crouter: "hfauthorityList"},  // 权限管理
        // {cid: "2-10", ckey: "公积金年调", crouter: "fundYearAdjust"},
        // {cid: "2-3", ckey: "雇员特殊操作", crouter: "employeeFundSpecialOperator"},
      ]
    },
    {
      id: 3,
      key: "雇佣管理",
      icon: "ios-people-outline",
      children: [
        {cid: "3-1", ckey: "用工资料管理任务单", crouter: "employmentDataManagementTaskList"},
        {cid: "3-2", ckey: "退工办理任务单", crouter: "dismissalHandleTaskList"},
        {cid: "3-3", ckey: "档案综合办理", crouter: "recordComprehensiveHandling"},
        {cid: "3-5", ckey: "独立户客户管理", crouter: "independentCustomList"},
        {cid: "3-6", ckey: "档案预增管理", crouter: "advanceFileList"},
        {cid: "3-7", ckey: "Ukey管理", crouter: "UkeyManageList"},
        // {cid: "3-4", ckey: "档案配对", crouter: "recordMatch"}
      ]
    },
    {
      id: 4,
      key: "证件管理",
      icon: "card",
      children: [
        {cid: '4-1', ckey: '雇员证件办理', crouter: 'empList'},
        {cid: '4-2', ckey: '客户数据维护', crouter: 'companyList'},
        {cid: '4-3', ckey: '办理机构政策维护', crouter: 'orgPolicyList'}
      ]
    },
    {
      id: 5,
      key: "弹性福利",
      icon: "coffee",
      children: [
        {cid: "5-1", ckey: "礼品管理", crouter: "giftApplicationManager"},
        {cid: "5-2", ckey: "市场活动管理", crouter: "marketActivitiesManager"},
        {cid: "5-3", ckey: "发放管理", crouter: "grantManager"},
        {cid: "5-4", ckey: "报表查询", crouter: "reportFormManager"}
      ]
    },
    {
      id: 6,
      key: "健康医疗",
      icon: "ios-medkit-outline",
      children: [
        {cid: "6-1", ckey: "待处理任务", crouter: "pendingTaskList"},
        {cid: "6-2", ckey: "已处理任务", crouter: "processedTaskList"},
        {cid: "6-3", ckey: "补充医疗理赔", crouter: "supplementaryMedicalList"},
        {cid: "6-4", ckey: "受理单列表", crouter: "acceptanceList"},
        {cid: "6-5", ckey: "未投保审核", crouter: "uninsuredReview"},
        {cid: "6-6", ckey: "医疗关系转移", crouter: "relationshipTransfer"},
        {cid: "6-7", ckey: "在保管理", crouter: "insuredList"},
        // {cid: "6-8", ckey: "保单号管理", crouter: "policyNumManagement"},
        // {cid: "6-9", ckey: "保单管理", crouter: "policyManagement"},
        // {cid: "6-10", ckey: "代收代付", crouter: "collectionPayment"}
      ]
    },
    // {
    //   id: 3,
    //   key: "任务单管理",
    //   icon: "stats-bars",
    //   children: [
    //     {cid: "3-1", ckey: "待处理任务单列表", crouter: "pendingTaskList"},
    //     {cid: "3-2", ckey: "已处理任务单列表", crouter: "processedTaskList"}
    //   ]
    // },
    // {
    //   id: 4,
    //   key: "补充医疗理赔",
    //   icon: "stats-bars",
    //   children: [
    //     {cid: "4-1", ckey: "补充医疗理赔", crouter: "supplementaryMedicalList"}
    //   ]
    // },
    // {
    //   id: 5,
    //   key: "未投保医疗",
    //   icon: "stats-bars",
    //   children: [
    //     {cid: "5-1", ckey: "受理单列表", crouter: "acceptanceList"},
    //     {cid: "5-2", ckey: "未投保审核列表", crouter: "acceptanceAuditList"},
    //     {cid: "5-3", ckey: "医疗关系转移", crouter: "medicalRelationTransform"}
    //   ]
    // },
    // {
    //   id: 6,
    //   key: "在保管理",
    //   icon: "stats-bars",
    //   children: [
    //     {cid: "6-1", ckey: "在保管理", crouter: "insuredList"}
    //   ]
    // },
    // {
    //   id: 7,
    //   key: "保单管理",
    //   icon: "stats-bars",
    //   children: [
    //     {cid: "7-1", ckey: "保单号管理", crouter: "InsurancePolicyNumList"},
    //     {cid: "7-1", ckey: "保单管理", crouter: "InsurancePolicyList"},
    //     {cid: "7-1", ckey: "代收代付", crouter: "AgentBusinessList"}
    //   ]
    // },
  ];

export default leftNavigation
