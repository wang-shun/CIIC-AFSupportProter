/**
 * Created by huangye on 2018/1/15.
 */
import Utils from "../../../../lib/utils";

const tProcessed = params => Utils.promise({
  data:{
    code:200,
    data: {
      tProcessedData: [
        {fundType: "基本公积金", companyNumber: "KH001", companyName: "客户1", employeeId: "GY001", employeeName: "雇员1", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "2017/06/01 10:05:29", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "基本公积金", companyNumber: "KH001", companyName: "客户2", employeeId: "GY001", employeeName: "雇员2", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "基本公积金", companyNumber: "KH001", companyName: "客户1", employeeId: "GY001", employeeName: "雇员3", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "基本公积金", companyNumber: "KH001", companyName: "客户2", employeeId: "GY001", employeeName: "雇员4", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "补充公积金", companyNumber: "KH001", companyName: "客户1", employeeId: "GY001", employeeName: "雇员5", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "补充公积金", companyNumber: "KH001", companyName: "客户1", employeeId: "GY001", employeeName: "雇员6", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "补充公积金", companyNumber: "KH001", companyName: "客户1", employeeId: "GY001", employeeName: "雇员7", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""},
        {fundType: "补充公积金", companyNumber: "KH001", companyName: "客户1", employeeId: "GY001", employeeName: "雇员8", employeeCardNumber: "", entryDate: "2017-01-06", operateDate: "", feedbackDate: "", printDate: "", transferOutCompany: "", transferInCompany: "", transferDate: "", initiator: "", sponsorTime: "", notes: ""}
      ],
    }
  }
})

export default {
  tProcessed
}
