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
        1: '身份证', 2: '护照', 3: '军(警)官证', 4: '士兵证', 5: '台胞证', 6: '回乡证', 7: '其他'
      },
      // 证件类型
      credentialsType: {
        1: '积分办理', 2: '居住证B证', 3: '留学生落户', 4: '居转户', 5: '夫妻分居', 6: '人才引进'
      },
      // 积分办理类型
      scoreDealType: {
        1: '积分申请', 2: '积分确认', 3: '信息变更', 4: '单添随员'
      },
      // B证办理类型
      BCardDealType: {
        5: '新办', 6: '继办', 7: '单位信息变更', 8: '随员', 9: '个人信息修改', 10: '挂失和补办'
      },
       // 操作方式
      operateType: {
        1: '待审代价', 2: '待审不代交', 3: '不待审代交'
      },
      // 学历
      educations: {
        1: '初中', 2: '高中', 3: '大专', 4: '本科', 5: '硕士', 6: '博士'
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
      // 国籍
      country: {
        '132': '佛得角',
        '136': '开曼群岛',
        '140': '中非',
        '144': '斯里兰卡',
        '148': '乍得',
        '152': '智利',
        '156': '中国',
        '158': '中国台湾',
        '166': '科科斯（基林）群岛',
        '170': '哥伦比亚',
        '246': '芬兰',
        '300': '希腊',
        '392': '日本',
        '398': '哈萨克斯坦',
        '400': '约旦',
        '408': '朝鲜',
        '410': '韩国',
        '414': '科威特',
        '752': '瑞典'
      },
      // 报表主题
      form_title: {
        1 : '资深雇员（暂缓）',
        2 : '生日一份',
        3 : '生日两份',
        4 : '参加活动公司清单',
        5 : '参加活动雇员清单',
        6 : '市场部活动统计',
        7 : '文艺欣赏',
        8 : '雇员清单',
        9 : '公司清单',
        10 : '雇员基本信息'
      }
    }
  }
}
