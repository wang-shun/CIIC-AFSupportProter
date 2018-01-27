/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../lib/utils";

const fundYearAdjustStatus = params => Utils.promise({
  data:{
    code:200,
    data: {
      statusData: [
        {ticketNumber: "SOC_XJ_000001", companyName: "客户1", employeeName: "雇员1", entryDate: "2017-01-06", handleMethod: 0, companySSAccountCategory: 0, task: 0, SSIndex: "", base: "", SSStartMonth: "", SSEndMonth: "", notes: ""},
        {ticketNumber: "SOC_XJ_000002", companyName: "客户2", employeeName: "雇员2", entryDate: "2017-01-06", handleMethod: 0, companySSAccountCategory: 0, task: 0, SSIndex: "", base: "", SSStartMonth: "", SSEndMonth: "", notes: ""},
        {ticketNumber: "SOC_XJ_000003", companyName: "客户1", employeeName: "雇员3", entryDate: "2017-01-06", handleMethod: 0, companySSAccountCategory: 0, task: 0, SSIndex: "", base: "", SSStartMonth: "", SSEndMonth: "", notes: ""},
        {ticketNumber: "SOC_XJ_000004", companyName: "客户1", employeeName: "雇员4", entryDate: "2017-01-06", handleMethod: 0, companySSAccountCategory: 0, task: 0, SSIndex: "", base: "", SSStartMonth: "", SSEndMonth: "", notes: ""},
        {ticketNumber: "SOC_XJ_000005", companyName: "客户1", employeeName: "雇员5", entryDate: "2017-01-06", handleMethod: 0, companySSAccountCategory: 0, task: 0, SSIndex: "", base: "", SSStartMonth: "", SSEndMonth: "", notes: ""}
      ]
    }
  }
})

export default {
  fundYearAdjustStatus
}
