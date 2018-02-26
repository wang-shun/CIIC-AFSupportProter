
import {CompanyTaskListHF} from '../company_task_list_hf'
import {domainJson} from '../../../../api/house_fund/domain_info'
export class NoProcess extends CompanyTaskListHF{
    constructor(){
        super()
    }

    //post no_process company task
    static postTableData(params){
      let url = domainJson.getNoProcessCompanyTask
      return super.postTableData(params,url)
    }

    //更新企业任务单
    static updateCompanyTask(params){
      let url = domainJson.updateCompanyTask
      return super.updateCompanyTask(params,url)
    }
}
