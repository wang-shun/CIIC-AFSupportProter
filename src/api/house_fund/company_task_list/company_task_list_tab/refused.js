
import {CompanyTaskListHF} from '../company_task_list_hf'
import {domainJson} from '../../../../api/house_fund/domain_info'
export class Refused extends CompanyTaskListHF{
    constructor(){
        super()
    }

    //post company tasks
    static postTableData(params){
      let url = domainJson.getCompanyTasks
      return super.postTableData(params,url)
    }

}
