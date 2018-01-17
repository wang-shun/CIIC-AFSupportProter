/**
 * Created by huangye on 2018/1/17.
 */
import Utils from "../../../lib/utils";

const companyFundAccountProgressTwo = params => Utils.promise({
  data:{
    code:200,
    data: {
      companyFundAccountInfo: {
        payBankValue: 0,
        payMethodValue: 0,
        companyFundAccount: "",
        companyAddFundAccount: "",
        UKeyValue: 0,
        closeAccountDate: "",
        payStartDate: "",
        notes: "",
        tmpStore: []
      },
      accountBindCompanyData: [
        {companyNumber: "1001", companyName: "公司1", serviceManager: "", bindDate: "2017-05-22 10:22"},
        {companyNumber: "1002", companyName: "公司2", serviceManager: "", bindDate: "2017-05-22 10:22"},
        {companyNumber: "", companyName: "公司3", serviceManager: "", bindDate: ""},
      ]
    }
  }
})

export default {
  companyFundAccountProgressTwo
}
