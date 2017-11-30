import Utils from "../../../lib/utils";

const companySocialSecurityEndInfo = params => Utils.promise({
  data:{
    code:200,
    data: {
      company: {
        companySocialSecurityAccount: '12123235',
        companyNumber: 'GS170001',
        companyName: '普思埃商业（上海）有限公司',
        socialSecurityCenter: '徐汇',
        uKey: '152243',
        accountType: '独立户',
        companySocialSecurityState: '有效\\封存\\终止',
        companySocialSecurityEndData: '本月18日',
        companyServicer: '金翔云',
        serviceCenter: '大客户2'
      }, //企业社保账户信息
      chatList: [
        {
          icon: '#',
          name: '客服',
          date: '2017-03-02 14:14:32',
          content: '【发起】该客户要求本月所有员工都缴纳社保。'
        },
      ],
    }

  }
})

export default {
  companySocialSecurityEndInfo
}
