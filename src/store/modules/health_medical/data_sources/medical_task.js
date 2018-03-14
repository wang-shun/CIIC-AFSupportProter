const taskStatus = [
  {
    value: 'status1', label: '待审核'
  },
  {
    value: 'status2', label: '已处理'
  },
  {
    value: 'status3', label: '已暂缓'
  },
  {
    value: 'status4', label: '处理失败'
  },
  {
    value: 'status5', label: '处理成功'
  }
];

const taskType = [
  {
    value: 'type1', label: '投保任务单'
  },
  {
    value: 'type2', label: '退保任务单'
  },
  {
    value: 'type3', label: '变更任务单'
  }
];

const taskStatusCom = [
  {
    value: 'type2', label: '中智'
  },
  {
    value: 'type3', label: '中国平安保险公司'
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

const insureStatus = [
  {
    label: '区间', value: 'p1'
  },
  {
    label: '比例', value: 'p2'
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


export default {
  taskStatus,
  taskType,
  taskStatusCom,
  taskTypeItem,
  insureStatus,
  keyTypeToChina,
  typeToChina,
  genderToChina,
};
