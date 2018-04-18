
  import {domainJson} from '../../../api/house_fund/domain_info'
  import utils from '../../../lib/ajax'
  import tools from '../../../lib/tools'
  let ajax = utils.ajaxHfc
export class CompanyTaskListHF{
    constructor(){
    }

    //post company task  不要问下面代码为何这么写，要么重构，要么内心深处接纳它
    static postTableData(params,url){
      return new Promise(function(resolve,reject){
        ajax.post(url, params).then(function (response) {
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
                    //开户页面参数
                    let companyInfo={}
                    let openAccountInfo={}
                    //变更页面参数
                    let companyFundAccountInfo={}
                    let changeOperator={}
                    //终止页面参数
                    let endOperator={}
                    //已完成任务单参数
                    let companyTaskInfo={}

                    obj.action=""
                    obj.comTaskId = i.comTaskId
                    obj.companyId = i.companyId
                    obj.companyName = i.companyName
                    obj.taskCategoryName = i.taskCategoryName
                    obj.hfTypeName = i.hfTypeName
                    obj.comTaskPaymentWayName = i.comTaskPaymentWayName
                    obj.initiator = i.submitterName
                    obj.sponsorTime = i.submitTimeString
                    //开户-companyInfo传参
                    companyInfo.customerNumber = i.companyId
                    companyInfo.customerName = i.companyName
                    companyInfo.serviceManager = ""
                    companyInfo.customerFundEndDate = i.closeDay
                    companyInfo.initiater = i.submitterName
                    companyInfo.sponsorTime = i.submitTimeString
                    companyInfo.initiaterNotes = i.submitRemark
                    obj.companyInfo = companyInfo
                    //开户-openAccountInfo传参
                    openAccountInfo.comAccountId=i.comAccountId
                    openAccountInfo.comAccountClassId=i.comAccountClassId
                    openAccountInfo.changeTypeValue = i.taskCategory
                    openAccountInfo.paymentBankValue = i.paymentBank
                    openAccountInfo.payMethodValue = i.paymentWay
                    openAccountInfo.companyFundAccountName = i.comAccountName
                    openAccountInfo.companyFundAccountNum = i.hfComAccount
                    //openAccountInfo.accountTempStoreTypeValue = i.accountTempStoreTypeValue
                    openAccountInfo.UKeyValue = i.ukeyStore
                    openAccountInfo.taskStatus=i.taskStatus  //任务单状态
                    console.log('====')
                    console.log(i.operateStrartMonth)
                    openAccountInfo.customerPayStartDate = i.comStartMonth
                    openAccountInfo.closeAccountEveryMonth = i.closeDay
                    openAccountInfo.operateStrartMonth = i.operateStrartMonth
                    if (i.startHandleDateString!=''){
                      openAccountInfo.acceptDate = tools.parseDate(i.startHandleDateString)
                    }
                    if (i.sendCheckDateString!=''){
                      openAccountInfo.deliveredDate = tools.parseDate(i.sendCheckDateString)
                    }
                    if (i.finishDateString!=''){
                      openAccountInfo.finishDate = tools.parseDate(i.finishDateString)
                    }
                    openAccountInfo.notes = i.comAccountRemark
                    obj.openAccountInfo = openAccountInfo

                    //变更-companyFundAccountInfo传参
                    if(i.hfType=="1") {
                      companyFundAccountInfo.customerBasicFundAccount = i.hfComAccount
                      companyFundAccountInfo.lastPayMonth = i.endMonth //末次汇缴月只用基本公积金
                    }
                    if(i.hfType=="2"){
                      companyFundAccountInfo.customerAddFundAccount = i.hfComAccount
                    }
                    companyFundAccountInfo.companyFundAccountStatus = i.comAccountStateValue
                    companyFundAccountInfo.paymentBank = i.paymentBankValue
                    companyFundAccountInfo.closeDay = i.closeDay
                    companyFundAccountInfo.payMethodValue = i.comTaskPaymentWayName
                    companyFundAccountInfo.UKeyValue = i.ukStoreValue
                    companyFundAccountInfo.customerNumber = i.companyId
                    companyFundAccountInfo.customerName = i.companyName
                    companyFundAccountInfo.accountType = i.typeValue
                    console.log(i.taskStatus);
                    companyFundAccountInfo.taskStatus=i.taskStatus  //任务单状态
                    obj.companyFundAccountInfo = companyFundAccountInfo
                    //变更-changeOperator传参
                    changeOperator.comAccountName = i.comAccountName
                    changeOperator.paymentTypeValue = i.paymentWay
                    changeOperator.taskStatusValue = i.taskStatus
                    obj.changeOperator = changeOperator

                    //终止-endOperator传参
                    endOperator.endMonth = i.endMonth
                    obj.endOperator = endOperator

                    //已完成任务单参数
                    // companyTaskInfo.changeTypeValue = i.changeTypeValue
                    companyTaskInfo.paymentBankValue = i.paymentBankValue
                    companyTaskInfo.payMethodValue = i.comTaskPaymentWayName
                    companyTaskInfo.endTypeValue = i.endTypeValue
                    companyTaskInfo.companyFundAccountName = i.comAccountName
                    companyTaskInfo.companyFundAccountNum = i.hfComAccount
                    companyTaskInfo.UKeyValue = i.ukStoreValue
                    companyTaskInfo.closeAccountEveryMonth = i.closeDay
                    companyTaskInfo.acceptDate = i.startHandleDateString
                    companyTaskInfo.deliveredDate = i.sendCheckDateString
                    companyTaskInfo.finishDate = i.finishDateString

                    obj.companyTaskInfo = companyTaskInfo

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

  //更新企业任务单
  static updateCompanyTask(params){
    let url = domainJson.updateCompanyTask
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        let result = this.handleReturnData(response)
        if(!result.isError){
          //获得前台显示数据
          resolve(true)
        }else reject(Error(result.message))
      })
    })
  }

  //更新企业任务单（变更）
  static updateCompanyTaskChangeInfo(params){
    let url = domainJson.updateCompanyTaskChangeInfo
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        let result = this.handleReturnData(response)
        if(!result.isError){
          //获得前台显示数据
          resolve(true)
        }else reject(Error(result.message))
      })
    })
  }

  //更新企业任务单（终止）
  static updateCompanyTaskEndInfo(params){
    let url = domainJson.updateCompanyTaskEndInfo
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        let result = this.handleReturnData(response)
        if(!result.isError){
          //获得前台显示数据
          resolve(true)
        }else reject(Error(result.message))
      })
    })
  }

  //处理返回值
  static handleReturnData(response){
    if(response.data.code=="200"){
      return {data:response.data.data,message:"正常",isError:false}
    }else return {message:"后台异常！",isError:true}
  }

  static expExcel(params){
    let url = domainJson.exportCompanyTasks
    return new Promise(function(){
      ajax.download(url, params);
    });
  }

  //获取企业任务单支付方式数据
  static getCompanyTaskPaymentWayData(){
    let url = domainJson.getCompanyTaskPaymentWayData
    return new Promise(function(resolve,reject){
      ajax.get(url).then(function (response) {
        let responseData = {
          data:{
            paymentTypeList:[],
            code:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.value = i.paymentwayCode
            obj.label = i.paymentwayValue
            responseData.data.paymentTypeList.push(obj)
          }
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

  //获取企业任务单数据
  static getCompanyTaskEndTypeData(){
    let url = domainJson.getCompanyTaskEndTypeData
    return new Promise(function(resolve,reject){
      ajax.get(url).then(function (response) {
        let responseData = {
          data:{
            endTypeList:[],
            code:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.value = i.endTypeCode
            obj.label = i.endTypeValue
            responseData.data.endTypeList.push(obj)
          }
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

  //获取企业任务单任务状态数据
  static getCompanyTaskTaskStatusData(){
    let url = domainJson.getCompanyTaskTaskStatusData
    return new Promise(function(resolve,reject){
      ajax.get(url).then(function (response) {
        let responseData = {
          data:{
            taskStatusList:[],
            code:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.value = i.taskStatusCode
            obj.label = i.taskStatusValue
            obj.disabled = i.disabled
            responseData.data.taskStatusList.push(obj)
          }
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

}

