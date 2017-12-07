
  import {domainJson} from '../../data/domain_info'
  import Axios from 'axios'
  import utils from '../../lib/utils'

export class CompanyTaskList{  
    constructor(){

    }
    //get request type
    static getTableData(params,url){
        console.log(url)
        return new Promise(function(resolve,reject){
            Axios.get(url, {params: params}) .then(function (response) {  
                console.log(response)
                let responseData = {
                  data:{
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
                      //1:开户：2：终止 3：变更 4 转移
                      else if (i.taskCategory==2) obj.type='终止'
                      else if (i.taskCategory==3) obj.type='变更'
                      else if(i.taskCategory==4)  obj.type='转移'
                      obj.customerId = i.companyId
                      obj.companyCustomer = i.companyName
                      obj.sponsorTime = i.submitTime
                      obj.notes = i.submitRemark
                      obj.finishDate=i.expireDate
                      obj.initiator=i.submitterId
                      responseData.data.taskData.push(obj)
                  }
                  responseData.data.totalSize=response.data.total
                  responseData.data.code=response.data.code
                  responseData.data.message= response.data.message
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
          utils.ajaxSsc.post(url, params).then(function (response) {  
              console.log(response)
              let responseData = {
                data:{
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
                    //1:开户：2：转移 3：变更 4：终止
                    else if (i.taskCategory==2) obj.type='转移'
                    else if (i.taskCategory==3) obj.type='变更'
                    else if(i.taskCategory==4)  obj.type='终止'
                    obj.customerId = i.companyId
                    obj.companyCustomer = i.companyName
                    obj.sponsorTime = i.submitTime
                    obj.notes = i.submitRemark
                    obj.finishDate=i.expireDate
                    obj.initiator=i.submitterId
                    responseData.data.taskData.push(obj)
                }
                responseData.data.totalSize=response.data.total
                responseData.data.code=response.data.code
                responseData.data.message= response.data.message
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


  //get customer name 
  static getCustomerData(params,url){
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        if(response.data.code=="200"){

          debugger
        }else{
          reject(Error('后台异常！'))
        }
      }).catch(error=>{
        console.log(error)
      })

    })
  }
}

