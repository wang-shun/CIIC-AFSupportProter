import Utils from "../../../../lib/utils";

const thisMonthHandle = params => Utils.promise({
  data:{
    code:200,
    data: {
      customerData: [
        {
          id: 0,
          name: '普思埃商业（上海）有限公司',
          code: 'KH001',
          nature: '企业',
          type: '国家'
        },
        {
          id: 1,
          name: '普思埃商业（上海）有限公司',
          code: 'KH002',
          nature: '代表处',
          type: '集体'
        },
        {
          id: 2,
          name: '普思埃商业（上海）有限公司',
          code: 'KH003',
          nature: '',
          type: '民营'
        },
        {
          id: 3,
          name: '普思埃商业（上海）有限公司',
          code: 'KH004',
          nature: '',
          type: '合资'
        },
        {
          id: 4,
          name: '普思埃商业（上海）有限公司',
          code: 'KH005',
          nature: '',
          type: '其他'
        },
        {
          id: 5,
          name: '普思埃商业（上海）有限公司',
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

      employeeResultData: [
        {
          action: '',
          tid: 'SS_KH_0001',
          type: '新进转入',
          emergency: '是',
          employee: '刘传宏',
          employeeId: 'GY009',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '前客服1',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZC_0001',
          type: '新进转入',
          emergency: '',
          employee: '刘浩',
          employeeId: 'GY000',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_XJ_0001',
          type: '新进转入',
          emergency: '是',
          employee: '张明',
          employeeId: 'GY001',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZC_0001',
          type: '调整',
          emergency: '',
          employee: '何洁',
          employeeId: 'GY002',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_BJ_0001',
          type: '补缴',
          emergency: '是',
          employee: '王娜',
          employeeId: 'GY003',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZZ_0001',
          type: '转出',
          emergency: '',
          employee: '刘学',
          employeeId: 'GY004', employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TZ_0001',
          type: '转出',
          emergency: '',
          employee: '李浩',
          employeeId: 'GY005',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TZ_0001',
          type: '转出',
          emergency: '是',
          employee: '赵明',
          employeeId: 'GY006',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TQ_0001',
          type: '转出',
          emergency: '',
          employee: '王莺',
          employeeId: 'GY008',
          employeeCardNumber: '',
          companySocialSecurityAccount: '',
          uKey: '',
          doDate: '',
          customerId: '',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '',
          initiator: '',
          sponsorTime: '',
          notes: ''
        }
      ]
    }
  }
})

export default {
  thisMonthHandle
}
