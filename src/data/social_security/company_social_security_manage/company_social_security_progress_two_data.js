import Utils from "../../../lib/utils";

const companySocialSecurityProgress2 = params => Utils.promise({
  data:{
    code:200,
    data: {
      companyInfo: {
        customerNumber: 'GS170001',
        customerName: '普思埃商业（上海）有限公司',
        serviceCenter: '大客户2',
        serviceManager: '金翔云'
      },

      operatorMaterialListData: [
        {
          isLink: false,
          material: '材料1',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '原件',
          materialReciveDate: '2017-7-5 12:33:33',
          state: '1',
          operator: '',
          notes: ''
        },
        {
          isLink: false,
          material: '材料2',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '复印件',
          materialReciveDate: '',
          state: '1',
          operator: '',
          notes: ''
        },
        {
          isLink: false,
          material: '材料3',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '扫描件',
          materialReciveDate: '',
          state: '1',
          operator: '',
          notes: ''
        },
        {
          isLink: false,
          material: '材料4',
          materialCommitDate: '2017-7-3 12:33:33',
          materialType: '压缩文件',
          materialReciveDate: '2017-7-5 12:33:33',
          state: '1',
          operator: '',
          notes: ''
        }
      ],

      chatList: [
        {
          icon: '#',
          name: '社保专员',
          date: '2017-03-02 14:14:32',
          content: '材料不齐全：材料1(备注内容)； 未签收：材料2(备注内容)'
        },
        {
          icon: '#',
          name: '客服专员',
          date: '2017-03-05 13:16:52',
          content: '已阅'
        },
        {
          icon: '#',
          name: '社保专员',
          date: '2017-03-06 13:16:52',
          content: '材料1'
        }
      ]
    }
  }
})

export default {
  companySocialSecurityProgress2
}
