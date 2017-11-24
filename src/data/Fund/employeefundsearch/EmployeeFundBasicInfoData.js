/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../lib/utils";

const employeeFundBasicInfo = params => Utils.promise({
  data:{
    code:200,
    data: {
      fundData: [
        {companyNumber: '1001', companyName: '客户1', checkInDate: '2017-01-09', checkOutDate: '', workStatus: '在职'},
        {companyNumber: '1002', companyName: '客户2', checkInDate: '2017-01-07', checkOutDate: '2017-01-08', workStatus: '离职'}
      ],
      companyFundAccountInfo: {
        customerNumber: '26318',
        customerName: '欧莱雅（法国）化妆品集团公司',
        region: '徐汇',
        status: '有效',
        fundCenter: '上海市公积金管理中心(浦东分行)',
        serviceManager: '金翔云',
        accountType: '独立户',
        endDate: '本月18日',
        payMonth: '201708'
      },
      employeeFundAccountInfo: {
        employeeNumber: 'GY0001',
        employeeName: '张三',
        IdNumber: '35220219781124114',
        checkInDate: '2017-1-1',
        companyFundAccountType: '中智大库'
      },
      basicFundInfo: {
        account: '',
        status: '',
        fundData: [
          {changeType: '启封', payType: '正常汇缴', basic: '19000', startPayDate: '201505', endPayDate: '201604', price: '', percent: ''},
          {changeType: '启封', payType: '补缴', basic: '18000', startPayDate: '201405', endPayDate: '201504', price: '', percent: ''},
        ]
      },
      addFundInfo: {
        account: '',
        status: '',
        fundData: [
          {changeType: '启封', payType: '正常汇缴', basic: '19000', startPayDate: '201505', endPayDate: '201604', price: '', percent: ''},
          {changeType: '启封', payType: '补缴', basic: '18000', startPayDate: '201405', endPayDate: '201504', price: '', percent: ''},
        ]
      },
      transferFundInfo: [
        {fundType: '基本公积金', intoPlace: '原单位', outerPlace: '中智', transferDate: '2016-04-05', operatorDate: '', backDate: ''},
        {fundType: '补充公积金', intoPlace: '中智', outerPlace: '中心', transferDate: '2017-04-05', operatorDate: '', backDate: ''}
      ],
      taskList: [
        {taskType: 0, fundType: '基本公积金', taskNumber: 'XK00001', task: '新增', changeType: '启封', taskCreater: '金翔云', beforeDoDate: '2015-06-01', doResult: '已办理'},
        {taskType: 1, fundType: '基本公积金', taskNumber: 'BG00002', task: '变更', changeType: '调整', taskCreater: '金翔云', beforeDoDate: '2016-06-01', doResult: '不需办理'},
        {taskType: 2, fundType: '补缴公积金', taskNumber: 'ZC00003', task: '离职', changeType: '封存', taskCreater: '金翔云', beforeDoDate: '2016-07-01', doResult: '批退'},
        {taskType: 3, fundType: '补充公积金', taskNumber: 'BU00001', task: '变更', changeType: '补缴', taskCreater: '金翔云', beforeDoDate: '2016-09-01', doResult: '暂存'}
      ]
    }
  }
})

export default {
  employeeFundBasicInfo
}
