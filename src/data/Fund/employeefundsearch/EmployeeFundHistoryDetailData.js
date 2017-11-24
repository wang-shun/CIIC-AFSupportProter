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
      employeeFundTaskReferenceInfo: {
        changeTypeValue: 0,
        taskReferenceInfoData: [
          {changeContent: '汇缴', fundBase: '19000', fundPercent: '0.14', startPayMonth: '201701', endPayMonth: '', price: ''},
          {changeContent: '补缴', fundBase: '', fundPercent: '', startPayMonth: '', endPayMonth: '', price: ''},
        ]
      }
    }
  }
})

export default {
  employeeFundHistoryDetail
}
