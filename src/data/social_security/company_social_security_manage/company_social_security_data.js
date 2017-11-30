import Utils from "../../../lib/utils";

const companySocialSecurity = params => Utils.promise({
  data:{
    code:200,
    data: {
      childCompanyData: [
        {
          companyCode: 'KH00001',
          companyName: '普思埃商业（上海）有限公司',
          serviceCenter: '大客户2',
          serviceTeam: '龚艳社保组'
        },
        {
          companyCode: 'KH00002',
          companyName: '广州XX信息技术有限公司',
          serviceCenter: '大客户2',
          serviceTeam: '龚艳社保组'
        }
      ],

      historyTaskData: [
        {
          tid: 'XK00001',
          taskType: '开户',
          operator: '龚艳',
          operatorTime: '2015-06-01',
          notes: ''
        },
        {
          tid: 'BG00001',
          taskType: '变更',
          operator: '龚艳',
          operatorTime: '2016-06-01',
          notes: ''
        },
        {
          tid: 'BG00002',
          taskType: '终止',
          operator: '龚艳',
          operatorTime: '2015-06-01',
          notes: ''
        }
      ], //变动历史

      workInjuryData: [
        {
          industryCategory: '一',
          companyWorkInjuryPercentage: '0.02',
          startMonth: '201406',
          endMonth: '201704'
        },
        {
          industryCategory: '二',
          companyWorkInjuryPercentage: '0.03',
          startMonth: '201705',
          endMonth: ''
        }
      ],

      chatList: [
        {
          icon: '',
          name: '客服',
          date: '2017-03-02 14:14:32',
          content: '【发起】该客户要求本月所有员工都缴纳社保。'
        }
      ]
    }
  }
})

export default {
  companySocialSecurity
}
