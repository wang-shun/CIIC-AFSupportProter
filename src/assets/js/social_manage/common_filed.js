/**
 * Created by huangye on 2018/1/8.
 */
let em_chooseField = {
  "c.company_id":"客户编号",
  "e.employee_id":"雇员编号",
  "ca.ss_account":"企业社保账户",
  "e.id_num":"证件号",
  "et.start_month":"社保起缴月份",
  "et.end_month":"缴纳至",
  "et.service_center_id":"服务中心",
  "et.leader_ship_name":"客服经理",
  "et.task_category":"任务单类型",
  "ca.ss_account_type":"社保账户类型",
  "c.title":"客户名称",
  "e.employee_name":"雇员姓名",
  "ca.settlement_area":"结算区县",
  "taskStatus":"未处理",
};
let em_relationship = {
  "等于": "=",
  "大于": ">",
  "大于等于": ">=",
  "小于": "<",
  "小于等于": "<=",
  "不等于": "<>",
  "类似于": "like",
  "为空": "is null"
};
let em_print = ["用工录用名册打印", "派谴录用名册打印", "外来独立", "外来派谴", "采集表汇总表", "打印批退材料签收单"];

let customerInfo = {
  customerNumber: "340078",
  customerName: "上海XX信息技术有限公司",
  employeeNumber: "GY001",
  employeeName: "张三",
  reservedFileNumber: "YY0001",
  IdNumber: "35220219781124114",
  fileNumber: "10001"
};

let batchOperate = ["退材料交付日期", "转移备注", "转移方式", "退工反馈", "退工反馈2", "退档日期", "档案转出方向", "档案转出日期", "手册转出日期", "公司集体转出方向", "网办", "劳动手册是否交被退人员", "已交", "未交", "职介反馈日期", "打印退工单", "UKey外借日期", "UKey返回日期"];

export {em_chooseField, em_relationship, em_print, customerInfo, batchOperate}
