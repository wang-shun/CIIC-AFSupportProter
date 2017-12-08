
import {CompanyTaskList} from '../company_task_list'
import {domainJson} from '../../../data/domain_info'
export class NoProgress extends CompanyTaskList{
    constructor(){
        super()
    }

     //get request
    static getTableData(params){
       let url = domainJson.getNoProgressCompanyTask
       return super.getTableData(params,url)
    }

    //post request
    static postTableData(params){
        let url = domainJson.getNoProgressCompanyTask
        return super.postTableData(params,url)
    }

    //get customer name in company task list
    static getCustomerData(params){
        let url =domainJson.getCustomerName
        return super.getCustomerData(params,url)
    }
}