import Utils from "../../../lib/utils";

const employeeSpecialProgress3 = params => Utils.promise({
  data:{
    code:200,
    data: {
      company: {
        companySocialSecurityAccount: '12123235',
        companyNumber: '340078',
        companyName: '上海XX信息技术有限公司',
        socialSecurityCenter: '徐汇',
        uKey: '152243',
        accountType: '独立户',
        companySocialSecurityState: '有效\\封存\\终止',
        companySocialSecurityEndData: '本月18日',
        companyServicer: '彭XX',
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
        customerNumber: 'KH0001',
        customerName: '上海XX信息技术有限公司',
        serviceCenter: '大客户2',
        serviceManager: '王XX'
      },


    }
  }
})

export default {
  employeeSpecialProgress3
}
