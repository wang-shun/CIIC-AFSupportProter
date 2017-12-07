
import {CompanyTaskList} from '../company_task_list'
import {domainJson} from '../../../data/domain_info'




export class Progressing extends CompanyTaskList{

    constructor(){
        super()
    }
    static getTableData(params){
        let url = domainJson.getProgressingCompanyTask
        debugger
        return super.getTableData(params,url)
     }
    
    static postTableData(params){
        debugger
         let url =domainJson.getProgressingCompanyTask
         return super.postTableData(params,url)
     }
}