/**
 * Created by huangye on 2018/1/17.
 */
import Utils from "../../../lib/utils";

const makePayList = params => Utils.promise({
  data:{
    code:200,
    data: {
      makePayListData: [
        {fundAccountName: "上海中云资产管理有限公司", fundType: "基本公积金", payStatus: "可付", fundAccountType: "独立户", settleBank: "徐汇建行"},
        {fundAccountName: "上海中云资产管理有限公司", fundType: "补充公积金", payStatus: "未到账", fundAccountType: "独立户", settleBank: "徐汇建行"},
        {fundAccountName: "上海中闫资产管理有限公司", fundType: "基本公积金", payStatus: "无需支付", fundAccountType: "独立户", settleBank: "徐汇建行"},
        {fundAccountName: "上海西域机电系统有限公司", fundType: "补充公积金", payStatus: "已付", fundAccountType: "独立户", settleBank: "徐汇建行"}
      ],
      makePayListInfo: {
        payDate: "201708",
        rows: 4,
        fundAccounts: 4,
        payAmount: 1000,
        repair: 1000,
        amount: 2000
      }
    }
  }
})

export default {
  makePayList
}
