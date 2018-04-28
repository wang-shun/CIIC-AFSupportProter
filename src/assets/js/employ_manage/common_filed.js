/**
 * Created by huangye on 2018/1/8.
 */
//let em_chooseField = ["公司编号", "公司名称", "雇员编号", "雇员姓名", "身份证号码", "开F单日期", "服务中心", "办理类型", "用工操作员", "用工方式", "缴费区县", "用工属性", "用工材料批退日期", "档案编号", "预留档案编号", "存档地", "用工反馈操作日期", "档案操作员", "入库日期", "出库日期", "手册入库日期", "补调档案1", "补调档案2", "UKey外借日期", "UKey返回日期", "高校调档日期", "寄回执日期", "修改档案编号提交日期", "完成改号日期", "前道提交退工任务单日期", "退工原因", "出库人", "档案材料借出日期", "档案材料借阅日期"];
let em_chooseField = {
  "a.company_id":"公司编号",
  "h.title":"公司名称",
  "a.employee_id":"雇员编号",
  "d.employee_name":"雇员姓名",
  "d.id_num":"身份证号码",
  "b.open_af_date":"开F单日期",
  "b.handle_type":"办理类型",
  "b.employ_operate_man":"用工操作员",
  "b.employ_way":"用工方式",
  "b.employ_property":"用工属性",
  "c.doc_num":"档案编号",
  "c.yuliu_doc_num":"预留档案编号",
  "a.change":"是否翻盘",
  "c.archive_place":"存档地",
  "c.employ_feedback_opt_date":"用工反馈操作日期",
  "c.storage_date":"入库日期",
  "c.storage_out_date":"出库日期",
  "c.manual_storage_date":"手册入库日期",
  "c.budiao_doc_man1":"补调档人1",
  "c.budiao_doc_man2":"补调档人2",
  "c.ukey_borrow_date":"UKey外借日期",
  "c.ukey_return_date":"Ukey返回日期",
  "a.resign_reason":"退工原因",
  "c.storage_out_man":"出库人",
  "g.use_date":"档案材料借出日期",
  "h.service_center":"服务中心"
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
