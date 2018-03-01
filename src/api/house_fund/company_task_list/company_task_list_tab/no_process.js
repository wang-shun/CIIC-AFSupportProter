
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

    //更新企业任务单(变更)
    static updateCompanyTaskChangeInfo(params){
      let url = domainJson.updateCompanyTaskChangeInfo
      return super.updateCompanyTaskChangeInfo(params,url)
    }

    //更新企业任务单(终止)
    static updateCompanyTaskEndInfo(params){
      let url = domainJson.updateCompanyTaskEndInfo
      return super.updateCompanyTaskEndInfo(params,url)
    }

    //获取企业任务单支付方式数据
    static getCompanyTaskPaymentWayData(){
      let url = domainJson.getCompanyTaskPaymentWayData
      return super.getCompanyTaskPaymentWayData(url)
    }

    //获取企业任务单任务状态数据
    static getCompanyTaskTaskStatusData(){
      let url = domainJson.getCompanyTaskTaskStatusData
      return super.getCompanyTaskTaskStatusData(url)
    }

    //获取企业任务单终止类型数据
    static getCompanyTaskEndTypeData(){
      let url = domainJson.getCompanyTaskEndTypeData
      return super.getCompanyTaskEndTypeData(url)
    }
}
