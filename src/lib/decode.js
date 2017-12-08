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
  // 账户类型
  accountType: (accountType) => {
    switch (accountType){
      case '1':
        return '中智大库'
      case '2':
        return '中智外包'
      case '3':
      default: // 默认 1
        return '独立户'
    }
  },
  // 账户类型
  empClassify: (empClassify) => {
    switch (empClassify){
      case '1':
        return '本地'
      case '2':
        return '外地'
      case '3':
        return '外籍三险'
      case '4':
        return '外籍五险'
      case '5':
        return '延迟退休人员'
      default: // 默认 1
        return '本地'
    }
  },
};
