
  import {domainJson} from '../../../api/social_security/domain_info'
  import Axios from 'axios'
  import utils from '../../../lib/ajax'
  let ajax = utils.ajaxSsc
export class CompanyTaskList{

    constructor(){

    }
    //get request type
    static getTableData(params,url){
        return new Promise(function(resolve,reject){
          ajax.get(url, params) .then(function (response) {
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
                      obj.tid = i.comTaskId
                      if(i.taskCategory==1) obj.type='开户'
                      //1:开户：2：转入 3：变更 4：终止
                      else if (i.taskCategory==2) obj.type='转入'
                      else if (i.taskCategory==3) obj.type='变更'
                      else if(i.taskCategory==4)  obj.type='终止'
                      if(i.taskStatus==1){
                        obj.taskStatus = '已受理'
                      }else{
                        obj.taskStatus = '已送审'
                      }
                      obj.customerId = i.companyId
                      obj.companyCustomer = i.companyName
                      obj.sponsorTime = i.submitTime
                      obj.notes = i.submitRemark
                      obj.finishDate=i.expireDate
                      obj.createdTime=i.createdTime
                      obj.createdDisplayName=i.createdDisplayName
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
            reject(error);
          });
        })

    }

    static excelExport(url,params){
      return new Promise(function(resolve,reject){
        ajax.download(url, params);
      });
    }

    //post request type
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
                    obj.action=""
                    obj.tid = i.comTaskId
                    if(i.taskCategory==1) obj.type='开户'
                    //1:开户：2：转入 3：变更 4：终止
                    else if (i.taskCategory==2) obj.type='转入'
                    else if (i.taskCategory==3) obj.type='变更'
                    else if(i.taskCategory==4)  obj.type='终止'
                    if(i.taskStatus==1){
                      obj.taskStatus = '已受理'
                    }else{
                      obj.taskStatus = '已送审'
                    }
                    
