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
      materialListData: [
        {
          isLink: false,
          materialName: '营业执照',
          submitTime: '2017-7-3 12:33:33',
          materialType: '原件',
          receiveTime: '2017-7-5 12:33:33',
          state: '1',
          notes: ''
        },
        {
          isLink: false,
          materialName: '资格证',
          submitTime: '2017-7-3 12:33:33',
          materialType: '复印件',
          receiveTime: '',
          state: '1',
          notes: ''
        },
        {
          isLink: true,
          materialName: '身份证复印件',
          submitTime: '2017-7-3 12:33:33',
          materialType: '扫描件',
          receiveTime: '',
          state: '1',
          notes: ''
        },
        {
          isLink: false,
          materialName: '工商登记表',
          submitTime: '2017-7-3 12:33:33',
          materialType: '',
          receiveTime: '2017-7-5 12:33:33',
          state: '1',
          notes: ''
        }
      ],
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
      ]
    }
  }
})

export default {
  employeeFundSpecialProgressTwo
}
