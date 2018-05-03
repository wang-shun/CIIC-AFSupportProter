import Utils from "../../../lib/utils";

const socialSecurityReconCilate = params => Utils.promise({
  data:{
    code:200,
    data: {
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
      tableData: [
        {
          id: 0,
          getResult: '',
          export: '',
          SocialSecurityMonth:'201706',
          companySocialSecurityType:'中智外包',
          downloadChanngeOfMonth:'',
          importFileOfSocialSecurity:'变更汇总表明细.xls',
          changeTableType:'YYS(养医失)',
          differenceNumber:'0',
          reconciliationOperator:'后道1',
          recentReconciliationTime:'2017/06/01 13:35'
        },
        {
          id: 1,
          getResult: '',
          export: '',
          SocialSecurityMonth:'201706',
          companySocialSecurityType:'中智大库',
          downloadChanngeOfMonth:'',
          importFileOfSocialSecurity:'变更汇总表明细.xls',
          changeTableType:'GSY(工生育)',
          differenceNumber:'1',
          reconciliationOperator:'后道1',
          recentReconciliationTime:'2017/06/01 13:35'
        },
        {
          id: 2,
          getResult: '',
          export: '',
          SocialSecurityMonth:'201706',
          companySocialSecurityType:'欧莱雅',
          downloadChanngeOfMonth:'',
          importFileOfSocialSecurity:'变更汇总表明细.xls',
          changeTableType:'YYS(养医失)',
          differenceNumber:'22',
          reconciliationOperator:'后道1',
          recentReconciliationTime:'2017/06/01 13:35'
        },
        {
          id: 3,
          getResult: '',
          export: '',
          SocialSecurityMonth:'201706',
          companySocialSecurityType:'中智独立户客户2',
          downloadChanngeOfMonth:'',
          importFileOfSocialSecurity:'变更汇总表明细.xls',
          changeTableType:'YYS(养医失)',
          differenceNumber:'0',
          reconciliationOperator:'后道1',
          recentReconciliationTime:'2017/06/01 13:35'
        },
        {
          id: 4,
          getResult: '',
          export: '',
          SocialSecurityMonth:'201706',
          companySocialSecurityType:'中智独立户客户3',
          downloadChanngeOfMonth:'',
          importFileOfSocialSecurity:'变更汇总表明细.xls',
          changeTableType:'YYS(养医失)',
          differenceNumber:'0',
          reconciliationOperator:'后道1',
          recentReconciliationTime:'2017/06/01 13:35'
        },
      ]
    }
  }
})

export default {
  socialSecurityReconCilate
}
