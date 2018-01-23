/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../../lib/utils";

const step2 = params => Utils.promise({
  data:{
    code:200,
    data: {
      step2Data: [
        {fundType: "基本公积金", changeYear: "2017", companyAccountCategory: "中智大库", beforeCollectStatus: "未收集", changeStatus: "未调整", beforeImportEmployees: "50000", afterUploadPeoples: "49000", matchSuccess: "49000", matchFailed: "0"},
        {fundType: "基本公积金", changeYear: "2017", companyAccountCategory: "中智外包", beforeCollectStatus: "确认收集完毕", changeStatus: "未调整", beforeImportEmployees: "", afterUploadPeoples: "", matchSuccess: "", matchFailed: ""},
        {fundType: "基本公积金", changeYear: "2017", companyAccountCategory: "中智独立户客户1", beforeCollectStatus: "未收集", changeStatus: "未调整", beforeImportEmployees: "", afterUploadPeoples: "", matchSuccess: "", matchFailed: ""},
        {fundType: "补充公积金", changeYear: "2017", companyAccountCategory: "中智独立户客户2", beforeCollectStatus: "确认收集完毕", changeStatus: "调整成功", beforeImportEmployees: "", afterUploadPeoples: "", matchSuccess: "", matchFailed: ""},
        {fundType: "补充公积金", changeYear: "2017", companyAccountCategory: "中智独立户客户3", beforeCollectStatus: "确认收集完毕", changeStatus: "调整成功", beforeImportEmployees: "", afterUploadPeoples: "", matchSuccess: "", matchFailed: ""}
      ]
    }
  }
})

export default {
  step2
}
