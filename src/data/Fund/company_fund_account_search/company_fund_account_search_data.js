/**
 * Created by huangye on 2018/1/16.
 */
import Utils from "../../../lib/utils";

const companyFundAccountSearch = params => Utils.promise({
  data:{
    code:200,
    data: {
      companyFundAccountSearchData: [
        {customerNumber: "1327", companyFundName: "上海中心大厦建设发展有限公司", customerPayDate: "201709", fundAccount: "055203-881504467", fundType: "基本公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
        {customerNumber: "1487 5051 5472", companyFundName: "俊才信息科技上海有限公司", customerPayDate: "201709", fundAccount: "055203-881504475", fundType: "基本公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
        {customerNumber: "2674 13021 15204 23568 26653", companyFundName: "上海莱尔森进出口有限公司", customerPayDate: "201709", fundAccount: "881453137", fundType: "基本公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
        {customerNumber: "4354", companyFundName: "上海迈科商业保理有限公司", customerPayDate: "201709", fundAccount: "055876-881702978", fundType: "基本公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
        {customerNumber: "4354", companyFundName: "xx有限公司4", customerPayDate: "201709", fundAccount: "055203-881720976", fundType: "补充公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
        {customerNumber: "4354", companyFundName: "xx有限公司5", customerPayDate: "201709", fundAccount: "055876-209881720977", fundType: "补充公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
        {customerNumber: "4354", companyFundName: "xx有限公司5", customerPayDate: "201709", fundAccount: "055203-881425184", fundType: "基本公积金", payProgress: "", payApplyDate: "", UKey: "", serviceManager: "", serviceCenter: "", payBank: "", notes: ""},
      ]
    }
  }
})

export default {
  companyFundAccountSearch
}
