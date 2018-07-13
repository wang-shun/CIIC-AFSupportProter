/**
 * 市场活动新增、修改表单校验
 * @type {{activityTitle: *[], publisher: *[], giftForm: *[], sendWay: *[], marketTime: *[], status: *[], content: *[]}}
 */
export const marketValidate = {
  activityTitle: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请输入活动主题', trigger: 'blur'}
  ],
  publisher: [
    {required: true, pattern: /[^\s]+/, message: '请输入发布人', trigger: 'change'}
  ],
  giftForm: [
    {required: true, type: 'array', min: 1, message: '请选择礼品形式', trigger: 'change'},
    /*{
      validator(rule, val, callback) {
        if (!val || val.length === 0) {
          callback(new Error('请选择礼品形式'))
        } else {
          callback()
        }
      },
      required: true,
      trigger: 'change'
    }*/
  ],
  sendWay: [
    {required: true, type: 'array', min: 1, message: '请选择派送方式', trigger: 'change'},
  ],
  marketTime: [
    {
      validator(rule, val, callback) {
        if (!val || val.length !== 2 || val[0] === null || val[0] === '') {
          callback(new Error('请选择活动时间'))
        } else {
          callback()
        }
      },
      required: true,
      trigger: 'change'
    }
  ],
  status: [
    {required: true, message: '请选择状态', trigger: 'change'}
  ],
  content: [
    {required: true, pattern: /^.*[^\s]+.*$/, message: '请输入详细内容', trigger: 'blur'},
    {required: true, type: 'string', max: 200, message: '200字以内', trigger: 'blur'}
  ],
};
