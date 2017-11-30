import Utils from "../../../../lib/utils";

const cRefused = params => Utils.promise({
  data:{
    code:200,
    data: {
      customerData: [
        {
          id: 0,
          name: '普思埃商业（上海）有限公司1',
          code: 'KH001',
          nature: '企业',
          type: '国家'
        },
        {
          id: 1,
          name: '普思埃商业（上海）有限公司2',
          code: 'KH002',
          nature: '代表处',
          type: '集体'
        },
        {
          id: 2,
          name: '普思埃商业（上海）有限公司3',
          code: 'KH003',
          nature: '',
          type: '民营'
        },
        {
          id: 3,
          name: '普思埃商业（上海）有限公司4',
          code: 'KH004',
          nature: '',
          type: '合资'
        },
        {
          id: 4,
          name: '普思埃商业（上海）有限公司5',
          code: 'KH005',
          nature: '',
          type: '其他'
        },
        {
          id: 5,
          name: '普思埃商业（上海）有限公司6',
          code: 'KH006',
          nature: '其他',
          type: '其他'
        }
      ],

      taskData: [
        {
          action: '',
          tid: 'SS_KH_0001',
          type: '开户',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZC_0001',
          type: '开户',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_XJ_0001',
          type: '转移',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZC_0001',
          type: '转移',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_BJ_0001',
          type: '变更',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZZ_0001',
          type: '变更',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TZ_0001',
          type: '终止',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TZ_0001',
          type: '终止',
          customerId: '',
          companyCustomer: '普思埃商业（上海）有限公司',
          finishDate: '2017/06/30',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        }
      ]
    }
  }
})

export default {
  cRefused
}
