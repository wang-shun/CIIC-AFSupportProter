export default {
  // 社保账户类型
  accountType: async (params) => {
    let data = [
      {
        value: '1',
        label: '中智大库'
      },
      {
        value: '2',
        label: '中智外包'
      },
      {
        value: '3',
        label: '独立户'
      }
    ];
    return await JSON.parse(JSON.stringify(data));
  },
  // 人员分类
  empClassify: async (params) => {
    let data = [
      {
        value: '1',
        label: '本地'
      },
      {
        value: '2',
        label: '外地'
      },
      {
        value: '3',
        label: '外籍三险'
      },
      {
        value: '4',
        label: '外籍五险'
      },
      {
        value: '5',
        label: '延迟退休人员'
      }
    ];
    return await JSON.parse(JSON.stringify(data));
  },
  // 任务单类型
  taskCategory: async (params) => {
    let data = [
      {
        value: '1',
        label: '新进'
      },
      {
        value: '2',
        label: '转入'
      },
      {
        value: '3',
        label: '调整'
      },
      {
        value: '4',
        label: '补缴'
      },
      {
        value: '5',
        label: '转出'
      },
      {
        value: '6',
        label: '终止'
      },
      {
        value: '7',
        label: '退账'
      },
      {
        value: '8',
        label: '提取'
      },
      {
        value: '9',
        label: '特殊操作'
      }
    ];
    return await JSON.parse(JSON.stringify(data));
  },
  // 是否加急
  urgent: async (params) => {
    let data = [
      {
        value: '0',
        label: '否'
      },
      {
        value: '1',
        label: '是'
      },
    ];
    return await JSON.parse(JSON.stringify(data));
  },
  // 结算区县
  settlementArea: async (params) => {
    let data = [
      {
        value: '徐汇区',
        label: '徐汇区'
      },
      {
        value: '浦东新区',
        label: '浦东新区'
      },
      {
        value: '闵行区',
        label: '闵行区'
      },
      {
        value: '闸北区',
        label: '闸北区'
      },
      {
        value: '黄浦区',
        label: '黄浦区'
      },
    ];
    return await JSON.parse(JSON.stringify(data));
  },


}

