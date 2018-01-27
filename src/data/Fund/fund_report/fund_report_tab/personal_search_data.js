/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../../lib/utils";

const personalSearch = params => Utils.promise({
  data:{
    code:200,
    data: {
      lastCalculateDate: "2017-3-4 23:23",
      lastCalculater: "张三",
      personalSearchData: [
        {fundType: "公积金", employeeNumber: "09F5635", employeeName: "章佳音", fundAccount: "060407153", IdNumber: "31010219820411282X", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19512", fundPercent: "0.14", fundPrice: "2732", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11B5105", employeeName: "方蓓瑛", fundAccount: "127039247", IdNumber: "310110198812170521", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "7643", fundPercent: "0.14", fundPrice: "1070", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11C4311", employeeName: "杨阳", fundAccount: "127039259", IdNumber: "310107198605041745", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19512", fundPercent: "0.14", fundPrice: "1070", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11D8033", employeeName: "沈业佳", fundAccount: "127039284", IdNumber: "330902198901210027", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "9400", fundPercent: "0.14", fundPrice: "1316", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11F4774", employeeName: "王昕", fundAccount: "127039417", IdNumber: "42010219881002282X", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19512", fundPercent: "0.14", fundPrice: "2732", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "封存", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "启封", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "补缴", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "补缴", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12N2993", employeeName: "赵佳怡", fundAccount: "144511629", IdNumber: "310109198705233544", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9703", employeeName: "于锦", fundAccount: "048213366", IdNumber: "330203196309210676", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9704", employeeName: "李伟顺", fundAccount: "030936299", IdNumber: "310103195712170455", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9706", employeeName: "杨奕", fundAccount: "028108917", IdNumber: "310106196610011641", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9707", employeeName: "史潮", fundAccount: "048574739", IdNumber: "310101197309230012", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"}
      ]
    }
  }
})

export default {
  personalSearch
}
