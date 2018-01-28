/**
 * 补充医疗理赔
 * 状态
 * @type {*[]}
 */
const statusProperties = [
  {
    value: '0', label: '未审批'
  },
  {
    value: '1', label: '已批退'
  },
  {
    value: '2', label: '已审核未同步'
  },
  {
    value: '3', label: '已同步未支付'
  },
  {
    value: '4', label: '财务退回'
  },
  {
    value: '5', label: '已同步已支付'
  },
  {
    value: '6', label: '已退票'
  },
  {
    value: '7', label: '已完成'
  }
];

function statusToChina(status) {
  switch (status) {
    case 0:
      return "未审批";
      break;
    case 1:
      return "已批退";
      break;
    case 2:
      return "已审核未同步";
      break;
    case 3:
      return "已同步未支付";
      break;
    case 4:
      return "财务退回";
      break;
    case 5:
      return "已同步已支付";
      break;
    case 6:
      return "已退票";
      break;
    case 7:
      return "已完成";
      break;
  }
}

export default {
  statusProperties,
  statusToChina,
};
