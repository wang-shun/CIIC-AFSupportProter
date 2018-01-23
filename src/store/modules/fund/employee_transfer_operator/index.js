/**
 * Created by huangye on 2018/1/15.
 */
import EmployeeTransferOperator from './employee_fund_transfer_operator'
import EmployeeFundTransferProgressTwo from './employee_fund_transfer_progress_two'
import tNoProcess from './employee_fund_transfer_operator_tab/t_no_process'
import tProcessed from './employee_fund_transfer_operator_tab/t_processed'
import tRefused from './employee_fund_transfer_operator_tab/t_refused'

export default {
  employeeTransferOperator: EmployeeTransferOperator,
  employeeFundTransferProgressTwo: EmployeeFundTransferProgressTwo,
  tNoProcess: tNoProcess,
  tProcessed: tProcessed,
  tRefused: tRefused
}
