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
  {
    value: '3', label: '变更保任务单'
  }
];

const taskStatusCom = [
  {
    value: '1', label: '中智'
  },
  {
    value: '2', label: '中国平安保险公司'
  }
];

const taskTypeItem = [
  {
    value: 'type1', label: '意外伤害险'
  },
  {
    value: 'type2', label: '环球医疗'
  },
  {
    value: 'type3', label: '补充医疗'
  },
  {
    value: 'type4', label: '重大疾病险'
  }
];

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

function genderToChina(status) {
  switch (status) {
    case 0:
      return "女";
      break;
    case 1:
      return "男";
      break;
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

export default {
  taskWaitStatus,
  taskAlreadyStatus,
  taskTypeProperties,
  taskStatusCom,
  taskTypeItem,
  keyTypeProperties,
  keyTypeToChina,
  typeToChina,
  genderToChina,
  statusToChina,
};
