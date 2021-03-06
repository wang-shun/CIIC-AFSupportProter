const taskWaitStatus = [
  {
    value: '2', label: '待处理'
  },
  {
    value: '3', label: '暂缓'
  },
  {
    value: '4', label: '已审核'
  },
];
const taskAlreadyStatus = [
  {
    value: '5', label: '已完成'
  },
  {
    value: '6', label: '已批退'
  }
];

const taskTypeProperties = [
  {
    value: '1', label: '投保任务单'
  },
  {
    value: '2', label: '退保任务单'
  },
  /*{
    value: '3', label: '变更保任务单'
  }*/
];

function insuranceCompanyToString(status) {
  switch (status) {
    case 1:
      return "中盈";
      break;
    case 2:
      return "中智上海";
      break;
  }
}

const keyTypeProperties = [
  {
    label: '固定金额', value: '1'
  },
  {
    label: '赔付比例', value: '2'
  }
];

function keyTypeToChina(status) {
  switch (status) {
    case 1:
      return "固定金额";
      break;
    case 2:
      return "赔付比例";
      break;
  }
}

function typeToChina(status) {
  switch (status) {
    case 1:
      return "配偶";
      break;
    case 2:
      return "子女";
      break;
    case 3:
      return "雇员";
      break;
  }
}

function taskTypeToChinese(type) {
  if (type==1) {
    return "投保";
  } else if (type==2) {
    return "退保";
  }
}

function genderToChina(status) {
  switch (status) {
    case 1:
      return "男";
    case 0:
      return "女";
  }
}

function statusToChina(status) {
  switch (status) {
    case 1:
      return "信息待完善";
      break;
    case 2:
      return "待处理";
      break;
    case 3:
      return "暂缓";
      break;
    case 4:
      return "已审核";
      break;
    case 5:
      return "已完成";
      break;
    case 6:
      return "已批退";
      break;
  }
}

function reverseAmount(type, value) {
  if (type === 2) {
    return value * 100 + "%";
  } else {
    return value;
  }
}


export default {
  taskWaitStatus,
  taskAlreadyStatus,
  taskTypeProperties,
  insuranceCompanyToString,
  keyTypeProperties,
  keyTypeToChina,
  taskTypeToChinese,
  typeToChina,
  genderToChina,
  statusToChina,
  reverseAmount,
};
