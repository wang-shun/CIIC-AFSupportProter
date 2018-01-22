/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../../lib/utils";

const step1 = params => Utils.promise({
  data:{
    code:200,
    data: {
      step1Data: [
        {dataCollectStatus: "未开始", adjustYear: "2017", customerName: "客户1"},
        {dataCollectStatus: "收集中", adjustYear: "2017", customerName: "客户2"},
        {dataCollectStatus: "确认数据无误", adjustYear: "2017", customerName: "中智独立户客户1"},
        {dataCollectStatus: "确认数据无误", adjustYear: "2017", customerName: "中智独立户客户2"},
        {dataCollectStatus: "未开始", adjustYear: "2017", customerName: "中智独立户客户3"}
      ]
    }
  }
})

export default {
  step1
}
