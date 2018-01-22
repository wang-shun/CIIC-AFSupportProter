/**
 * Created by huangye on 2018/1/16.
 */
import Utils from "../../../lib/utils";

const companyFundTaskProgressTwo = params => Utils.promise({
  data:{
    code:200,
    data: {
      customerInfo: {
        customerNumber: "KH0001",
        customerName: "上海XX信息技术有限公司",
        serviceManager: "王XX",
        customerFundEndDate: "本月15日"
      },
      materialListData: [
        {
          isLink: false,
          materialName: '营业执照',
          submitTime: '2017-7-3 12:33:33',
          materialType: '原件',
          receiveTime: '2017-7-5 12:33:33',
          status: '1',
          notes: ''
        },
        {
          isLink: false,
          materialName: '资格证',
          submitTime: '2017-7-3 12:33:33',
          materialType: '复印件',
          receiveTime: '',
          status: '1',
          notes: ''
        },
        {
          isLink: true,
          materialName: '身份证复印件',
          submitTime: '2017-7-3 12:33:33',
          materialType: '扫描件',
          receiveTime: '',
          status: '1',
          notes: ''
        },
        {
          isLink: false,
          materialName: '工商登记表',
          submitTime: '2017-7-3 12:33:33',
          materialType: '',
          receiveTime: '2017-7-5 12:33:33',
          status: '1',
          notes: ''
        }
      ],
      chatList: [
        {
          icon: '#',
          name: '社保专员',
          date: '2017-03-02 14:14:32',
          content: '材料不齐全：材料1（备注内容）  ；未签收：材料2 （备注内容）'
        },
        {
          icon: '#',
          name: '客服专员',
          date: '2017-03-05 13:16:52',
          content: '已阅'
        }
      ],
    }
  }
})

export default {
  companyFundTaskProgressTwo
}
