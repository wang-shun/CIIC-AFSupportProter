/**
 * Created by huangye on 2018/1/16.
 */
import Utils from "../../../../lib/utils";

const lNoProcess = params => Utils.promise({
  data:{
    code:200,
    data: {
      lNoProcessData: [
        {taskType: "开户", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "转入", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "转入", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "转入", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "变更", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "变更", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "终止", fundType: "基本公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"},
        {taskType: "销户", fundType: "补充公积金", customerNumber: "26318", customerName: "欧莱雅", managers: "王莺", customerPayStartDate: "", payMethod: "", UKey: "", serviceManager: "", initiator: "金翔云", sponsorTime: "2017/06/01 10:05:29"}
      ],
      createData: [
        {customerNumber: "KH001", customerName: "欧莱雅（法国）有限公司"},
        {customerNumber: "KH002", customerName: "客户2"},
        {customerNumber: "KH003", customerName: "客户3"},
        {customerNumber: "KH003", customerName: "客户3"},
        {customerNumber: "KH003", customerName: "客户3"},
      ]
    }
  }
})

export default {
  lNoProcess
}
