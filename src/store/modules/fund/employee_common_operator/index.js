/**
 * Created by huangye on 2017/11/24.
 */
import EmployeeCommonOperator from './employee_fund_common_operator'
import NoProcess from './employee_fund_common_operator_tab/no_process'
import processing from './employee_fund_common_operator_tab/processing'
import finished from './employee_fund_common_operator_tab/finished'
import refused from './employee_fund_common_operator_tab/refused'

export default {
  employeeCommonOperator: EmployeeCommonOperator,
  noProcess: NoProcess,
  processing: processing,
  finished: finished,
  refused: refused
}
