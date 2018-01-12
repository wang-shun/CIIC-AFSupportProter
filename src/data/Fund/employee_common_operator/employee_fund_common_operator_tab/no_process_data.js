/**
 * Created by huangye on 2017/11/22.
 */
import Utils from "../../../../lib/utils";

const noProcess = params => Utils.promise({
  data:{
    code:200,
    data: {
      noProcessData: [
        {type: '新增（新开）', taskType: 0, emergency: '', employee: '林子晖', employeeId: 'GY009', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '基本公积金', fundAccount: '',initiator: '金翔云', sponsorTime: '2017/06/01 10:05:29'},
        {type: '新增（转入）', taskType: 0, emergency: '加急', employee: '王莺', employeeId: 'GY000', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '补充公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '调整（启封）', taskType: 1, emergency: '', employee: '周蕾', employeeId: 'GY001', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '基本公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '调整（封存）', taskType: 1, emergency: '', employee: '郑杰', employeeId: 'GY002', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '补充公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '补缴', taskType: 3, emergency: '', employee: '余好', employeeId: 'GY003', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '基本公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '离职（转出）', taskType: 2, emergency: '加急', employee: '张艳华', employeeId: 'GY004', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '补充公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '离职（封存）', taskType: 2, emergency: '', employee: '袁美玲', employeeId: 'GY005', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '基本公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '离职（封存）', taskType: 2, emergency: '', employee: '陈维兰', employeeId: 'GY006', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '补充公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''},
        {type: '离职（封存）', taskType: 2, emergency: '', employee: '俞佳伟', employeeId: 'GY008', employeeCardNumber: '', companyCustomer: '欧莱雅', customerId: '26318', fundType: '补充公积金', fundAccount: '',initiator: '金翔云', sponsorTime: ''}
      ]
    }
  }
})

export default {
  noProcess
}
