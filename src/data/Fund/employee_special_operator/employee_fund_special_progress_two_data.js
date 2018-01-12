/**
 * Created by huangye on 2018/1/12.
 */
import Utils from "../../../lib/utils";

const employeeFundSpecialProgressTwo = params => Utils.promise({
  data:{
    code:200,
    data: {
      companyFundAccountInfo: {
        customerBasicFundAccount: "2631228",
        customerAddFundAccount: "2631228125",
        customerCenter: "XXX",
        payRegion: "徐汇",
        companyFundAccountStatus: "正常/中止",
        lastPayMonth: "201712",
        serviceManager: "金翔云",
        customerServicer: "金翔云",
        endDate: "201712",
        payMethodValue: "0",
        UKeyValue: "0",
        customerNumber: "",
        customerName: "",
        accountType: "大库、外包、独立户"
      },
      employeeFundAccountInfo: {
        employeeNumber: 'GY0001',
        employeeName: '林子晖',
        IdNumber: '35220219781124114',
        checkInDate: '2017-1-1',
        companyFundAccountType: '欧莱雅（法国）化妆品集团公司（开户送审中）',
        basicFundAccount: '123235502',
        basicFundStatus: '已办',
        addFundAccount: '21323213',
        addFundStatus: '已做',
        basicFundData: [
          {startPayDate: '201704', endPayDate: '', customerPayDate: '201704', basic: '15000', percent: '0.14', price: '2100'},
        ],
        addFundData: [
          {startPayDate: '201604', endPayDate: '', customerPayDate: '201704', basic: '15000', percent: '0.10', price: '1500'},
        ]
      },
      operatorMaterialListData: [
        {
          isLink: false,
          material: '营业执照',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '原件',
          materialReciveDate: '2017-7-5 12:33:33',
          state: '1',
          notes: ''
        },
        {
          isLink: false,
          material: '资格证',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '复印件',
          materialReciveDate: '',
          state: '1',
          notes: ''
        },
        {
          isLink: true,
          material: '身份证复印件',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '扫描件',
          materialReciveDate: '',
          state: '1',
          notes: ''
        },
        {
          isLink: false,
          material: '工商登记表',
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
  employeeFundSpecialProgressTwo
}
