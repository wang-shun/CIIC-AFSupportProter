/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../lib/utils";

const employeeFundHistoryDetail = params => Utils.promise({
  data:{
    code:200,
    data: {
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
        companyFundAccountType: '中智大库',
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
          {changeContent: '汇缴', fundBase: '19000', fundPercent: '0.14', startPayMonth: '201701', endPayMonth: '', price: ''},
          {changeContent: '补缴', fundBase: '', fundPercent: '', startPayMonth: '', endPayMonth: '', price: ''},
        ]
      },
      employeeFundTaskReferenceChange: {
        fundBase: '16000',
        fundPercent: '0.14',
        price: '2240',
        startChangeDate: '201701',
        endChangeDate: '201702'
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
      fundOperatorAdd: {
        fundType: '基本公积金',
        fundAccount: '',
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
        taskType: '调整',
        newFundBase: '16000',
        newFundPercent: '0.14',
        newPrice: '2240',
        startChangeDate: '201701',
        endChangeDate: '201703',
        customerPayDate: '201706',
        operatorTipValue: 0,
        operatorTipDate: '',
        operatorListData: [
          {startDate: '201601', endDate: '201605', base: '9300', percent: '0.14', price: '1302', difference: '42 * 5', type: '调整', reason: ''},
          {startDate: '201601', endDate: '201605', base: '10000', percent: '0.14', price: '1400', difference: '', type: '补缴', reason: 0},
        ],
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
      }
    }
  }
})

export default {
  employeeFundHistoryDetail
}
