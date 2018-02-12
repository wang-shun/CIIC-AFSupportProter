
import {CompanyTaskListHF} from '../company_task_list_hf'
import {domainJson} from '../../../../api/house_fund/domain_info'
export class NoProcess extends CompanyTaskListHF{
    constructor(){
        super()
    }

    //post request
    static postTableData(params){
        let url = domainJson.getNoProcessCompanyTask
        return super.postTableData(params,url)
    }

}
