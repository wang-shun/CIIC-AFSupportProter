/**
 * Created by huangye on 2018/1/12.
 */
import Utils from "../../../../lib/utils";

const sProcessed = params => Utils.promise({
  data:{
    code:200,
    data: {
      sProcessedData: [
        {type: '个人信息修改', emergency: '', employee: '林子晖', employeeId: 'GY009', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: '2017/06/01 10:05:29'},
        {type: '账户合并', emergency: '加急', employee: '王莺', employeeId: 'GY000', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''},
        {type: '外地公积金转入', emergency: '', employee: '周蕾', employeeId: 'GY001', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''},
        {type: '特殊补缴', emergency: '', employee: '郑杰', employeeId: 'GY002', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''},
        {type: '错缴更正', emergency: '', employee: '余好', employeeId: 'GY003', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''},
        {type: '贷款复议', emergency: '加急', employee: '张艳华', employeeId: 'GY004', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''},
        {type: '公积金提取', emergency: '', employee: '袁美玲', employeeId: 'GY005', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''},
        {type: '公积金提取', emergency: '', employee: '陈维兰', employeeId: 'GY006', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', initiator: '金翔云', sponsorTime: ''}
      ]
    }
  }
})

export default {
  sProcessed
}
