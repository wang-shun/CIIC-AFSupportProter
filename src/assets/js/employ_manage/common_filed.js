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
  "h.service_center":"服务中心",
  "b.handle_type":"办理类型",
  "b.employ_operate_man":"用工操作员",
  "a.employee_nature":"人员性质",
  "a.created_time":"前端提交时间",
  "m.material_name":"材料名称",
  "b.employ_way":"用工方式",
  "e.settlement_area":"缴费区县",
  "b.employ_property":"用工属性",
  "b.employ_property":"用工材料批退日期",
  "c.doc_num":"档案编号",
  "c.yuliu_doc_num":"预留档案编号",
  "c.archive_place":"存档地",
  "c.employ_feedback_opt_date":"用工反馈操作日期",
  "c.ukey_borrow_date":"用工UKey外借日期",
  "c.ukey_return_date":"用工Ukey返回日期",
  
  "a.change":"是否翻牌",
};
let em_resign_chooseField = {
  "a.company_id":"公司编号",
  "h.title":"公司名称",
  "a.employee_id":"雇员编号",
  "d.employee_name":"雇员姓名",
  "d.id_num":"身份证号码",
  "h.service_center":"服务中心",
  "f.if_network":"网办",
  "a.created_time":"前道提交日期",
  "a.out_reason":"退工原因",
  "c.doc_num":"档案编号",
  "c.yuliu_doc_num":"预留档案编号",
  "b.employ_property":"用工属性",
  "f.resign_handle_date":"退工送办日期",
  "a.return_doc_date":"退档日期",
  "c.archive_place":"存档地",
  "f.resign_operate_man":"退工操作员",
  "f.cache_date":"暂存日期",
  "f.resign_feedback_date":"退工反馈操作日期",
  "f.job_centre_feedback_date":"退工成功日期",
  "e.settlement_area":"缴费区县",
  "f.ukey_borrow_date":"退工UKey外借日期",
  "f.ukey_return_date":"退工Ukey返回日期",
  "f.created_time":"退工材料任务单提交日期"
};
let em_arc_chooseField = {
  "a.company_id":"公司编号",
  "h.title":"公司名称",
  "a.employee_id":"雇员编号",
  "d.employee_name":"雇员姓名",
  "d.id_num":"身份证号码",
  "b.open_af_date":"开F单日期",
  "h.service_center":"服务中心",
  "b.handle_type":"办理类型",
  "b.employ_operate_man":"用工操作员",
  "b.employ_way":"用工方式",
  "e.settlement_area":"缴费区县",
  "b.employ_property":"用工属性",
  "e.settlement_area":"用工材料批退日期",
  "c.doc_num":"档案编号",
  "c.yuliu_doc_num":"预留档案编号",
  "c.archive_place":"存档地",
  "c.employ_feedback_opt_date":"用工反馈操作日期",
  "c.storage_date":"入库日期",
  "c.in_file_date":"进档日期",
  "c.storage_out_date":"出库日期",
  "c.manual_storage_date":"手册入库日期",
  "c.budiao_doc_man1":"补调档人1",
  "c.budiao_doc_man2":"补调档人2",
  "c.ukey_borrow_date":"用工UKey外借日期",
  "c.ukey_return_date":"用工Ukey返回日期",
  "f.ukey_borrow_date":"退工UKey外借日期",
  "f.ukey_return_date":"退工Ukey返回日期",
  "f.mail_doc_return_date":"寄回执日期",
  "w.out_reason":"退工原因",
  "c.storage_out_man":"出库人",
  "u.use_date":"档案材料借出日期",
  "f.if_network":"网办",
  "c.storage_out_date":"出库日期",
  "a.created_time":"前道提交日期",
  "w.out_reason":"退工原因",
  "w.resign_handle_date":"退工送办日期",
  "w.return_doc_date":"退档日期",
  "w.resign_material_delivery_date":"退工材料交付日期",
  "w.resign_operate_man":"退工操作员",
  "c.resign_return_date":"退工单返回日期",
  "c.resign_doc_date":"退工单并档日期",
  "f.cache_date":"暂存日期",
  "f.resign_feedback_date":"退工反馈操作日期",
  "f.job_centre_feedback_date":"退工成功日期",
  // "c.ukey_return_date":"邮寄方式",
  "c.post_letter_date":"寄信日期",
  // "c.ukey_return_date":"不寄信",
  // "c.ukey_return_date":"不寄退工单",
  // "c.ukey_return_date":"实际缴费日期",
  "e.settlement_area":"缴费区县",
  // "c.ukey_return_date":"退工材料任务单提交日期"
};
let ukey_chooseField = {
  "u.material_receive_date":"材料签收日期",
  "u.material_delivery_date":"材料送办日期",
  "u.material_feedback_date":"材料反馈日期",
  "u.company_name":"公司名称",
  "u.organization_code":"组织机构代码",
  "u.due_date":"到期日期",
  "u.logout_date":"注销日期",
  "u.key_type":"类别",
  "u.key_code":"编号",
  "u.key_pwd":"密码",
  "u.key_seq":"序列号",
  "u.key_fee":"收费标准"
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
let ukey_relationship = {
  "等于": "=",
  "大于": ">",
  "大于等于": ">=",
  "小于": "<",
  "小于等于": "<=",
  "类似于": "like",
  "不等于": "<>"
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

export {ukey_chooseField,ukey_relationship, em_chooseField, em_relationship, em_print, customerInfo, batchOperate,em_resign_chooseField,em_arc_chooseField}
