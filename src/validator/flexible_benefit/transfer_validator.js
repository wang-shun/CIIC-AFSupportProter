/**
 * 医疗关系转移新增表单校验
 * @type {{employeeId: *[], turnOutDate: *[], turnOutAddress: *[], turnBackDate: *[]}}
 */
export const transferValidator = {
  employeeId: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请输入雇员编号', trigger: 'blur'}
  ],
  turnOutDate: [
    {required: true, type: 'date', message: '请选择转出日期', trigger: 'change'}
  ],
  turnOutAddress: [
    {required: true, message: '请选择转出地点', trigger: 'change'}
  ],
  turnBackDate: [
    {required: true, type: 'date', message: '请选择转回日期', trigger: 'change'}
  ],
};
