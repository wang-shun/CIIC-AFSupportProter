/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../../lib/utils";

const noProcess = params => Utils.promise({
  data:{
    code:200,
    data: {
      companyData: [
        {name: '客户1', code: 'KH001', nature: '企业', type: '国家'},
        {name: '客户2', code: 'KH002', nature: '代表处', type: '集体'},
        {name: '客户3', code: 'KH003', nature: '', type: '民营'},
        {name: '客户4', code: 'KH004', nature: '', type: '合资'},
        {name: '客户5', code: 'KH005', nature: '', type: '其他'},
        {name: '客户6', code: 'KH006', nature: '', type: '其他'},
      ],
      companyFundAccountList: [
        {companyFundAccount: '34234324', companyName: '中智大库'},
        {companyFundAccount: '23434324', companyName: '中智外包'},
        {companyFundAccount: '56565659', companyName: '独立户-欧莱雅'},
        {companyFundAccount: '34543543', companyName: '独立户-迅达电梯'},
      ],
      noProcessData: [
        {type: '新增（新开）', taskType: 0, emergency: '', employee: '林子晖', employeeId: 'GY009', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: '2017/06/01 10:05:29'},
        {type: '新增（转入）', taskType: 0, emergency: '加急', employee: '王莺', employeeId: 'GY000', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '新增（转入）', taskType: 0, emergency: '', employee: '周蕾', employeeId: 'GY001', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '调整', taskType: 1, emergency: '', employee: '郑杰', employeeId: 'GY002', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '补缴', taskType: 3, emergency: '', employee: '余好', employeeId: 'GY003', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '离职（封存）', taskType: 2, emergency: '加急', employee: '张艳华', employeeId: 'GY004', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '离职（封存）', taskType: 2, emergency: '加急', employee: '袁美玲', employeeId: 'GY005', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '转移', taskType: 4, emergency: '', employee: '陈维兰', employeeId: 'GY006', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
        {type: '转移', taskType: 4, emergency: '', employee: '俞佳伟', employeeId: 'GY008', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', sponsor: '中智上海', initiator: '金翔云', sponsorTime: ''},
      ]
    }
  }
})

export default {
  noProcess
}
