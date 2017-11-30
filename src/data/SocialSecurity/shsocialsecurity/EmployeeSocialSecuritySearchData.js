import Utils from "../../../lib/utils";

const employeeSocialSecuritySearch = params => Utils.promise({
  data:{
    code:200,
    data:{
      customerData: [
        {
          id: 0,
          name: '客户1',
          code: 'KH001',
          nature: '企业',
          type: '国家'
        },
        {
          id: 1,
          name: '客户2',
          code: 'KH002',
          nature: '代表处',
          type: '集体'
        },
        {
          id: 2,
          name: '客户3',
          code: 'KH003',
          nature: '',
          type: '民营'
        },
        {
          id: 3,
          name: '客户4',
          code: 'KH004',
          nature: '',
          type: '合资'
        },
        {
          id: 4,
          name: '客户5',
          code: 'KH005',
          nature: '',
          type: '其他'
        },
        {
          id: 5,
          name: '客户6',
          code: 'KH006',
          nature: '其他',
          type: '其他'
        }
      ],

      sSocialSecurityTypeData: [
        {
          id: '34235329',
          name: '中智大库'
        },
        {
          id: '23434324',
          name: '中智外包'
        },
        {
          id: '56565659',
          name: '独立户-欧莱雅'
        },
        {
          id: '34543543',
          name: '独立户-迅达电梯'
        }
      ],

      employeeSocialSecurityData: [
        {
          enumber: '10001',
          ename: '郑杰',
          eidno: '356631198814020014',
          estate: '已做',
          eservice: '大客户',
          eservicercenter: '浦东',
          eaccounttype: '独立户',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          companyAccountType:'2334434',
          handlePerson:'金翔云',
          eregion: '徐汇'
        },
        {
          enumber: '10002',
          ename: '张学友',
          eidno: '356631198814020014',
          estate: '已办',
          eservice: '日本',
          eservicercenter: '浦东',
          eaccounttype: '中智大库',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '长宁'
        },
        {
          enumber: '10003',
          ename: '王大兵',
          eidno: '356631198814020014',
          estate: '转出',
          eservice: '虹桥',
          eservicercenter: '浦东',
          eaccounttype: '外包',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '徐汇'
        },
        {
          enumber: '10004',
          ename: '莉莉',
          eidno: '320106198310290811',
          estate: '已办',
          eservice: '浦东',
          eservicercenter: '浦东',
          eaccounttype: '中智大库',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '徐汇'
        },
        {
          enumber: '10005',
          ename: '郑杰',
          eidno: '320106198310290812',
          estate: '已办',
          eservice: '浦东',
          eservicercenter: '浦东',
          eaccounttype: '中智大库',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '徐汇'
        },
        {
          enumber: '10006',
          ename: '林建华',
          eidno: '320106198310290814',
          estate: '已办',
          eservice: '浦东',
          eservicercenter: '浦东',
          eaccounttype: '中智大库',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '徐汇'
        },
        {
          enumber: '10007',
          ename: '赵刚',
          eidno: '320106198310290815',
          estate: '已做',
          eservice: '徐汇',
          eservicercenter: '浦东',
          eaccounttype: '中智大库',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '徐汇'
        },
        {
          enumber: '10008',
          ename: '雇员8',
          eidno: '320106198310290816',
          estate: '已做',
          eservice: '徐汇',
          eservicercenter: '浦东',
          eaccounttype: '中智大库',
          customerNumber:'900101',
          customerName:'普思埃商业（上海）有限公司',
          eregion: '徐汇'
        }
      ],
    }
  }
})

export default {
  employeeSocialSecuritySearch
}
