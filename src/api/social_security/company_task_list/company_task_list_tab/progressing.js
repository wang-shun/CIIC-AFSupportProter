
import {CompanyTaskList} from '../company_task_list'
import {domainJson} from '../../../../api/social_security/domain_info'

export class Progressing extends CompanyTaskList{

    constructor(){
        super()
    }
    static getTableData(params){
        let url = domainJson.getProgressingCompanyTask
        return super.getTableData(params,url)
     }
    static postTableData(params){
         let url =domainJson.getProgressingCompanyTask
         return super.postTableData(params,url)
     }

}