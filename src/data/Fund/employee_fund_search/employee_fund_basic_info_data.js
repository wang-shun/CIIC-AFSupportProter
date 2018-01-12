/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../lib/utils";

const employeeFundBasicInfo = params => Utils.promise({
  data:{
    code:200,
    data: {
      basicInfo: {
        employeeNumber: "GY0001",
        employeeName: "张三",
        IdNumber: "35220219781124114",
        customerNumber: "2017-1-1",
        customerName: "中智大库",
        entryDate: "2017-1-1",
        leaveDate: "2018-1-1",
        personalBasicFundAccount: "32243434",
        personalBasicFundStatus: "",
        personalAddFundAccount: "32243434",
        personalAddFundStatus: ""
      },
      fundData: [
        {companyNumber: '1001', companyName: '客户1', checkInDate: '2017-01-09', checkOutDate: '', workStatus: '在职'},
        {companyNumber: '1002', companyName: '客户2', checkInDate: '2017-01-07', checkOutDate: '2017-01-08', workStatus: '离职'}
      ],
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
      basicFundInfo: {
        account: '123235502',
        status: '已办',
        actTurnIn: '2017-01-01',
        actTurnOut: '2018-01-01',
        payEndMonth: '201801',
        payBaseLine: '',
        price: '',
        payPercent: '',
        fundData: [
          {taskType: '转入', baseline: '19000', startPayDate: '201505', endPayDate: '201604', price: '', percent: ''},
          {taskType: '调整', baseline: '18000', startPayDate: '201405', endPayDate: '201504', price: '', percent: ''},
        ]
      },
      addFundInfo: {
        account: '21323213',
        status: '已做',
        actTurnIn: '2017-01-01',
        actTurnOut: '2018-01-01',
        payEndMonth: '201801',
        payBaseLine: '',
        price: '',
        payPercent: '',
        fundData: [
          {taskType: '转入', baseline: '19000', startPayDate: '201505', endPayDate: '201604', price: '', percent: ''},
          {taskType: '调整', baseline: '18000', startPayDate: '201405', endPayDate: '201504', price: '', percent: ''},
        ]
      },
      transferFundInfo: [
        {fundType: '基本公积金', intoPlace: '原单位', outerPlace: '中智', transferDate: '2016-04-05', status:'已办', operatorDate: '', printDate: '', backDate: ''},
        {fundType: '补充公积金', intoPlace: '中智', outerPlace: '中心', transferDate: '2017-04-05', status:'转出', operatorDate: '', printDate: '', backDate: ''}
      ],
      notesInfo: [
        {notesContent: "基本公积金", noteWriter: "原单位", noteDate: ""},
        {notesContent: "补充公积金", noteWriter: "中智", noteDate: ""}
      ]
    }
  }
})

export default {
  employeeFundBasicInfo
}
