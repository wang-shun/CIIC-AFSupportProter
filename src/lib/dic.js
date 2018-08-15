/**
 * guwei
 */
export default {
  install: function (vm) {
    /**
     * 公共数据字典
     */
    vm.prototype.baseDic = {
      // 是否证明
      idCardType: {
        1: '身份证',
        2: '护照',
        3: '军(警)官证',
        4: '士兵证',
        5: '台胞证',
        6: '回乡证',
        7: '其他'
      },
      // 证件类型
      credentialsType: {
        1: '积分办理',
        2: '居住证B证',
        3: '留学生落户',
        4: '居转户',
        5: '夫妻分居',
        6: '人才引进'
      },
      // 积分办理类型
      scoreDealType: {
        1: '积分申请',
        2: '积分确认',
        3: '信息变更',
        4: '单添随员'
      },
      // B证办理类型
      BCardDealType: {
        5: '新办',
        6: '继办',
        7: '单位信息变更',
        8: '随员',
        9: '个人信息修改',
        10: '挂失和补办'
      },
      // 操作方式
      operateType: {
        1: '待审代交',
        2: '待审不代交',
        3: '不待审代交'
      },
      // 学历
      educations: {
        1: '初中',
        2: '高中',
        3: '大专',
        4: '本科',
        5: '硕士',
        6: '博士'
      },

      //任务单状态
      taskStatus: {
        1: '未处理',
        2: '处理中',
        3: '已完成',
        4: '批退',
        5: '无需处理'
      },

      // 人才退回原因
      talentBackReason: {},
      // 办证机构
      DealOrg: {
        '1': '梅园路',
        '2': '徐汇人才',
        '3': '浦东人才',
        '4': '浦东人才（张江）',
        '5': '商城路',
        '6': '黄浦人才',
        '7': '黄浦人才（卢湾）',
        '8': '静安人才',
        '9': '静安才（闸北）',
        '10': '虹口人才',
        '11': '杨浦人才',
        '12': '长宁人才',
        '13': '闵行人才',
        '14': '松江人才'
      },
      /*公积金－企业任务单*/
      // 客服中心
      companyServiceCenterList: {
        1: '大客户',
        2: '日本客户',
        3: '虹桥',
        4: '浦东'
      },
      // 企业账户类型
      companyHFAccountType: {
        1: '中智大库',
        2: '中智外包',
        3: '独立户'
      },
      // 缴费银行列表
      payBankList: {
        1: '全部',
        2: '徐汇',
        3: '长宁',
        4: '浦东',
        5: '卢湾',
        6: '静安',
        7: '黄浦'
      },
      hfPaymentBank: {
        15: '徐汇—X',
        16: '西郊—C',
        17: '东方路—P',
        18: '卢湾—L',
        0: '黄浦—H'
      },
      hfPaymentWay: {
        1: '自付（客户自己汇缴给银行，雇员由中智办理）',
        2: '我司付款（客户预付）',
        3: '垫付'
      },
      hfUkeyStore: {
        0: '没有',
        1: '客户自办',
        2: '中智代办'
      },
      // 公积金类型
      hfType: {
        1: '基本公积金',
        2: '补充公积金'
      },
      // 报表主题
      form_title: {
        2: '生日报表（月度）',
        4: '参加活动公司清单',
        5: '参加活动雇员清单',
        7: '文艺欣赏',
        8: '六一福利',
      },
      //结算区县
      dic_settle_area: {
        '徐汇': '徐汇',
        '长宁': '长宁',
        '浦东': '浦东',
        '静安': '静安',
        '黄浦': '黄浦',
        '杨浦': '杨浦',
        '普陀': '普陀',
        '宝山': '宝山',
        '虹口': '虹口',
        '闵行': '闵行',
        '松江': '松江',
        '嘉定': '嘉定',
        '青浦': '青浦',
        '奉贤': '奉贤',
        '崇明': '崇明',
        '金山': '金山'
      },
      ssEmpProperty: {
        1: '上海人',
        2: '外来城镇人员',
        3: '外籍三险',
        4: '外籍五险',
        5: '非全日制仅工伤',
        6: '柔性退休',
        7: '工伤仅医疗',
        8: '外籍互免'
      }
    }
  }
}
