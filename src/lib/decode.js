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

    switch (taskCategory) {
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
        return '封存'
      case '7':
        return '退账'
      case '9':
        return '特殊操作'
      default: // 默认 1
        return ''
    }
  },
  // 社保账户类型
  accountType: (accountType) => {
    switch (accountType) {
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
    switch (empClassify) {
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
    switch (type) {
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
  specialOperatorType: (type) => {
    switch (type) {
      case '1':
        return '死亡终止'
      case '2':
        return '修改个人信息'
      case '3':
        return '工龄认定'
      case '4':
        return '特殊工种认定'
      case '5':
        return '账户合并'
      case '6':
        return '遗属'
      case '7':
        return '退休'
      case '8':
        return '因病丧劳提前退休'
      case '9':
        return '特殊工种提前退休'
      case '10':
        return '退休高级专家增资'
      case '11':
        return '退休军转增资'
      case '12':
        return '外国人终止提取'
      case '13':
        return '外来人员医保卡领取'
      case '14':
        return '医保帐户提取'
      case '15':
        return '生育津贴领取'
      default: // 默认 0
        return '无'
    }

  },

  archiveStatus: (type) => {
    switch (type) {
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
  empTaskStatus: (type) => {
    switch (type) {
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
  },
  // 证件类型
  sel_type: (type) => {
    switch (type) {
      case 1:
        return '积分办理'
      case 2:
        return '居住证B证'
      case 3:
        return '留学生落户'
      case 4:
        return '居转户'
      case 5:
        return '夫妻分居'
      case 6:
        return '人才引进'
      default:
        return ''
    }
  },
  //积分办理
  deal_type1: (type) => {
    switch (type) {
      case 1:
        return '积分申请'
      case 2:
        return '积分确认'
      case 3:
        return '信息变更'
      case 4:
        return '随员'
      case 5:
        return '密码重置'
      default:
        return ''
    }
  },
  //B证办理
  deal_type2: (type) => {
    switch (type) {
      case 1:
        return '新办'
      case 2:
        return '继办'
      case 3:
        return '随员'
      case 4:
        return '个人信息修改'
      case 5:
        return '挂失'
      case 6:
        return '补办'
      default:
        return ''
    }
  },
  // 操作方式
  operateType: (type) => {
    switch (type) {
      case 1:
        return '待审代交'
      case 2:
        return '待审不代交'
      case 3:
        return '不待审代交'
    }
  },
  // 费用类型
  operateType: (type) => {
    switch (type) {
      case 1:
        return '免费'
      case 2:
        return '常规收费'
      case 3:
 
        return '特殊收费'
    }
  },
  // 支付方式
  operateType: (type) => {
    switch (type) {
      case 1:
        return '台账'
      case 2:
        return '员工自付'
    }
  },

  //付款方式
  payMethod:(type)=>{

    switch(type){
      case "1":
        return '我司代付款'
      case "2":
        return '客户自付'
      case "3":
        return '我司垫付'
      default:
        return ''
    }
  },
  //账单接收方
  billReceiver: (type) => {
    switch (type) {
      case "1":
      case 1:
        return '我司'
      case "2":
      case 2:
        return '客户公司'
      default:
        return ''
    }
  },
  accountStatus: (type)=> {
    switch (type){
      case '1':
        return '一般人员信息'
      case '2':
        return '转出人员信息'
      default:
        return '无'
    }
  },
  matchStatus: (type)=> {
    switch (type){
      case '0':
        return '未匹配'
      case '1':
        return '已匹配'
      default:
        return '无'
    }
  },
  //雇员入离职状态
  empStatus: (type) => {
    switch (type) {
      case "1":
      case 1:
        return '雇员信息确认中'
      case "2":
      case 2:
        return '在职'
      case "3":
      case 3:
        return '离职'
      default:
        return ''
    }
  },
  //公积金类型
  hfType: (type) => {
    switch (type) {
      case "1":
      case 1:
        return '基本公积金'
      case "2":
      case 2:
        return '补充公积金'
      default:
        return ''
    }
  },
  //公积金操作提示 1要做、2 中心、3 中智、4 原单位、5 其他独立开户公司、6 外包 
  hfOperationRemind: (type) => {
    switch (type) {
      case "1":
      case 1:
        return '要做'
      case "2":
      case 2:
        return '中心'
      case "3":
      case 3:
        return '中智'
      case "4":
      case 4:
        return '原单位'
      case "5":
      case 5:
        return '其他独立开户公司'
      case "6":
      case 6:
        return '外包'
      default:
        return ''
    }
  },
  //公积金任务状态 1-已办  2-已做 3-封存
  hfTaskStatus: (type) => {
    switch (type) {
      case "1":
      case 1:
        return '已办'
      case "2":
      case 2:
        return '已做'
        case "3":
      case 3:
        return '封存'
      default:
        return ''
    }
  },
};
