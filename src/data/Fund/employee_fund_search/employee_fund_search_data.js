/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../lib/utils";

const employeeFundSearch = params => Utils.promise({
  data:{
    code:200,
    data: {
      employeeFundData: [
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "中智大库", employeeNumber: "10001", employeeName: "林子晖", idNumber: "356684****101", basicFundAccount: "", basicFundStatus: "已做", addFundAccount: "", addFundStatus: "", workStatus: "在职", serviceCenter: "大客户", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "中智外包", employeeNumber: "10002", employeeName: "王莺", idNumber: "356684****102", basicFundAccount: "", basicFundStatus: "已做", addFundAccount: "", addFundStatus: "", workStatus: "在职", serviceCenter: "日本", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "独立户", employeeNumber: "10003", employeeName: "周蕾", idNumber: "356684****103", basicFundAccount: "", basicFundStatus: "已做", addFundAccount: "", addFundStatus: "", workStatus: "在职", serviceCenter: "虹桥", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "", employeeNumber: "10004", employeeName: "郑杰", idNumber: "356684****104", basicFundAccount: "", basicFundStatus: "已办", addFundAccount: "", addFundStatus: "", workStatus: "在职", serviceCenter: "浦东", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "", employeeNumber: "10005", employeeName: "余好", idNumber: "356684****105", basicFundAccount: "", basicFundStatus: "已办", addFundAccount: "", addFundStatus: "", workStatus: "在职", serviceCenter: "浦东", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "", employeeNumber: "10006", employeeName: "张艳华", idNumber: "356684****106", basicFundAccount: "", basicFundStatus: "已办", addFundAccount: "", addFundStatus: "", workStatus: "离职", serviceCenter: "浦东", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "", employeeNumber: "10007", employeeName: "袁美玲", idNumber: "356684****107", basicFundAccount: "", basicFundStatus: "封存", addFundAccount: "", addFundStatus: "", workStatus: "离职", serviceCenter: "浦东", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
        {customerNumber: "26318", customerName: "欧莱雅", companyAccountType: "", employeeNumber: "10008", employeeName: "陈维兰", idNumber: "356684****108", basicFundAccount: "", basicFundStatus: "封存", addFundAccount: "", addFundStatus: "", workStatus: "离职", serviceCenter: "浦东", serviceManager: "金翔云", operatorTips: "", operatorTipDate: "", notes: ""},
      ],
      companyFundAccountList: [
        {companyFundAccount: '34234324', companyName: '中智大库'},
        {companyFundAccount: '23434324', companyName: '中智外包'},
        {companyFundAccount: '56565659', companyName: '独立户-欧莱雅'},
        {companyFundAccount: '34543543', companyName: '独立户-迅达电梯'},
      ],
      companyData: [
        {name: '客户1', code: 'KH001', nature: '企业', type: '国家'},
        {name: '客户2', code: 'KH002', nature: '代表处', type: '集体'},
        {name: '客户3', code: 'KH003', nature: '', type: '民营'},
        {name: '客户4', code: 'KH004', nature: '', type: '合资'},
        {name: '客户5', code: 'KH005', nature: '', type: '其他'},
        {name: '客户6', code: 'KH006', nature: '', type: '其他'},
      ],
      importFailedData: [
        {companyNumber: '', companyName: '客户1', employeeNumber: '10001', employeeName: '雇员1', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10002', employeeName: '雇员2', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
        {companyNumber: '', companyName: '客户1', employeeNumber: '10003', employeeName: '雇员3', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10005', employeeName: '雇员5', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10006', employeeName: '雇员6', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10007', employeeName: '雇员7', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
        {companyNumber: '', companyName: '客户2', employeeNumber: '10008', employeeName: '雇员8', idNumber: '', basicFundAccount: '10001***', addFundAccount: '10001***'},
      ]
    }
  }
})

export default {
  employeeFundSearch
}
