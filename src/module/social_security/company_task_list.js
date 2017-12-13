
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

        }else{
          reject(Error('后台异常！'))
        }
      }).catch(error=>{
        console.log(error)
      })

    })
  }

  //批退任务单
  static refusingTask(params){
    let url = domainJson.refusingTaskUrl
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        if(response.data.code=="200"){
            if(response.data.data){
              resolve(response.data.data)
            }
        }else{
          reject(Error('后台异常！'))
        }
      }).catch(error=>{
        console.log(error)
      })
    })
  }

  //获得企业任务单 办理页面 企业信息和材料信息
  static getCompanyInfoAndMaterial(params){
    let url =domainJson.getCompanyInfoAndMaterialUrl
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        let result = this.handleReturnData(response)
        if(!result.isError){
          let companyInfo = null
          let ssComAccountDTO =result.data.ssComAccountDTO
          if(params.operatorType=='1'){
            companyInfo = {customerNumber:result.data.companyId,
                           customerName:result.data.companyName,
                           serviceManager:""
                          }
          }else{
            companyInfo ={
              //企业社保账号
             companySocialSecurityAccount:ssComAccountDTO.ssAccount,
             //客户编号
             companyNumber:result.data.companyId,
             //参保户名称
             companyName:result.data.companyName,
             //社保中心
             socialSecurityCenter:ssComAccountDTO.settlementArea,
             //UKey密码
             uKey:ssComAccountDTO.ssPwd,
             //账户类型 1:中智大库 2中智外包 3独立户
             accountType:ssComAccountDTO.ssAccountType=='1'?'中智大库':ssComAccountDTO.ssAccountType=='2'?'中智外包':'独立户',
              //客服经理
             companyServicer:'',
              //企业社保账户状态 0初始 1有效 2 终止
             companySocialSecurityState:ssComAccountDTO.state=='0'?'初始':ssComAccountDTO.state=='1'?'有效':'终止',
             //客户社保截至日：
             companySocialSecurityEndData:ssComAccountDTO.expireDate
            }
          }
          let data = {
            companyTaskStatus:result.data.taskStatus,
            companyInfo:companyInfo==null?{}:companyInfo,
            operatorMaterialListData:[]
                     }
                    for(let obj of result.data.materialList){
                      let material = {}
                      material.id = obj.comMaterialId//材料ID
                      material.material = obj.materialName;//材料名称
                      material.materialCommitDate = obj.submitTime; //提交时间
                     //材料类型  1 原件、2  复印件、3 扫描件
                      if(obj.materialType=='1')material.materialType='原件'
                      if(obj.materialType=='2')material.materialType='复印件'
                      if(obj.materialType=='3')material.materialType='扫描件'
                      material.materialReciveDate = obj.receiveTime;//收到时间
                      material.state = obj.status;//状态
                      material.notes = obj.remark;//备注说明
                      data.operatorMaterialListData.push(material)
                    }
              resolve(data)
        }else reject(Error(result.message))
      })
    })
  }
  //终止操作最后一步页面的信息获取
  static getEndPageInfo(params){
    let url =domainJson.getCompanyInfoAndMaterialUrl
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{

        let result = this.handleReturnData(response)
        debugger
        if(!result.isError){
          let resultData = result.data
          let ssComAccountDTO =resultData.ssComAccountDTO
          let data = {
            companyTaskStatus:result.data.taskStatus,
            comAccountId:ssComAccountDTO.comAccountId,
                companyInfo:{
                    //企业社保账号
                  companySocialSecurityAccount:ssComAccountDTO.ssAccount,
                  //客户编号
                  companyNumber:result.data.companyId,
                  //参保户名称
                  companyName:result.data.companyName,
                  //社保中心
                  socialSecurityCenter:ssComAccountDTO.settlementArea,
                  //UKey密码
                  uKey:ssComAccountDTO.ssPwd,
                  //账户类型 1:中智大库 2中智外包 3独立户
                  accountType:ssComAccountDTO.ssAccountType=='1'?'中智大库':ssComAccountDTO.ssAccountType=='2'?'中智外包':'独立户',
                    //客服经理
                  companyServicer:'',
                    //企业社保账户状态 0初始 1有效 2 终止
                  companySocialSecurityState:ssComAccountDTO.state=='0'?'初始':ssComAccountDTO.state=='1'?'有效':'终止',
                  //客户社保截至日：
                  companySocialSecurityEndData:ssComAccountDTO.expireDate
                },
                historyRemark:{
                  submitName:resultData.submitterName,
                  submitTime:resultData.submitTime,
                  submitRemark:resultData.submitRemark
                },
                endOperator: {
                  taskStatus:resultData.taskStatus,
                  acceptanceDate: resultData.startHandleDate, //受理日期startHandleDate,sendCheckDate,finishDate
                  sendCheckDate: resultData.sendCheckDate, //送审日期
                  finishedDate: resultData.finishDate, //完成日期
                  endDate: ssComAccountDTO.endDate,  //终止时间
                  handleReason:resultData.handleRemark,//办理原因
                  refuseReason: resultData.rejectionRemark//批退原因
                }
             }  
              resolve(data)
        }else reject(Error(result.message))
      })
    })
  }
  //终止任务办理时 修改任务状态或者终止任务单的完成
  static updateOrEndingTask(params){
    let url =domainJson.updateOrEndingTaskUrl
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        let result = this.handleReturnData(response)
        if(!result.isError){
          let resultData = result.data      
          resolve(resultData)

        }else reject(Error(result.message))
      })
    })
  }




  //签收全部材料
  static signAllMaterials(params){
    let url = domainJson.signAllMaterialsUrl
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        //返回结果
        let result = this.handleReturnData(response)
        if(!result.isError) resolve(result) 
        else reject(Error(result.message))
      })
    })
  }

  //查询企业信息和前道传过来的JSON（包含社保截止和付款方式）
  static getComInfoAndPayWay(params){
    let url = domainJson.getComInfoAndPayWayUrl
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        debugger
        let result = this.handleReturnData(response)
        debugger
        if(!result.isError){
          //获得前台显示数据
          let data = this.ComInfoAndPayWayData(result.data)
          resolve(data)
        }else reject(Error(result.message))
    })
  })
  }



  //企业任务单 开户办理
  static addOrUpdate(params){
    let url =domainJson.addOrUpdateCompanyTaskUrl
    debugger
    return new Promise((resolve,reject)=>{
      utils.ajaxSsc.post(url,params).then(response=>{
        debugger
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
      if(response.data.data) return {data:response.data.data,message:"正常",isError:false}
       else return {data:response.data.data,message:"后台异常！",isError:true}
   }
  }

  /**
   * @param result 后台返回的数据
   */
  static ComInfoAndPayWayData(result){
    //前道传过来的社保截止和支付方式的json
    let taskFormContent =  JSON.parse(result.taskFormContent)
    //账户信息
    let ssComAccountDTO =  result.ssComAccountDTO
    //判断账户信息是否为空
    let isNull = ssComAccountDTO==null || ssComAccountDTO==""

    //行业表里信息
    let industryInfo = null
    if(!isNull && ssComAccountDTO.ssAccountRatio!=null){
      industryInfo = ssComAccountDTO.ssAccountRatio
    }

    let dispatchMaterial = []
    if(!isNull && ssComAccountDTO.dispatchMaterial!=null){
      dispatchMaterial = JSON.parse(ssComAccountDTO.dispatchMaterial)
    }
    //发出的材料
    debugger
    return {
      companyTaskStatus:result.taskStatus,
      comAccountId:isNull?'':ssComAccountDTO.comAccountId,
      companyInfo: {
            customerNumber: result.companyId,
            customerName: result.companyName,
            serviceCenter: '',
            serviceManager: ''
          },
      beforeSendInfo:{
        //客户社保截止日
        customerSocialSecurityEndDate: taskFormContent==null|| taskFormContent==""?"":taskFormContent.expireDate,
        //支付方式
        payMethodValue: taskFormContent==null|| taskFormContent==""?"":taskFormContent.paymentWay
      },
      companyOpenAccountOperator: {
            taskValue: result.taskCategory,
            taskTypeValue:result.taskStatus,//任务状态值
            joinSafeguardRegister: isNull?'':ssComAccountDTO.ssAccount, //参保户登记码
            bankCardNumber: isNull?'':ssComAccountDTO.bankAccount, //牡丹卡号
            pensionMoneyUseCompanyName: isNull?'':ssComAccountDTO.comAccountName, //养老金用公司名称
            socialSecurityCenterValue: isNull?'':ssComAccountDTO.settlementArea,//社保中心(结算区县)
            payBank: isNull?'':ssComAccountDTO.paymentBank, //付款行
            icbcSearchAccount: isNull?'':ssComAccountDTO.queryAccount, //工行查询账号
            pensionMoneySingleUserName: isNull?'':ssComAccountDTO.ssUsername, //养老金独立开户用户名
            pensionMoneySinglePassWord: isNull?'':ssComAccountDTO.ssPwd, //养老金独立开户密码
            originalSum: isNull?'':ssComAccountDTO.initialBalance, //初期余额
            originalArrears: isNull?'':ssComAccountDTO.initialDebt, //初期欠费
            resourceValue: isNull?'':ssComAccountDTO.originPlace,//来源地
            resourceNotes: isNull?'':ssComAccountDTO.originPlaceRemark, //来源地备注
            giveMethodValue: isNull?'':ssComAccountDTO.deliverWay,//交予方式
            giveMethodNotes: isNull?'':ssComAccountDTO.deliverWayRemark, //交予方式备注
            giveProofDate: isNull || ssComAccountDTO.provideCertificateTime==null ?'':new Date(ssComAccountDTO.provideCertificateTime), //交予凭证时间
            changeDate: isNull || ssComAccountDTO.changeTime==null ?'':new Date(ssComAccountDTO.changeTime), //变更时间
            recieveDate: isNull || ssComAccountDTO.receiveDate==null ?'':new Date(ssComAccountDTO.receiveDate), //收到日期
            moveInDate: isNull || ssComAccountDTO.intoDate==null ?'':new Date(ssComAccountDTO.intoDate), //转入日期
            sufferedOnTheJobPercentageId:industryInfo==null?'':industryInfo.ssAccountRatioId,//工伤历史变更表的 iD
            belongToIndustries: industryInfo==null?'':industryInfo.industryCategory, //所属行业
            sufferedOnTheJobPercentage: industryInfo==null?'':industryInfo.comRatio, //企业工伤比例
            sufferedOnTheJobPercentageChangeStartMonth: industryInfo==null?'':industryInfo.startMonth, //企业工伤比例开始调整月份
            sendedMaterials: dispatchMaterial, //发出材料
            acceptanceDate: isNull || result.startHandleDate==null?'':result.startHandleDate, //受理日期 startHandleDate,sendCheckDate,finishDate
            sendCheckDate: isNull || result.sendCheckDate==null?'':new Date(result.sendCheckDate), //送审日期
            finishedDate: isNull || result.finishDate==null?'':new Date(result.finishDate), //完成日期
            handleReason:isNull || result.handleRemark==null?'':result.handleRemark,//办理原因
            refuseReason: '' //批退原因
          }
    }
  }
  
}

