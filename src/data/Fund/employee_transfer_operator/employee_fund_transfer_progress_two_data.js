/**
 * Created by huangye on 2018/1/15.
 */
import Utils from "../../../lib/utils";

const employeeFundTransferProgressTwo = params => Utils.promise({
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
      employeeInfo: {
        customerNumber: '',
        customerName: '',
        accountType: '大库、外包、独立户',
        employeeNumber: 'GY0001',
        employeeName: '林子晖',
        IdNumber: '35220219781124114',
        entryDate: '2017-1-1',
        companyFundAccountCatagory: '欧莱雅（法国）化妆品集团公司',
        basicFundAccount: '123235502',
        basicFundStatus: '已办',
        basicFundData: [
          {startPayDate: '201704', endPayDate: '', customerPayDate: '201704', basic: '15000', percent: '0.14', price: '2100'},
        ],
        addFundAccount: '21323213',
        addFundStatus: '已做',
        addFundData: [
          {startPayDate: '201604', endPayDate: '', customerPayDate: '201704', basic: '15000', percent: '0.10', price: '1500'},
        ]
      },
      chatList: [
        {
          icon: '#',
          name: '客服',
          date: '2017-03-02 14:14:32',
          content: '【发起】该雇员要求本月务必正常汇缴社保，他要办理相关贷款业务，注意：请不要当月放到下月补缴。'
        }
      ],
      fundOperatorInfo: {
        fundType: "基本公积金",
        task: "转移",
        transferOutValue: 0,
        transferOutCompanyAccount: "",
        transferInValue: 0,
        transferInCompanyAccount: "",
        transferDate: "",
        feedbackDate: "",
        operateDate: "2017-7-7",
        printDate: "2017-7-7",
        doRemark: ""
      }
    }
  }
})

export default {
  employeeFundTransferProgressTwo
}
