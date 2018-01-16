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
    value: '4', label: '托费'
  },
  {
    value: '5', label: '大额理赔款'
  },
  {
    value: '6', label: '其他'
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
 * 健康医疗公共数据
 * 下拉框
 */
export default {
  moneyTypes,
  caseTypes,
  statusProperties,
  statusToChina,
}
