export default {
  // 机构名称
  orgId: (orgId, data, defaultValue) => {
    for (var org of data) {
      if (orgId == org.orgId) {
        return org.orgName;
      }
    }

    return defaultValue || '';
  },
  // 是否加急
  urgent: (urgent) => {
    return urgent == '1' ? "是" : "";
  },
  // 任务单类型
  taskCategory: (taskCategory) => {
    switch (taskCategory){
      case '1':
        return '新进'
      case '2':
        return '转入'
      case '3':
        return '调整'
      case '4':
        return '补缴'
      case '5':
        return '转出'
      case '6':
        return '终止'
      case '7':
        return '退账'
      case '8':
        return '提取'
      default: // 默认 1
        return '新进'
    }
  },
};
