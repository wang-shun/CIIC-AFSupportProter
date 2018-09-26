/**
 * Created by huangye on 2018/1/8.
 */
let em_chooseField = {
  // "processStatus":"未处理",
  "sc.company_id":"客户编号",
  "sc.title":"客户名称",
  "ee.employee_id":"雇员编号",
  "ee.employee_name":"雇员姓名",
  "het.task_category":"任务单类型",
  "hcas.payment_bank":"缴费银行",
  "het.hf_type":"公积金类型",
  "hcas.hf_account_type":"企业账户类型",
  "af_ec.status":"是否终止",
  "ee.id_num":"证件号",
  "het.submit_time":"任务发起时间",
  "hcac.hf_com_account":"企业公积金账号",
  "het.is_change":"是否更正",
  "preInput":"是否已预录入公积金账号",
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
