/**
 * 保单管理
 * 是否在保
 * @type {*[]}
 */
function insuredToChina(status) {
  switch (status) {
    case true:
      return "是";
      break;
    case false:
      return "否";
      break;
  }
}

/**
 * 状态
 * @param status
 * @returns {string}
 */
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

const acceptanceTypes = [
  {
    value: '1', label: '雇员'
  },
  {
    value: '2', label: '子女'
  },
  {
    value: '3', label: '配偶'
  },
];

/**
 * 状态
 * @param status
 * @returns {string}
 */
function typeToChina(status) {
  switch (status) {
    case 1:
      return "雇员";
      break;
    case 2:
      return "子女";
      break;
    case 3:
      return "配偶";
      break;
  }
}

export default {
  insuredToChina,
};
