/**
 * Created by huangye on 2018/1/15.
 */
import Utils from "../../../../lib/utils";

const tNoProcess = params => Utils.promise({
  data:{
    code:200,
    data: {
      tNoProcessData: [
        {fundType: "基本公积金", customerNumber: "KH001", customerName: "客户1", employeeId: "GY001", employeeName: "雇员1", employeeCardNumber: "", workStatus: "在职", status: "已办", entryDate: "2017-01-06", initiator: "前客服1", sponsorTime: "2017/06/01 10:05:29", validateResult: ""},
        {fundType: "基本公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员2", employeeCardNumber: "", workStatus: "离职", status: "转出", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
        {fundType: "基本公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员3", employeeCardNumber: "", workStatus: "在职", status: "已办", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
        {fundType: "基本公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员4", employeeCardNumber: "", workStatus: "离职", status: "转出", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
        {fundType: "补充公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员5", employeeCardNumber: "", workStatus: "在职", status: "已办", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
        {fundType: "补充公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员6", employeeCardNumber: "", workStatus: "在职", status: "转出", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
        {fundType: "补充公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员7", employeeCardNumber: "", workStatus: "在职", status: "已办", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
        {fundType: "补充公积金", customerNumber: "KH001", customerName: "客户2", employeeId: "GY001", employeeName: "雇员8", employeeCardNumber: "", workStatus: "在职", status: "转出", entryDate: "2017-01-06", initiator: "", sponsorTime: "", validateResult: ""},
      ],
      createData: [
        {companyNumber: "", companyName: "客户1", employeeNumber: "10001", employeeName: "雇员1", IdNumber: "", workStatus: "在职", fundStatus: "", serviceCenter: "大客户", serviceManager: "", accountType: "独立户", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户2", employeeNumber: "10002", employeeName: "雇员2", IdNumber: "", workStatus: "在职", fundStatus: "", serviceCenter: "日本", serviceManager: "", accountType: "大库", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户1", employeeNumber: "10003", employeeName: "雇员3", IdNumber: "", workStatus: "在职", fundStatus: "", serviceCenter: "虹桥", serviceManager: "", accountType: "外包", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户1", employeeNumber: "10004", employeeName: "雇员4", IdNumber: "", workStatus: "在职", fundStatus: "已办", serviceCenter: "浦东", serviceManager: "", accountType: "外包", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户2", employeeNumber: "10005", employeeName: "雇员5", IdNumber: "", workStatus: "在职", fundStatus: "已办", serviceCenter: "浦东", serviceManager: "", accountType: "外包", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户2", employeeNumber: "10006", employeeName: "雇员6", IdNumber: "", workStatus: "离职", fundStatus: "已办", serviceCenter: "浦东", serviceManager: "", accountType: "外包", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户2", employeeNumber: "10007", employeeName: "雇员7", IdNumber: "", workStatus: "离职", fundStatus: "封存", serviceCenter: "浦东", serviceManager: "", accountType: "外包", transferFailedReason: "", operateTipDate: ""},
        {companyNumber: "", companyName: "客户2", employeeNumber: "10008", employeeName: "雇员8", IdNumber: "", workStatus: "离职", fundStatus: "封存", serviceCenter: "浦东", serviceManager: "", accountType: "外包", transferFailedReason: "", operateTipDate: ""}
      ]
    }
  }
})

export default {
  tNoProcess
}
