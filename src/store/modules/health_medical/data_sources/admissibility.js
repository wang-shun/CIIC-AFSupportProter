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
    // {required: true, message: '请输入就诊医院', trigger: 'change'},
    {type: 'string', max: 16, message: '字段太长', trigger: 'blur'},
  ],
  acceptAmount: [
    {required: true, type: 'number', message: '请输入受理金额', trigger: 'change'}
  ],
  payType: [
    {required: true, message: '请选择付款方式', trigger: 'change'}
  ],
  diagnose: [
    // {required: true, message: '请输入诊断', trigger: 'change'},
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

function getUninsuredObj(row) {
  let head = `<html><head>
          <style type="text/css">
              .headStyle h2, h3 {
                  display: inline;
              }
          </style>
      </head><body>`;
        let foot = `</body><script>
          function convertCurrency(money) {
              //汉字的数字
              let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
              //基本单位
              let cnIntRadice = ['', '拾', '佰', '仟'];
              //对应整数部分扩展单位
              let cnIntUnits = ['', '万', '亿', '兆'];
              //对应小数部分单位
              let cnDecUnits = ['角', '分', '毫', '厘'];
              //整数金额时后面跟的字符
              let cnInteger = '整';
              //整型完以后的单位
              let cnIntLast = '元';
              //最大处理的数字
              let maxNum = 999999999999999.9999;
              //金额整数部分
              let integerNum;
              //金额小数部分
              let decimalNum;
              //输出的中文金额字符串
              let chineseStr = '';
              //分离金额后用的数组，预定义
              let parts;
              if (money === '') {
                  return '';
              }
              money = parseFloat(money);
              if (money >= maxNum) {
                  //超出最大处理数字
                  return '';
              }
              if (money === 0) {
                  chineseStr = cnNums[0] + cnIntLast + cnInteger;
                  return chineseStr;
              }
              //转换为字符串
              money = money.toString();
              if (money.indexOf('.') === -1) {
                  integerNum = money;
                  decimalNum = '';
              } else {
                  parts = money.split('.');
                  integerNum = parts[0];
                  decimalNum = parts[1].substr(0, 4);
              }
              //获取整型部分转换
              if (parseInt(integerNum, 10) > 0) {
                  let zeroCount = 0;
                  let IntLen = integerNum.length;
                  for (let i = 0; i < IntLen; i++) {
                      let n = integerNum.substr(i, 1);
                      let p = IntLen - i - 1;
                      let q = p / 4;
                      let m = p % 4;
                      if (n === '0') {
                          zeroCount++;
                      } else {
                          if (zeroCount > 0) {
                              chineseStr += cnNums[0];
                          }
                          //归零
                          zeroCount = 0;
                          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                      }
                      if (m === 0 && zeroCount < 4) {
                          chineseStr += cnIntUnits[q];
                      }
                  }
                  chineseStr += cnIntLast;
              }
              //小数部分
              if (decimalNum !== '') {
                  let decLen = decimalNum.length;
                  for (let i = 0; i < decLen; i++) {
                      let n = decimalNum.substr(i, 1);
                      if (n !== '0') {
                          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                      }
                  }
              }
              if (chineseStr === '') {
                  chineseStr += cnNums[0] + cnIntLast + cnInteger;
              } else if (decimalNum === '') {
                  chineseStr += cnInteger;
              }
              return chineseStr;
          }
      
          let auditAmountUpper = document.getElementById('auditAmountUpper');
          let auditAmount = document.getElementById('auditAmount');
          auditAmountUpper.innerHTML = convertCurrency(auditAmount.innerHTML)
      </script></html>`;
  let obj =
    `<div>
            <div class="headStyle" style="border-bottom: 1px solid black;width: 200px;margin-bottom: 30px;">
                <h2>CIIC</h2>
                <h3>A1606056</h3>
            </div>
            <div>
                <table border="1" cellspacing="0" style="text-align: center;">
                    <tr>
                        <td>
                            收款人<br>
                            公司编号<br>
                            公司名称
                        </td>
                        <td>
                            ${row.employeeName} 雇员编号:${row.employeeId}<br>
                            ${row.companyId}<br>
                            ${row.companyName}
                        </td>
                    </tr>
                    <tr>
                        <td>付款方式</td>
                        <td style="color: red">现金</td>
                    </tr>
                    <tr>
                        <td>付款地区</td>
                        <td style="color: red">中国</td>
                    </tr>
                    <tr>
                        <td>金额</td>
                        <td>
                            人民币 <span id="auditAmountUpper"></span>（大写）<br>
                            ￥ <span id="auditAmount">${row.auditAmount}</span>
                        </td>
                    </tr>
                </table>
                <p>说明：${row.remark}</p>

            </div>
            <div style="border-bottom: 1px dashed black;width: 300px;">
                <p>
                    部门主管&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    收款人签收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p style="text-align: right">制单人：${row.username}</p>
                <p style="text-align: right">雇员付款编号：230221</p>
                <p>备注：</p>
                <p style="text-indent: 2em">
                      1、前来领款时请携带本付款凭单及雇员证件
                    (身份证或雇员证)，取他人带领的，还必须由
                    雇员本人写好委托书方可带领并出示代领人证
                    件。
                </p>
                <p style="text-indent: 2em">
                      2、领款金额3000.00元以上者，请电话预约：54594545*804 朱小姐
                </p>
            </div>
        </div>`;
  let html = head + obj + foot;
  return html;
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
  getUninsuredObj,
};
