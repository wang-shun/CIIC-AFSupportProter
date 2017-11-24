/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../lib/utils";

const employeeFundHistory = params => Utils.promise({
  data:{
    code:200,
    data: {
      inputBatchData: [
        {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''},
        {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''},
        {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''},
        {importOperator: '王XX', importTime: '', importCount: '80', importSuccessCount: '70', importFailCount: '10', importDetail: ''}
      ],
      inputDetailData: [
        {companyNumber: '', companyName: '客户1', employeeNumber: '10001', employeeName: '雇员1', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10002', employeeName: '雇员2', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        {companyNumber: '', companyName: '客户1', employeeNumber: '10003', employeeName: '雇员3', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10004', employeeName: '雇员5', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10005', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10007', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10008', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***', importResult: '成功'},
      ]
    }
  }
})

export default {
  employeeFundHistory
}
