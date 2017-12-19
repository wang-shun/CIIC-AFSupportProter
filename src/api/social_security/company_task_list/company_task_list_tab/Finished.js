
import {CompanyTaskList} from '../company_task_list'
import {domainJson} from '../../../../data/domain_info'
export class Finished extends CompanyTaskList{

    constructor(){
        super()

    }
    static getTableData(params){
       let url = domainJson.getFinshedCompanyTask
       return super.getTableData(params,url)
    }

    static postTableData(params){
        let url = domainJson.getFinshedCompanyTask
        return super.postTableData(params,url)
    }
}