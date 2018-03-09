/**
 * 医疗关系转移新增表单校验
 * @type {{employeeId: *[], turnOutDate: *[], turnOutAddress: *[], turnBackDate: *[]}}
 */
export const transferValidator = {
  employeeId: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请输入雇员编号', trigger: 'blur'}
  ],
  companyId: [
    {required: true, message: '请输入公司编号', trigger: 'blur'}
  ],
  turnOutDate: [
    {required: true, type: 'date', message: '请选择转出日期', trigger: 'change'}
  ],
  turnOutAddress: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请选择转出地点', trigger: 'change'}
  ],
  turnBackDate: [
    {required: true, type: 'date', message: '请选择转回日期', trigger: 'change'}
  ],
};

export const reimbursementValidator = {
  employeeId: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请输入雇员编号', trigger: 'blur'}
  ],
  companyId: [
    {required: true, message: '请输入公司编号', trigger: 'blur'}
  ],
  caseMoney: [
    {type: 'number', message: '请输入正确的金额', trigger: 'blur'}
  ],
  invoiceNumber: [
    {type: 'integer', message: '请输入整数', trigger: 'blur'}
  ],
  medicalClearingMoney: [
    {type: 'number', message: '请输入正确的金额', trigger: 'blur'}
  ],
  /*medicalRemark: [
    {type: 'number', message: '请选择转回日期', trigger: 'blur'}
  ],
  medicalCle1aringFeedBack: [
    {type: 'date', message: '请选择转回日期', trigger: 'blur'}
  ],*/

};
