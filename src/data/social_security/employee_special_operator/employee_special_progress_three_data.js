import Utils from "../../../lib/utils";

const employeeSpecialProgress3 = params => Utils.promise({
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

      employee: {
        code: 'GY0001',
        name: '张三',
        idNo: '35220219781124114',
        checkInTime: '2017-1-1',
        education: '本科',
        socialSecurityIndex: '123235564',
        companySocialSecurityAccount: '中智大库',
        residenceAddress: 'XXX路X号xxx',
        contactAddress: 'XXX路X号xxx',
        personType: '外地',
        socialSecurityType: '中智大库'
      }, //雇员信息

      companyInfo: {
        customerNumber: 'GS170001',
        customerName: '普思埃商业（上海）有限公司',
        serviceCenter: '大客户2',
        serviceManager: '金翔云'
      },


    }
  }
})

export default {
  employeeSpecialProgress3
}
