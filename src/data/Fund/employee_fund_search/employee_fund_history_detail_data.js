/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../lib/utils";

const employeeFundHistoryDetail = params => Utils.promise({
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
      employeeFundTaskReferenceAdd: {
        changeTypeValue: 0,
        taskReferenceInfoData: [
          {fundBase: '19000', fundPercent: '0.14', startPayMonth: '201701', endPayMonth: '', price: ''},
          {fundBase: '', fundPercent: '', startPayMonth: '', endPayMonth: '', price: ''},
        ]
      },
      employeeFundTaskReferenceChange: {
        leaveDate: '2017-8-24',
        endPayDate: '201708'
      },
      employeeFundTaskReferenceSealing: {
        outDate: '2017-8-24',
        endPayDate: '201708'
      },
      employeeFundTaskReferenceRepair: {
        fundBase: '9000',
        fundPercent: '0.14',
        startRepairDate: '201702',
        endRepairDate: '201706'
      },
      chatList: [
        {icon: '#', name: '客服', date: '2017-03-02 14:14:32', content: '【发起】该雇员要求本月务必正常汇缴社保，他要办理相关贷款业务，注意：请不要当月放到下月补缴。'},
      ],
      fundOperatorAdd: {
        fundType: '基本公积金',
        fundAccount: '',
        isCreateSealingTicket: false,
        startPayDate: '201701',
        operatorTipValue: 0,
        operatorTipDate: '',
        operatorListData: [
          {payType: 0, startMonth: '201706', endMonth: '', customerPayMonth: '201706', base: '19512', percent: '0.14', price: '2494', reason: 0, disabled: true},
          {payType: 1, startMonth: '201701', endMonth: '201705', customerPayMonth: '201707', base: '18000', percent: '0.14', price: '2520', reason: 6, disabled: true},
        ],
        doRemark: '',
        refuseRemark: ''
      },
      fundOperatorChange: {
        fundType: '基本公积金',
        changeTypeValue: 0,
        payEndMonth: '',
        customerPayEndMonth: '201708',
        doRemark: '',
        refuseRemark: ''
      },
      fundOperatorSealing: {
        fundType: '基本公积金',
        changeType: 1,
        endPayDate: '201708',
        customerPayDate: '201708',
        doRemark: '',
        refuseRemark: ''
      },
      fundOperatorRepair: {
        fundType: '基本公积金',
        taskType: '补缴',
        reasonValue: 0,
        operatorTipValue: 0,
        operatorTipDate: '',
        customerPayDate: '201707',
        operatorListData: [
          {startDate: '201702', endDate: '201706', base: '19000', percent: '', price: '', count: ''},
          {startDate: '', endDate: '', base: '', percent: '', price: '', count: ''},
          {startDate: '', endDate: '', base: '', percent: '', price: '', count: ''}
        ],
      },
      fundOperatorTransfer: {
        fundType: '基本公积金',
        taskType: '转移',
        outValue: 0,
        outAccount: '',
        inValue: 0,
        inAccount: '',
        transferDate: '',
        backBillDate: '',
        operatorDate: '2017-7-7',
        printDate: '2017-7-7',
        doRemark: '',
        refuseRemark: ''
      },
      taskListNotesChangeData: [
        {fundType: '基本公积金', taskType: '启封', handleOrRefuse: '办理', noteWriter: '金翔云', noteDate: '2015-06-01', noteContent: '备注内容1……'},
        {fundType: '基本公积金', taskType: '调整', handleOrRefuse: '办理', noteWriter: '金翔云', noteDate: '2015-06-01', noteContent: '备注内容2……'},
        {fundType: '补缴公积金', taskType: '封存', handleOrRefuse: '办理', noteWriter: '金翔云', noteDate: '2015-06-01', noteContent: '备注内容3……'},
        {fundType: '补充公积金', taskType: '补缴', handleOrRefuse: '批退', noteWriter: '金翔云', noteDate: '2015-06-01', noteContent: '备注内容4……'},
      ]
    }
  }
})

export default {
  employeeFundHistoryDetail
}
