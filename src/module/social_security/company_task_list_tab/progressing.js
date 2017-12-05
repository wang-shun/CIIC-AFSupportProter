
import {CompanyTaskList} from '../company_task_list'
import {domainJson,getLocation} from '../../../data/domain_info'
export class NoProgress extends CompanyTaskList{

    constructor(){
        super()

    }
    static getTableData(params){

       let url = getLocation+domainJson.getCompanyTask
       return super.getTableData(params,url)
    }

    static postTableData(params){
        let url = getLocation+domainJson.getCompanyTask
        return super.postTableData(params,url)
    }
}