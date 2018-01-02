import Utils from "../lib/utils";

const leftNavigationList = params => Utils.promise({
  data: {
    code: 200,
    data: [
      {
        id: 1,
        key: "上海社保",
        icon: "umbrella",
        children: [
          {cid: "1-1", ckey: "雇员社保查询", crouter: "employeesocialsecuritysearch"},
          {cid: "1-2", ckey: "雇员日常操作", crouter: "employeeoperatorview"},
          {cid: "1-3", ckey: "雇员特殊操作", crouter: "employeespecialoperatorview"},
          {cid: "1-4", ckey: "企业任务单", crouter: "companytasklist"},
          {cid: "1-5", ckey: "企业社保账户管理", crouter: "companysocialsecuritymanage"},
          {cid: "1-6", ckey: "社保对账", crouter: "socialsecurityreconcilate"},
          {cid: "1-7", ckey: "社保支付", crouter: "socialSecurityPay"},
          {cid: "1-8", ckey: "社保报表", crouter: "socialsecurityreport"},
          {cid: "1-9", ckey: "年度基数申报", crouter: "yearbaseapplicate"},
          {cid: "1-10", ckey: "系统管理", crouter: "systemmanage"},
        ]
      },
      {
        id: 2,
        key: "上海公积金",
        icon: "stats-bars",
        children: [
          {cid: "2-1", ckey: "雇员公积金查询", crouter: "employeefundsearch"},
          {cid: "2-2", ckey: "雇员日常操作", crouter: "employeefundcommonoperator"},
          {cid: "2-3", ckey: "雇员特殊操作", crouter: "employeefundspecialoperator"},
          {cid: "2-4", ckey: "企业任务单", crouter: "companyfundtasklist"},
          {cid: "2-5", ckey: "企业公积金账户查询", crouter: "companyfundaccountsearch"},
          {cid: "2-6", ckey: "公积金对账", crouter: "fundreconciliation"},
          {cid: "2-7", ckey: "公积金汇缴支付", crouter: "fundpay"},
          {cid: "2-8", ckey: "公积金报表", crouter: "fundreport"},
          {cid: "2-9", ckey: "公积金年调", crouter: "fundyearadjust"},
        ]
      },
      {
        id: 3,
        key: "雇佣管理",
        icon: "ios-people-outline",
        children: []
      },
      {
        id: 4,
        key: "证件管理",
        icon: "card",
        children: []
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
      {
        id: 8,
        key: "弹性福利",
        icon: "coffee",
        children: [
          {cid: "8-1", ckey: "礼品管理", crouter: "giftApplicationManager"},
          {cid: "8-2", ckey: "市场活动管理", crouter: "marketActivitiesManager"},
          {cid: "8-3", ckey: "发放管理", crouter: "grantManager"},
          {cid: "8-4", ckey: "报表查询", crouter: "reportFormManager"}
        ]
      },
      {
        id: 9,
        key: "健康医疗",
        icon: "ios-medkit-outline",
        children: [
          {cid: "9-1", ckey: "待处理任务", crouter: "pendingTaskList"},
          {cid: "9-2", ckey: "已处理任务", crouter: "processedTaskList"},
          {cid: "9-3", ckey: "补充医疗理赔", crouter: "acceptanceList"},
          {cid: "9-4", ckey: "未投保审核", crouter: "uninsuredReview"},
          {cid: "9-5", ckey: "医疗关系转移", crouter: "relationshipTransfer"},
          {cid: "9-6", ckey: "在保管理", crouter: "insuredList"},
          {cid: "9-7", ckey: "保单号管理", crouter: "policyNumManagement"},
          {cid: "9-8", ckey: "保单管理", crouter: "policyManagement"},
          {cid: "9-9", ckey: "代收代付", crouter: "collectionPayment"}
        ]
      }
    ]
  }
})

export default {
  leftNavigationList,
}
