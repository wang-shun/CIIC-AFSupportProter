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
          employee: '潘玉麟',
          employeeId: 'GY009',
          employeeCardNumber: '320106198310290811',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZC_0001',
          type: '调整',
          emergency: '',
          employee: '刘传宏',
          employeeId: 'GY002',
          employeeCardNumber: '31010519821011939X',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '广州特利普斯埃商业有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZC_0001',
          type: '新进转入',
          emergency: '',
          employee: '刘德敏',
          employeeId: 'GY000',
          employeeCardNumber: '11010419990101837X',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '广州特利普斯埃商业有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_XJ_0001',
          type: '新进转入',
          emergency: '是',
          employee: '张明',
          employeeId: 'GY001',
          employeeCardNumber: '356601198801150012',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '广州特利普斯埃商业有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_BJ_0001',
          type: '补缴',
          emergency: '是',
          employee: '王娜',
          employeeId: 'GY003',
          employeeCardNumber: '356601198801150012',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_ZZ_0001',
          type: '转出',
          emergency: '',
          employee: '刘学',
          employeeId: 'GY004', employeeCardNumber: '356601198801150012',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TZ_0001',
          type: '转出',
          emergency: '',
          employee: '李浩',
          employeeId: 'GY005',
          employeeCardNumber: '356601198801150012',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TZ_0001',
          type: '转出',
          emergency: '是',
          employee: '赵明',
          employeeId: 'GY006',
          employeeCardNumber: '356601198801150012',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
          sponsor: '中智上海',
          initiator: '金翔云',
          sponsorTime: '2017/06/01 10:05:29',
          notes: ''
        },
        {
          action: '',
          tid: 'SS_TQ_0001',
          type: '转出',
          emergency: '是',
          employee: '王莺',
          employeeId: 'GY008',
          employeeCardNumber: '356601198801150012',
          companySocialSecurityAccount: '9100101',
          uKey: '123456',
          doDate: '2017-12-30',
          customerId: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          finishDate: '',
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
  thisMonthHandle
}
