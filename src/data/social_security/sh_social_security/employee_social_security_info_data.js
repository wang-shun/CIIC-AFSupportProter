import Utils from "../../../lib/utils";

const employeeSocialSecurityInfo = params => Utils.promise({
  data:{
    code:200,
    data:{
      customer: {
        code: 'GS170001',
        name: '普思埃商业（上海）有限公司',
        customerServicerCenter: '大客户2',
        customerServicer: '金翔云'
      }, //客户基本信息

      employee: {
        code: 'GY0001',
        name: '郑杰',
        idNo: '35220219781124114',
        checkInTime: '2017-12-1',
        socialSecurityNo: '123235564',
        education: '本科',
        socialSecurityCompanyAcount: '中智大库',
        personType: '外地',
        checkOutTime: '2017-12-1'
      }, //雇员信息

      ssinfo: {
        state: '已做',
        payBasePrice: '19000',
        payStartMonth: '201712',
        doMonth: '201712'
      },
      socialSecurityInfoListData: [
        {changeType: '', base: '19000', startTime: '201605', endTime: ''},
        {changeType: '', base: '18000', startTime: '201505', endTime: '201604'},
        {changeType: '', base: '17000', startTime: '201405', endTime: '201504'},
        {changeType: '补', base: '16000', startTime: '201305', endTime: '201404'}
      ], //社保汇缴信息

      changeListData: [
        {tid: 'XK00001', doMetod: '网上申请', changeContent: '新开', creator: 'XXX', startTime: '2015-06-01', result: '已办理'},
        {tid: 'BG00002', doMetod: '柜面办理', changeContent: '调整', creator: 'XXX', startTime: '2015-06-01', result: '不需办理'},
        {tid: 'ZC00003', doMetod: '网上申请', changeContent: '转出', creator: 'XXX', startTime: '2015-07-01', result: '批退'}
      ] //变动历史
    }
  }
})

export default {
  employeeSocialSecurityInfo
}
