import Utils from "../../../../lib/utils";

const socialSecurityReconcilateDetail = params => Utils.promise({
  data:{
    code:200,
    data: {
      tableData: [
        {
          id: 0,
          employeeNumber: '',
          employeeName: '肖杨',
          changeType:'',
          insuranceType:'',
          project:'',
          importAmount:'-9323.3',
          systemAmount:'',
          difference:'系统不存在'
        },
        {
          id: 1,
          employeeNumber: '',
          employeeName: '朱肖炅',
          changeType:'',
          insuranceType:'',
          project:'',
          importAmount:'',
          systemAmount:'-1904.28',
          difference:'系统不存在'
        },
        {
          id: 2,
          employeeNumber: '',
          employeeName: '吴一平',
          changeType:'补缴',
          insuranceType:'养老保险',
          project:'单位补缴',
          importAmount:'-11347.2',
          systemAmount:'-2269.44',
          difference:'9000'
        },
        {
          id: 3,
          employeeNumber: '',
          employeeName: '纪冉',
          changeType:'封存',
          insuranceType:'养老保险',
          project:'个人补缴',
          importAmount:'-19512.0',
          systemAmount:'3902.4',
          difference:''
        },
        {
          id: 4,
          employeeNumber: '',
          employeeName: '丁洁',
          changeType:'转出',
          insuranceType:'养老保险',
          project:'一次性支付',
          importAmount:'15000.0',
          systemAmount:'3000.0',
          difference:'12000'
        },
        {
          id: 5,
          employeeNumber: '',
          employeeName: '陈轶',
          changeType:'转入',
          insuranceType:'医疗保险',
          project:'单位缴费额',
          importAmount:'19512.0',
          systemAmount:'3902.4',
          difference:''
        },
        {
          id: 6,
          employeeNumber: '',
          employeeName: '徐培',
          changeType:'转入',
          insuranceType:'医疗保险',
          project:'个人缴费额',
          importAmount:'11000.0',
          systemAmount:'2200.0',
          difference:'3200'
        },
        {
          id: 7,
          employeeNumber: '',
          employeeName: '徐敏',
          changeType:'转入',
          insuranceType:'医疗保险',
          project:'单位补缴',
          importAmount:'7000.0',
          systemAmount:'1400.0',
          difference:'5600'
        },
        {
          id: 8,
          employeeNumber: '',
          employeeName: '徐扬华',
          changeType:'转入',
          insuranceType:'医疗保险',
          project:'个人补缴',
          importAmount:'19000.0',
          systemAmount:'3800.0',
          difference:'15200'
        }
      ]
    }
  }
})

export default {
  socialSecurityReconcilateDetail
}
