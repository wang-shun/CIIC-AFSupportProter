/**
 * Created by huangye on 2018/1/16.
 */
import Utils from "../../../lib/utils";

const companyFundTaskProgressThree = params => Utils.promise({
  data:{
    code:200,
    data: {
      customerInfo: {
        customerNumber: "KH0001",
        customerName: "上海XX信息技术有限公司",
        serviceManager: "王XX",
        customerFundEndDate: "本月15日",
        initiater: "金翔云",
        sponsorTime: "2017-03-02 14:14:32",
        initiaterNotes: "企业公积金账号是：xxxxx，企业补充公积金账号是xxxx"
      },
      openAccountInfo: {
        changeTypeValue: 0,
        paymentBankValue: 0,
        payMethodValue: 0,
        companyFundAccount: "",
        UKeyValue: 0,
        customerPayStartDate: "",
        closeAccountEveryMonth: "25",
        professionalOperateStartDate: "",
        accpetDate: "",
        deliveredDate: "",
        finishDate: "",
        notes: ""
      }
    }
  }
})

export default {
  companyFundTaskProgressThree
}
