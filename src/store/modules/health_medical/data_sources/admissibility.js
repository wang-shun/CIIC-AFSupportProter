/**
 * 款项类型
 * @type {[null,null,null,null,null,null,null]}
 */
const moneyTypes = [
  {
    value: '1', label: '医疗费'
  },
  {
    value: '2', label: '体检费用'
  },
  {
    value: '3', label: '住院补贴'
  },
  {
    value: '4', label: '大额理赔款'
  },
  {
    value: '5', label: '其他'
  }
];
/**
 * 受理类型
 * @type {[null,null,null]}
 */
const caseTypes = [
  {
    value: '1', label: '雇员'
  },
  {
    value: '2', label: '子女'
  },
  {
    value: '3', label: '配偶'
  }
];
/**
 * 未投保医疗
 * 受理单状态
 * @type {[null,null,null,null,null,null,null,null,null]}
 */
const statusProperties = [
  {
    value: '0', label: '未受理'
  },
  {
    value: '1', label: '已受理'
  },
  {
    value: '2', label: '拒赔'
  },
  {
    value: '3', label: '已审核未同步'
  },
  {
    value: '4', label: '已同步未支付'
  },
  {
    value: '5', label: '财务退回'
  },
  {
    value: '6', label: '已同步已支付'
  },
  {
    value: '7', label: '已退票'
  },
  {
    value: '8', label: '已完成'
  }
];

/**
 * 受理单状态
 * @param status
 * @returns {string}
 */
function statusToChina(status) {
  switch (status) {
    case 0:
      return "未受理";
      break;
    case 1:
      return "已受理";
      break;
    case 2:
      return "拒赔";
      break;
    case 3:
      return "已审核未同步";
      break;
    case 4:
      return "已同步未支付";
      break;
    case 5:
      return "财务退回";
      break;
    case 6:
      return "已同步已支付";
      break;
    case 7:
      return "已退票";
      break;
    case 8:
      return "已完成";
      break;
  }
}

/**
 * 款项类型table显示
 * @param status
 * @returns {string}
 */
function moneyTypeToChina(status) {
  switch (status) {
    case 1:
      return "医疗费";
      break;
    case 2:
      return "体检费用";
      break;
    case 3:
      return "住院补贴";
      break;
    case 4:
      return "大额理赔款";
      break;
    case 5:
      return "其他";
      break;
  }
}

/**
 * 受理类型table显示
 * @param status
 * @returns {string}
 */
function caseTypeToChina(status) {
  if (status === 1) {
    return "雇员";
  } else if (status === 2) {
    return "子女";
  } else if (status === 3) {
    return "配偶";
  }
}

/**
 * 受理单拒赔类型
 * @type {[null,null,null,null]}
 */
const rejectTypes = [
  {
    value: '1', label: '退员工'
  },
  {
    value: '2', label: '退客户'
  },
  {
    value: '3', label: '作废'
  },
  {
    value: '4', label: '其他'
  },
];


/**
 * 新增受理单表单校验
 */
const addAcceptanceRules = {
  // surrenderDate: [
  //   {required: true, type: 'date', message: '请选择退保日期', trigger: 'change'}
  // ],
  // dimissionDate: [
  //   {required: true, type: 'date', message: '请选择中止日期', trigger: 'change'}
  // ],
  // jointPersonBirthDate: [
  //   {required: true, type: 'date', message: '请选择连带人出生日期', trigger: 'change'}
  // ],
  moneyType: [
    {required: true, message: '请选择款项类型', trigger: 'change'}
  ],
  caseType: [
    {required: true, message: '请选择受理类型', trigger: 'change'}
  ],
  // jointPersonName: [
  //   {required: true, message: '请选择连带人', trigger: 'change'}
  // ],
  caseMoney: [
    {required: true, type: 'number', message: '请输入受理金额', trigger: 'change'}
  ],
  invoiceNumber: [
    {required: true, type: 'integer', message: '请输入发票张数', trigger: 'change'}
  ],
  medicalRemark: [
    {type: 'string', max: 66, message: '字段太长', trigger: 'blur'}
  ],
};

/**
 * 未投保审核
 * 付款方式
 * @type {*[]}
 */
const payTypes = [
  {
    value: '1', label: '打卡'
  },
];

/**
 * 付款方式table显示
 * @param status
 * @returns {string}
 */
function payTypeToChina(status) {
  if (status === 1) {
    return "打卡";
  }
}

/**
 * 未投保审核表单校验
 */
const uninsuredReviewDealRules = {
  diagnoseDate: [
    {required: true, type: 'date', message: '请选择就诊日期', trigger: 'change'}
  ],
  hospitalizationStartDate: [
    {required: true, type: 'date', message: '请选择住院开始日期', trigger: 'change'}
  ],
  hospitalizationEndDate: [
    {required: true, type: 'date', message: '请选择住院结束日期', trigger: 'change'}
  ],
  clinicHospital: [
    {required: true, message: '请输入就诊医院', trigger: 'change'},
    {type: 'string', max: 16, message: '字段太长', trigger: 'blur'},
  ],
  acceptAmount: [
    {required: true, type: 'number', message: '请输入受理金额', trigger: 'change'}
  ],
  payType: [
    {required: true, message: '请选择付款方式', trigger: 'change'}
  ],
  diagnose: [
    {required: true, message: '请输入诊断', trigger: 'change'},
    {type: 'string', max: 16, message: '字段太长', trigger: 'blur'},
  ],
  hospitalizationDays: [
    {required: true, type: 'integer', message: '请输入住院天数', trigger: 'change'}
  ],
  auditAmount: [
    {required: true, type: 'number', message: '请输入审核金额', trigger: 'change'}
  ],
  remark: [
    {type: 'string', max: 66, message: '字段太长', trigger: 'blur'},
  ],
  attachment: [
    {
      required: true,
      validator(rule, val, callback) {
        if (val === null) {
          callback(new Error('请上传附件'))
        } else {
          callback()
        }
      },
      trigger: 'change'
    },
  ],
};

/**
 * 雇员状态
 * @param status
 * @returns {*}
 */
function employeeStatusProperties(status) {
  switch (status) {
    case 0:
      return "预录用";
      break;
    case 1:
      return "雇员信息确认中";
      break;
    case 2:
      return "在职";
      break;
    case 3:
      return "离职";
      break;
  }
}

/**
 * 健康医疗公共数据
 * 下拉框
 */

export default {
  moneyTypes,
  caseTypes,
  statusProperties,
  statusToChina,
  moneyTypeToChina,
  caseTypeToChina,
  rejectTypes,
  addAcceptanceRules,
  payTypes,
  payTypeToChina,
  uninsuredReviewDealRules,
  employeeStatusProperties,
};
