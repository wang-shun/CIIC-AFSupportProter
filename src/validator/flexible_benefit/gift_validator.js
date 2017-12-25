/**
 * 礼品新增、修改表单校验
 * @type {{giftName: *[], price: *[], rightPerson: *[], giftType: *[], number: *[], applyMaxnum: *[], status: *[], remarks: *[]}}
 */
export const giftValidator = {
  giftName: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请输入礼品名称', trigger: 'blur'}
  ],
  price: [
    {
      required: true,
      pattern: /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/,
      message: '请输入价格,两位小数',
      trigger: 'change'
    }
  ],
  rightPerson: [
    {required: true, message: '请选择适用人群', trigger: 'change'}
  ],
  giftType: [
    {required: true, message: '请选择礼品类型', trigger: 'change'}
  ],
  number: [
    {type: 'integer', required: true, message: '请输入礼品数量', trigger: 'change'}
  ],
  applyMaxnum: [
    {type: 'integer', required: true, message: '请输入最大申请数', trigger: 'change'}
  ],
  status: [
    {required: true, message: '请选择礼品状态', trigger: 'change'}
  ],
  remarks: [
    {
      validator(rule, val, callback) {
        if (val.length >= 200) {
          callback(new Error('不超过200字'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
};
