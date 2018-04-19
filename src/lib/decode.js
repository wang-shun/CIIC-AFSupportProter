export default {
    // 机构名称
    orgId: (orgId, data, defaultValue) => {
        for (var org of data) {
            if (orgId == org.orgId) {
                return org.orgName
            }
        }

        return defaultValue || ''
    },
    // 是否加急
    urgent: (urgent) => {
        return urgent == '1' ? '是' : ''
    },
    // 社保任务单类型
    taskCategory: (taskCategory) => {
    //1新进  2  转入 3  调整 4 补缴 5 转出 6封存 7退账  9 特殊操作  10 集体转入   11 集体转出 12 翻牌 14 翻牌转出 15 翻牌封存

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
        case '10':
            return '集体转入'
        case '11':
            return '集体转出'
        case '12': //12翻牌转入13翻牌转出14翻牌转出15翻牌封存
            return '翻牌新进'
        case '13':
            return '翻牌转入'
        case '14':
            return '翻牌转出'
        case '15':
            return '翻牌封存'
        default: // 默认 1
            return ''
        }
    },

    // 社保账户类型
    accountType: (accountType, self = false) => {
        switch (accountType) {
        case '1':
            return '中智大库'
        case '2':
            return '中智外包'
        case '3':
            return '独立户'
        default:
            if (self) return accountType
            return ''
        }
    },
    // 人员分类
    empClassify: (empClassify, self = false) => {
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
            if (self) return empClassify
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

    archiveStatus: (type, self = false) => {
        switch (type) {
        case '0':
            return '初始'
        case '1':
            return '有效'
        case '2':
            return '终止'
        case '3':
            return '封存'
        default: // 默认 0
            if (self) return type
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
    remitWay: (type) => {

        switch (type) {
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
    deal_type: (type) => {
        switch (type) {
        case 7:
            return '积分申请'
        case 8:
            return '积分确认'
        case 9:
            return '信息变更'
        case 10:
            return '单添随员'
        case 11:
            return '新办'
        case 12:
            return '继办'
        case 13:
            return '单位信息变更'
        case 14:
            return '随员'
        case 15:
            return '个人信息修改'
        case 16:
            return '挂失和补办'
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
    payMethod: (type) => {

        switch (type) {
        case '1':
            return '我司代付款'
        case '2':
            return '客户自付'
        case '3':
            return '我司垫付'
        default:
            return ''
        }
    },
    //账单接收方
    billReceiver: (type) => {
        switch (type) {
        case '1':
        case 1:
            return '我司'
        case '2':
        case 2:
            return '客户公司'
        default:
            return ''
        }
    },
    district: (type, self = false) => {
        switch (type) {
        case '1':
            return '徐汇'
        case '2':
            return '长宁'
        case '3':
            return '浦东'
        case '4':
            return '卢湾'
        case '5':
            return '静安'
        case '6':
            return '黄浦'
        default:
            if (self) return type
            return '无'
        }
    },
    //雇员入离职状态
    empStatus: (type) => {
        switch (type) {
        case '1':
        case 1:
            return '雇员信息确认中'
        case '2':
        case 2:
            return '在职'
        case '3':
        case 3:
            return '离职'
        default:
            return ''
        }
    },
    //公积金类型
    hfType: (type) => {
        switch (type) {
        case '1':
        case 1:
            return '基本公积金'
        case '2':
        case 2:
            return '补充公积金'
        default:
            return ''
        }
    },
    //公积金操作提示 1要做、2 中心、3 中智、4 原单位、5 其他独立开户公司、6 外包
    hfOperationRemind: (type) => {
        switch (type) {
        case '1':
        case 1:
            return '要做'
        case '2':
        case 2:
            return '中心'
        case '3':
        case 3:
            return '中智'
        case '4':
        case 4:
            return '原单位'
        case '5':
        case 5:
            return '其他独立开户公司'
        case '6':
        case 6:
            return '外包'
        default:
            return ''
        }
    },
    //公积金任务状态 1-已办  2-已做 3-封存
    ssArchiveTaskStatus: (type) => {
        switch (type) {
        case '1':
        case 1:
            return '已办'
        case '2':
        case 2:
            return '已做'
        case '3':
        case 3:
            return '转出'
        default:
            return ''
        }
    },
    //公积金任务状态 1-已办  2-已做 3-封存
    hfTaskStatus: (type) => {
        switch (type) {
        case '1':
        case 1:
            return '已办'
        case '2':
        case 2:
            return '已做'
        case '3':
        case 3:
            return '封存'
        default:
            return ''
        }
    },
    //用工状态
    recruitAndUseStatus: (type) => {
    //1未反馈  2退工成功  3档未到先退工  4退工单盖章未返回  5退工失败  6前道要求批退  7其它
        switch (type) {
        case '1':
        case 1:
            return '未反馈'
        case '2':
        case 2:
            return '退工成功'
        case '3':
        case 3:
            return '封存'
        case '4':
        case 4:
            return '退工单盖章未返回'
        case '5':
        case 5:
            return '退工失败'
        case '6':
        case 6:
            return '前道要求批退'
        case '7':
        case 7:
            return '其它'
        default:
            return ''
        }
    },
    costCategory: (costCategory) => {
    //1标准 2 新进 3 转入  4 补缴 5 调整 （顺调)）6 转出 7封存 8 退账 9 调整（倒调）
        switch (costCategory) {
        case '1':
            return '标准'
        case '2':
            return '新进'
        case '3':
            return '转入'
        case '4':
            return '补缴'
        case '5':
            return '调整 （顺调)'
        case '6':
            return '转出'
        case '7':
            return '封存'
        case '8':
            return '退账'
        case '9':
            return '调整（倒调）'
        default: // 默认 1
            return ''
        }
    },
    empComStatus: (costCategory) => {
    //客户中心 雇员上下岗状态
        switch (costCategory) {
        case '0':
            return '预录用'
        case '1':
            return '雇员信息确认中'
        case '2':
            return '在职'
        case '3':
            return '离职'
        default: // 默认 1
            return ''
        }
    },
    // 公积金任务单类型
    hf_taskCategory: (taskCategory) => {
    //1 新开     2 转入     3 启封    4 转出    5 封存    6 补缴    7 调整    8 转移
        switch (taskCategory) {
        case '1':
        case 1:
            return '新开'
        case '2':
        case 2:
            return '转入'
        case '3':
        case 3:
            return '启封'
        case '4':
        case 5:
            return '转出'
        case '5':
        case 5:
            return '封存'
        case '6':
        case 6:
            return '补缴'
        case '7':
        case 7:
            return '调整'
        case '8':
        case 8:
            return '转移'
        case '9':
        case 9:
            return '翻牌新开'
        case '10':
        case 10:
            return '翻牌转入'
        case '11':
        case 11:
            return '翻牌启封'
        case '12':
        case 12:
            return '翻牌转出'
        default: // 默认 1
            return ''
        }
    },
    hf_paymentWay: (v) => {
        switch (v) {
        case '1':
            return '自付'
        case '2':
            return '我司付款（客服预付）'
        case '3':
            return '垫付'
        default: // 默认 1
            return ''
        }
    },
    hf_accountType: (v) => {
        switch (v) {
        case '1':
            return '中智大库'
        case '2':
            return '中智外包'
        case '3':
            return '独立户'
        default:
            return ''
        }
    },
    hf_ukeyStore: (v) => {
        switch (v) {
        case '0':
            return '没有'
        case '1':
            return '有（客户自办）'
        case '2':
            return '有（中智代办）'
        default:
            return ''
        }
    },
    hf_state: (v) => {
        switch (v) {
        case '0':
            return '初始'
        case '1':
            return '有效'
        case '2':
            return '终止'
        default:
            return ''
        }
    },
    hf_accountTempStore: (v) => {
        switch (v) {
        case '0':
            return '没有'
        case '1':
            return '客户自办'
        default:
            return '中智代办'
        }
    },
    hf_archiveTaskStatus: (v) => {
    // 0-未办理  1-已办  2-已做 3-封存
        switch (v) {
        case '0':
            return '未办理'
        case '1':
            return '已办'
        case '2':
            return '已做'
        case '3':
            return '封存'
        default:
            return ''
        }
    },
    hf_archiveStatus: (v) => {
    // 0-未办理  1-已办  2-已做 3-封存
        switch (v) {
        case '0':
            return '未办理'
        case '1':
            return '已办'
        case '2':
            return '已做'
        case '3':
            return '封存'
        default:
            return ''
        }
    },
    hf_paymentBank: (v) => {
    // 1 徐汇—X、2 西郊—C、3 东方路—P、4 卢湾—L、5 黄浦—H
    switch (v) {
      case '15':
        return '徐汇—X'
      case '16':
        return '西郊—C'
      case '17':
        return '东方路—P'
      case '18':
        return '卢湾—L'
      case '0':
        return '黄浦—H'
      default:
        return ''
    }
}
};
