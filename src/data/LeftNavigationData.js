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
          {cid: "1-7", ckey: "社保支付", crouter: "socialsecuritypay"},
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
      }
    ]
  }
})

export default {
  leftNavigationList,
}
