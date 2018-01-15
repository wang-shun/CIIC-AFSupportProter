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
      case '9':
        return '特殊操作'
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
  // 人员分类
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
      case undefined:
        return ''
      default: // 默认 1
        return '本地'
    }
  },
  // 材料类型
  materialType: (type) => {
    //1 原件、2  复印件、3 扫描件
    switch (type){
      case '1':
        return '原件'
      case '2':
        return '复印件'
      case '3':
        return '扫描件'
    
      default: 
        return ''
    }
  },
  //特殊任务单类型
  specialOperatorType:(type)=>{
    switch (type){
      case '1':
        return '死亡'
      case '2':
        return '终止'
      case '3':
        return '修改个人信息'
      case '4':
        return '修改人员信息'
      case '5':
        return '退账'
        case '6':
        return '工龄认定'
      case '7':
        return '特殊工种认定'
      case '8':
        return '账户合并'
      case '9':
        return '遗属'
      case '10':
        return '退休'
        case '11':
        return '因病丧劳提前退休'
      case '12':
        return '特殊工种提前退休'
      case '13':
        return '退休高级专家增资'
      case '14':
        return '退休军转增资'
      case '15':
        return '外国人终止提取'
        case '16':
        return '外来人员医保卡领取'
      case '17':
        return '医保帐户提取'
        case '18':
        return '生育津贴领取'
      default: // 默认 0
        return '无'
    }

  },

  archiveStatus:(type)=>{
    switch (type){
      case '1':
        return '已办'
      case '2':
        return '已做'
      case '3':
        return '转出'
      default: // 默认 0
        return '无'
    }
  },
  empTaskStatus:(type)=>{
    switch (type){
      case '1':
        return '未处理'
      case '2':
        return '处理中'
      case '3':
        return '已完成'
      case '4':
        return '批退'
      case '5':
        return '不需处理'
      default: // 默认 0
        return '无'
    }
  },
  //日常操作的缴纳方式
  remitWay:(type)=>{
    
    switch (type){
      case '1':
        return '正常'
      case '2':
        return '补缴'
      case '3':
        return '调整'
      default: // 默认 0
        return ''
    }
  }
};