                    obj.customerId = i.companyId
                    obj.companyCustomer = i.companyName
                    obj.sponsorTime = i.submitTime
                    obj.notes = i.submitRemark
                    obj.finishDate=i.expireDate
                    obj.submitterName=i.submitterName
                    obj.createdTime=i.createdTime
                    obj.createdDisplayName=i.createdDisplayName
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
          reject(error);
        });
      })

  }


  //get customer name
  static getCustomerData(params,url){
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
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
      ajax.post(url,params).then(response=>{
        if(response.data.code=="200"){
            if(response.data.data){
              resolve(response.data.data)
            }
        }else{
          alert(response.data.message)

        }
      }).catch(error=>{
        alert(error)
        console.log(error)

      })
    })
  }

  //获得企业任务单 办理页面 企业信息和材料信息
  static getCompanyInfoAndMaterial(params){
    let url =domainJson.getCompanyInfoAndMaterialUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{

        let result = this.handleReturnData(response)
        if(!result.isError){
          let companyInfo = null
          let ssComAccountBO =result.data.ssComAccountBO
          //1 表示开户
          if(params.operatorType=='1'){

            companyInfo = {
                          customerNumber:result.data.companyId,
                           customerName:result.data.companyName,
                           leaderShipName:result.data.leaderShipName
                          }
          }else{

            companyInfo ={
              //企业社保账号
             companySocialSecurityAccount:ssComAccountBO.ssAccount,
             //客户编号
             companyNumber:result.data.companyId,
             //参保户名称
             companyName:result.data.companyName,
             //社保中心
             socialSecurityCenter:ssComAccountBO.settlementArea,
             //UKey密码
             uKey:ssComAccountBO.ssPwd,
             //社保账户类型 1:中智大库 2中智外包 3独立户
             accountType:ssComAccountBO.ssAccountType=='1'?'中智大库':ssComAccountBO.ssAccountType=='2'?'中智外包':'独立户',
              //客服经理
              leaderShipName:result.data.leaderShipName,
              //企业社保账户状态 0初始 1有效 2 终止
             companySocialSecurityState:ssComAccountBO.state=='0'?'初始':ssComAccountBO.state=='1'?'有效':'终止',
             //客户社保截至日：
             companySocialSecurityEndData:ssComAccountBO.expireDate
            }
          }
          let data = {
            companyTaskStatus:result.data.taskStatus,
            companyInfo:companyInfo==null?{}:companyInfo,
            operatorMaterialListData:this.getMaterial(result.data.materialList)
                     }

              resolve(data)
        }else reject(Error(result.message))
      })
    })
  }
  //终止操作最后一步页面的信息获取
  static getEndPageInfo(params,type){
    let url =domainJson.getCompanyInfoAndMaterialUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{

        let result = this.handleReturnData(response)
        if(!result.isError){
            let data =this.theLastStepGetDate(result,type)
              resolve(data)
        }else reject(Error(result.message))
      })
    })
  }
  //终止任务办理时 修改任务状态或者终止任务单的完成
  static updateOrEndingTask(params){
    let url =domainJson.updateOrEndingTaskUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        if(response.data.code=="200"){
          resolve(response.data.data)
       }else{
         reject(Error("终止操作后台异常！"))
       }
      })
    })
  }
   //转入任务办理时 修改任务状态或者终止任务单的完成
   static updateOrTransferTask(params){
    let url =domainJson.updateOrTransferTaskUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        if(response.data.code=="200"){
          resolve(response.data.data)
       }else{
         reject(Error("转入操作后台异常！"))
       }
      })
    })
  }

  //转入任务办理时 修改任务状态或者终止任务单的完成
  static updateOrChangeTask(params){
    let url =domainJson.updateOrChangeTaskUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        if(response.data.code=="200"){
          resolve(response.data.data)
       }else{
         reject(Error("转入操作后台异常！"))
       }
      })
    })
  }

  //最后一步获得数据 终止和转入 变更
  static theLastStepGetDate(result,type){

    let resultData = result.data
    let ssComAccountBO =resultData.ssComAccountBO
    //材料信息
    let operatorMaterialListData = this.getMaterial(result.data.materialList)

    let data = {
          companyTaskStatus:result.data.taskStatus,
          comAccountId:ssComAccountBO.comAccountId,
          companyInfo:{
              //企业社保账号
            companySocialSecurityAccount:ssComAccountBO.ssAccount,
            //客户编号
            companyNumber:result.data.companyId,
            //参保户名称
            companyName:result.data.ssComAccountBO.comAccountName,
            //社保中心
            socialSecurityCenter:ssComAccountBO.settlementArea,
            //UKey密码
            uKey:ssComAccountBO.ssPwd,
            //社保账户类型 1:中智大库 2中智外包 3独立户
            accountType:ssComAccountBO.ssAccountType=='1'?'中智大库':ssComAccountBO.ssAccountType=='2'?'中智外包':'独立户',
              //客服经理
            leaderShipName:result.data.ssComAccountBO.leaderShipName,
              //企业社保账户状态 0初始 1有效 2 终止
            companySocialSecurityState:ssComAccountBO.state=='0'?'初始':ssComAccountBO.state=='1'?'有效':'终止',
            //客户社保截至日：
            companySocialSecurityEndData:ssComAccountBO.expireDate
          },
          historyRemark:{
            submitName:resultData.submitterName,
            submitTime:resultData.submitTime,
            submitRemark:resultData.submitRemark
          },
          operatorMaterialListData:operatorMaterialListData
       }
       let common ={
         taskStatus:resultData.taskStatus,
        acceptanceDate: resultData.startHandleDate, //受理日期startHandleDate,sendCheckDate,finishDate
        sendCheckDate: resultData.sendCheckDate, //送审日期
        finishedDate: resultData.finishDate, //完成日期
        submitRemark: resultData.submitRemark,
        handleRemark:resultData.handleRemark,//办理原因
        refuseReason: resultData.rejectionRemark//批退原因
      }
       if(type=='end'){
          data.endOperator= {
            ...common,
            endDate: ssComAccountBO.endDate,  //终止时间
          }
       }
       if(type=='transfer'){
        let dynamicExtend = resultData.dynamicExtend
        let settlementArea= ssComAccountBO.settlementArea//结算区县
        let transferDate = null;
        //如果扩展字段有值显示扩展字段
        if(dynamicExtend!=null && dynamicExtend!=""){
          let res = JSON.parse(dynamicExtend)
          settlementArea = res.settlementArea==""||res.settlementArea==null?settlementArea:res.settlementArea
          transferDate = res.transferDate
        }
        data.transferOperator= {
          ...common,
          regionValue: settlementArea,
          transferDate: transferDate
        }
     }
     if(type=='change'){
          //changeOperator
          let dynamicExtendRes = resultData.dynamicExtend
          //如果扩展字段有值显示扩展字段
          let changeContentValue =null//变更类型
          let payMethodValue = null//付款方式
          let billReceiverValue=null //账单接收方
          let pensionMoneyUseCompanyName = null//养老金公司名称
          let belongsIndustry = null//所属行业
          let companyWorkInjuryPercentage = null//企业工伤比例
          let changeStartMonth=null//变更开始月份
          if(dynamicExtendRes!=null && dynamicExtendRes!=""){
              let res = JSON.parse(dynamicExtendRes)
              changeContentValue = res.changeContentValue
          if(changeContentValue=='1'){//工伤比例变更

              belongsIndustry = res.belongsIndustry
              companyWorkInjuryPercentage =res.companyWorkInjuryPercentage
              changeStartMonth = res.startMonth
          }else if(changeContentValue=='2'){
              payMethodValue = res.paymentWay
              billReceiverValue = res.billReceiver

          }else if(changeContentValue=='3'){
              pensionMoneyUseCompanyName = res.comAccountName
            }
          }
          changeContentValue = (changeContentValue==null || changeContentValue=='')?'1':changeContentValue
          data.changeOperator = {
            ...common,
            changeContentValue,
            payMethodValue,
            billReceiverValue,
            pensionMoneyUseCompanyName,
            belongsIndustry,
            companyWorkInjuryPercentage,
            changeStartMonth
          }
     }

       return data
  }

  //签收全部材料
  static signMaterials(params){
    let url = domainJson.signMaterialsUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
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
      ajax.post(url,params).then(response=>{

        let result = this.handleReturnData(response)

        if(!result.isError){
          //获得前台显示数据
          let data = this.comInfoAndPayWayData(result.data)
          resolve(data)
        }else reject(Error(result.message))
    })
  })
  }



  //企业任务单 开户办理
  static addOrUpdate(params){
    let url =domainJson.addOrUpdateCompanyTaskUrl
    return new Promise((resolve,reject)=>{
      ajax.post(url,params).then(response=>{
        let result = this.handleReturnDataNew(response)
        if(!result.isError){
          //获得前台显示数据
          resolve({result:true,message:result.message})
        }else reject(Error(result.message))
    })
  })
  }
  //处理返回值
  static handleReturnDataNew(response){
     return {message:response.data.message,isError:false}
  }

  //任务单的撤销
  static taskRevocation(params){
    let url =domainJson.taskRevocationUrl
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

  /**
   * @param result 后台返回的数据
   */
  static comInfoAndPayWayData(result){
    //前道传过来的社保截止和支付方式的json
    let taskFormContent = null;
    if(typeof(result.taskFormContent)!='undefined'){
      taskFormContent =  JSON.parse(result.taskFormContent);
    }

    //账户信息
    let ssComAccountBO =  result.ssComAccountBO;
    //判断账户信息是否为空
    let isNull = ssComAccountBO==null || ssComAccountBO=="";

    let expireDateFront = "";
    let paymentWay = "";
    let paymentType = "";
    let billReceiver = "";
    if(isNull){
      expireDateFront =taskFormContent==null|| taskFormContent==""?"":taskFormContent.expireDateFront;
      paymentWay = taskFormContent==null|| taskFormContent==""?"":String(taskFormContent.paymentWay);
      paymentType = taskFormContent==null|| taskFormContent==""?"":String(taskFormContent.paymentType);
      billReceiver = taskFormContent==null|| taskFormContent==""?"":String(taskFormContent.billReceiver);
    }else{
      expireDateFront = ssComAccountBO.expireDate
      paymentWay = ssComAccountBO.paymentWay
      paymentType = ssComAccountBO.paymentType
      billReceiver = ssComAccountBO.billReceiver
    }

    //行业表里信息
    let industryInfo = null
    if(!isNull && ssComAccountBO.ssAccountRatio!=null){
      industryInfo = ssComAccountBO.ssAccountRatio
    }else{
      industryInfo={}
      industryInfo.industryCategory=result.industryCategory
    }

    let dispatchMaterial = []
    if(!isNull && ssComAccountBO.dispatchMaterial!=null){
      dispatchMaterial = JSON.parse(ssComAccountBO.dispatchMaterial)
    }else{
      if(typeof(result.dispatchMaterial)!="undefined"){
        dispatchMaterial = JSON.parse(result.dispatchMaterial)
      }

    }
    //发出的材料
    return {
      companyTaskStatus:result.taskStatus,
      comAccountId:isNull?'':ssComAccountBO.comAccountId,
      companyInfo: {
            customerNumber: result.companyId,
            customerName: result.companyName,
            serviceCenter: '',
            leaderShipName: result.leaderShipName
          },
      beforeSendInfo:{
        //客户社保截止日
        customerSocialSecurityEndDate: String(expireDateFront),
        //支付方式
        payMethodValue: String(paymentWay),
        billReceiverValue:String(billReceiver),
        paymentType:paymentType,
      },
      companyOpenAccountOperator: {
            taskValue: result.taskCategory,
            taskTypeValue:result.taskStatus,//任务状态值
            joinSafeguardRegister: isNull?'':ssComAccountBO.ssAccount, //参保户登记码
            bankCardNumber: isNull?result.bankAccount:ssComAccountBO.bankAccount, //牡丹卡号
            pensionMoneyUseCompanyName: isNull?'':ssComAccountBO.comAccountName, //养老金用公司名称
            socialSecurityCenterValue: isNull?result.settlementArea:ssComAccountBO.settlementArea,//社保中心(结算区县)
            payBank: isNull?'':ssComAccountBO.paymentBank, //付款行
            icbcSearchAccount: isNull?'':ssComAccountBO.queryAccount, //工行查询账号
            pensionMoneySingleUserName: isNull?'':ssComAccountBO.ssUsername, //养老金独立开户用户名
            pensionMoneySinglePassWord: isNull?'':ssComAccountBO.ssPwd, //养老金独立开户密码
            //originalSum: isNull?'':ssComAccountBO.initialBalance, //初期余额
            //originalArrears: isNull?'':ssComAccountBO.initialDebt, //初期欠费
            resourceValue: isNull?'':ssComAccountBO.originPlace,//来源地
            resourceNotes: isNull?'':ssComAccountBO.originPlaceRemark, //来源地备注
            giveMethodValue: isNull?'':ssComAccountBO.deliverWay,//交予方式
            giveMethodNotes: isNull?'':ssComAccountBO.deliverWayRemark, //交予方式备注
            //giveProofDate: isNull || ssComAccountBO.provideCertificateTime==null ?'':ssComAccountBO.provideCertificateTime, //交予凭证时间
            changeDate: isNull || ssComAccountBO.changeTime==null ?'':ssComAccountBO.changeTime, //变更时间
            recieveDate: isNull || ssComAccountBO.receiveDate==null ?'':ssComAccountBO.receiveDate, //收到日期
            moveInDate: isNull || ssComAccountBO.intoDate==null ?'':ssComAccountBO.intoDate, //转入日期
            sufferedOnTheJobPercentageId:industryInfo==null?'':industryInfo.ssAccountRatioId,//工伤历史变更表的 iD
            belongToIndustries: industryInfo==null?'':industryInfo.industryCategory, //所属行业
            sufferedOnTheJobPercentage: industryInfo==null?'':industryInfo.comRatio, //企业工伤比例
            sufferedOnTheJobPercentageChangeStartMonth: industryInfo==null?'':industryInfo.startMonth, //企业工伤比例开始调整月份
            sendedMaterials: dispatchMaterial, //发出材料
            acceptanceDate:result.startHandleDate==null?'':result.startHandleDate, //受理日期 startHandleDate,sendCheckDate,finishDate
            sendCheckDate:result.sendCheckDate==null?'':result.sendCheckDate, //送审日期
            finishedDate:result.finishDate==null?'':result.finishDate, //完成日期
            handleRemark:result.handleRemark==null?'':result.handleRemark,//办理原因
            submitRemark:result.submitRemark==null?'':result.submitRemark,//发起人备注
            rejectionRemark:result.rejectionRemark==null?'':result.rejectionRemark, //批退原因
            state : isNull || ssComAccountBO.state==null ?'':ssComAccountBO.state
          }
    }
  }
  //获得材料信息
  static getMaterial(materialList){
    let operatorMaterialListData =[]
    for(let obj of materialList){
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
      operatorMaterialListData.push(material)
    }
    return operatorMaterialListData
  }

}

