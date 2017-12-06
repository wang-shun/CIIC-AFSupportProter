
  import {domainJson,getLocation} from '../../data/domain_info'
  import Axios from 'axios'
  import mock from '../../data/social_security/company_task_list/company_task_list_tab/c_this_month_handle_data'

export class CompanyTaskList{  
  
    // 构造   modifiedBy,modifiedTime
    // constructor(active,comAccountId,companyId,companyTaskId,createdBy,createdTime,customerId,expireDate,
    //    submitRemark,submitTime,submitterDeptId,submitterId,taskCategory,taskFormContent,taskName,taskStatus){  
    //     this.active = active
    //     this.comAccountId = comAccountId
    //     this.companyId = companyId
    //     this.companyTaskId = companyTaskId
    //     this.createdBy = createdBy
    //     this.createdTime = createdTime
    //     this.customerId = customerId
    //     this.expireDate = expireDate
    //     this.submitRemark = submitRemark
    //     this.submitTime = submitTime
    //     this.submitterDeptId = submitterDeptId
    //     this.submitterId = submitterId
    //     this.taskCategory = taskCategory
    //     this.taskFormContent =taskFormContent
    //     this.taskName = taskName
    //     this.taskStatus = taskStatus
    // }  
    // constructor(action,tid,type,customerId,companyCustomer,finishDate,sponsor,initiator,sponsorTime,notes){
    //         this.action = action
    //         this.tid =tid
    //         this.customerId = customerId
    //         this.companyCustomer = companyCustomer
    //         this.finishDate = finishDate
    //         this.sponsor = sponsor
    //         this.initiator = initiator
    //         this.sponsorTime = sponsorTime
    //         this.notes = notes
    // }
    constructor(){

    }
    //get request type
    static getTableData(params,url){
        console.log(url)
        return new Promise(function(resolve,reject){
            Axios.get(url, {params: params}) .then(function (response) {  
                console.log(response)
                let responseData = {
                  rows: [],
                  data:{
                    customerData:[],
                    taskData:[],
                    code:"",
                    totalSize:"",
                    message:""
                  }
                }
                if(response.data.code=="200"){
                    for(let i of response.data.data){
                      let obj ={}
                      obj.action=""
                      obj.tid = i.companyTaskId
                      if(i.taskCategory==1) obj.type='开户'
                      else if (i.taskCategory==2) obj.type='终止'
                      obj.customerId = i.companyId
                      obj.companyCustomer = ''
                      //obj.sponsor= '上海中智'
                      obj.sponsorTime = i.submitTime
                      obj.notes = i.submitRemark
                      obj.finishDate=i.expireDate
                      obj.initiator=i.submitterId
                      responseData.data.taskData.push(obj)
                  }
                  responseData.data.totalSize=response.data.total
                  responseData.data.code=response.data.code
                  responseData.data.message= response.data.message
                  responseData.data.customerData=mock.cThisMonthHandle.customerData
                  resolve(responseData)
                }else{
                    reject(Error('后台异常！'))
                }
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
        })
     
    }
    //post request type
    static postTableData(params,url){

      return new Promise(function(resolve,reject){

          Axios.post(url, {params: params},{headers: {"Content-Type": "application/json"}}) .then(function (response) {  
              console.log(response)
              let responseData = {
                rows: [],
                data:{
                  customerData:[],
                  taskData:[],
                  code:"",
                  totalSize:"",
                  message:""
                }
              }
              if(response.data.code=="200"){
                  for(let i of response.data.data){
                    let obj ={}
                    obj.action=""
                    obj.tid = i.companyTaskId
                    if(i.taskCategory==1) obj.type='开户'
                    else if (i.taskCategory==2) obj.type='终止'
                    obj.customerId = i.companyId
                    obj.companyCustomer = ''
                    //obj.sponsor= '上海中智'
                    obj.sponsorTime = i.submitTime
                    obj.notes = i.submitRemark
                    obj.finishDate=i.expireDate
                    obj.initiator=i.submitterId
                    responseData.data.taskData.push(obj)
                }
                responseData.data.totalSize=response.data.total
                responseData.data.code=response.data.code
                responseData.data.message= response.data.message
                responseData.data.customerData=mock.cThisMonthHandle.customerData
                resolve(responseData)
              }else{
                  reject(Error('后台异常！'))
              }
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
      })
   
  }
}

