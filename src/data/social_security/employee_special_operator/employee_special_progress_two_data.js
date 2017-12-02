import Utils from "../../../lib/utils";

const employeeSpecialProgress2 = params => Utils.promise({
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
        name: '郑杰',
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

      operatorMaterialListData: [
        {
          isLink: false,
          material: '材料1',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '原件',
          materialReciveDate: '2017-7-5 12:33:33',
          state: '1',
          operator: '',
          notes: ''
        },
        {
          isLink: false,
          material: '材料2',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '复印件',
          materialReciveDate: '',
          state: '1',
          operator: '',
          notes: ''
        },
        {
          isLink: true,
          material: '材料3',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '扫描件',
          materialReciveDate: '',
          state: '1',
          operator: '',
          notes: ''
        },
        {
          isLink: false,
          material: '材料4',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '',
          materialReciveDate: '2017-7-5 12:33:33',
          state: '1',
          operator: '',
          notes: ''
        }
      ]
    }
  }
})

export default {
  employeeSpecialProgress2
}
