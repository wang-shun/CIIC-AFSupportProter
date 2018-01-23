/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../lib/utils";

const fundYearAdjustMaintain = params => Utils.promise({
  data:{
    code:200,
    data: {
      maintainData: [
        {customerNumber: "", customerName: "中智大库", employeeNumber: "", employeeName: "张三", IdNumber: "", workStatus: "", fundBase: "19000"},
        {customerNumber: "", customerName: "中智外包", employeeNumber: "", employeeName: "李四", IdNumber: "", workStatus: "", fundBase: "19000"},
        {customerNumber: "", customerName: "中智独立户客户1", employeeNumber: "", employeeName: "王五", IdNumber: "", workStatus: "", fundBase: "19000"},
        {customerNumber: "", customerName: "中智独立户客户2", employeeNumber: "", employeeName: "赵六", IdNumber: "", workStatus: "", fundBase: "19000"},
      ]
    }
  }
})

export default {
  fundYearAdjustMaintain
}
