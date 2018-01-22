/**
 * Created by huangye on 2018/1/12.
 */
import Utils from "../../../lib/utils";

const employeeFundSpecialProgressThree = params => Utils.promise({
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
          name: '社保专员',
          date: '2017-03-02 14:14:32',
          content: '材料不齐全：材料1（备注内容）  ；未签收：材料2 （备注内容）；'
        },
        {
          icon: '#',
          name: '客服专员',
          date: '2017-03-05 13:16:52',
          content: '已阅'
        }
      ],
      specialOperateInfo: {
        changeContentValue: '0',
        acceptedDate: '',
        deliveredDate: '',
        finishDate: '',
        specialOperateData: [
          {printReport: '《上海市住房公积金单位缴存登记表》'},
          {printReport: '《上海市补充公积金单位缴存登记表》'},
          {printReport: '《单位住房公积金缴存网点变更登记表》'},
          {printReport: '《变更地址(公积金)》'},
          {printReport: '《变更银行(公积金)》'},
          {printReport: '《单位住房公积金账户信息变更登记表》'},
          {printReport: '《单位住房公积金账户销户登记表》'},
          {printReport: '《公积金开户表格》'}
        ]
      },

    }
  }
})

export default {
  employeeFundSpecialProgressThree
}
