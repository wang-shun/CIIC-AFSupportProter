import Utils from "../../../lib/utils";

const companySocialSecurityNew = params => Utils.promise({
  data:{
    code:200,
    data:{
      company: {
        companySocialSecurityAccount: '12123235',
        companyNumber: 'GS170001',
        companyName: '普思埃商业（上海）有限公司',
        socialSecurityCenter: '徐汇',
        uKey: '152243',
        accountType: '独立户',
        companySocialSecurityState: '有效\\封存\\终止',
        companySocialSecurityEndData: '本月18日',
        companyServicer: '金翔云',
        serviceCenter: '大客户2'
      }, //企业社保账户信息

      employee: {
        code: 'GY0001',
        name: '郑杰',
        idNo: '320106198310290811',
        checkInTime: '2017-12-1',
        education: '本科',
        socialSecurityIndex: '123235564',
        companySocialSecurityAccount: '中智大库',
        residenceAddress: '上海市人民路100号1203',
        contactAddress: '上海市人民路100号1203',
        personType: '外地',
        socialSecurityType: '中智大库'
      }, //雇员信息

      taskNewInfo: {
        afDate: '2017-05-06',
        storePlace: '外来从业人员',
        jobState: '已用工',
        jobDate: '2017-06-1'
      },
      taskNewInfoData: [
        {base: '18000', startMonth: '201712', endYear: ''},
      ], //任务单参考信息 -- 新增
      taskNewInfoData1: [
        {base: '18000', startMonth: '201712', endYear: ''},

      ], //任务单参考信息 -- 新增
      
      taskChangeInfo: {
        newPay: '18000',
        changeStartMonth: '201712',
        changeEndMonth: '201712'
      }, //任务单参考信息 -- 调整

      taskOutInfo: {
        state: '已退工',
        leaveDate: '2017-6-24',
        socialSecurityEndDate: '201706'
      }, //任务单参考信息 -- 退工
    }
  }
});

export default {
  companySocialSecurityNew
}
