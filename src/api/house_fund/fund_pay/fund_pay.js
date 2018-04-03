import utils from '../../../lib/ajax'
import {domainJson} from "../domain_info";
let ajax = utils.ajaxHfc

export class FundPay {
  constructor() {
  }

  //post fund pays
  static getFundPaysTableData(params){
    let url = domainJson.getFundPaysUrl
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
          data:{
            fundPayData:[],
            code:"",
            totalSize:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.paymentId = i.paymentId,
            obj.paymentState = i.paymentState,
            obj.paymentBatchNum=i.paymentBatchNum
            obj.totalApplicationAmonut = i.totalApplicationAmonut
            obj.totalEmpCount = i.totalEmpCount
            obj.paymentMonth = i.paymentMonth
            obj.paymentStateValue = i.paymentStateValue
            obj.createPaymentUser = i.createPaymentUser
            obj.createPaymentDate = i.createPaymentDateString
            obj.financePaymentDate = i.financePaymentDateString
            obj.accountTypeValue = i.accountTypeValue

            responseData.data.fundPayData.push(obj)
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

  //post makePay lists
  static getMakePayListsTableData(params){
    let url = domainJson.getMakePayListsUrl
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
          data:{
            makePayListData:[],
            makePayListInfo:{},
            code:"",
            totalSize:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.comAccountName = i.comAccountName
            obj.hfTypeName = i.hfTypeName
            obj.paymentStateValue = i.paymentStateValue
            obj.accountTypeValue = i.accountTypeValue
            obj.paymentBankValue = i.paymentBankValue
            obj.sumAmount = i.sumAmount
            obj.payInBackAmount = i.payInBackAmount
            responseData.data.makePayListInfo.payDate = i.paymentMonth
            responseData.data.makePayListData.push(obj)
          }
          responseData.data.makePayListInfo.rows = 0
          responseData.data.makePayListInfo.fundAccounts = 0
          responseData.data.makePayListInfo.payAmount = 0
          responseData.data.makePayListInfo.repair = 0
          responseData.data.makePayListInfo.amount = 0

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

  //post fund pays operator detail data
  static getFundPaysOperateDetailData(params){
    let url = domainJson.getFundPaysOperateDetailDataUrl
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
          data:{
            operateDetailData:[],
            code:"",
            totalSize:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.hfTypeName = i.hfTypeName
            obj.paymentMonth = i.paymentMonth
            obj.companyId = i.companyId
            obj.companyName = i.companyName
            obj.paymentBank = i.paymentBank
            obj.remittedAmount = i.remittedAmount
            obj.repairAmount = i.repairAmount
            obj.remittedCountEmp = i.remittedCountEmp
            obj.daozhangAmount = i.daozhangAmount
            obj.daozhangCountEmp = i.daozhangCountEmp
            responseData.data.operateDetailData.push(obj)
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

  //post fund pays operator edit data
  static getFundPaysOperateEditData(params){
    let url = domainJson.getFundPaysOperateEditDataUrl
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
          data:{
            operateEditData:[],
            code:"",
            totalSize:"",
            message:""
          }
        }
        if(response.data.code=="200"){
          for(let i of response.data.data){
            let obj ={}
            obj.comAccountName = i.comAccountName
            obj.hfTypeName = i.hfTypeName
            obj.paymentStateValue = i.paymentStateValue
            obj.accountTypeValue = i.accountTypeValue
            obj.paymentBankValue = i.paymentBankValue
            responseData.data.operateEditData.push(obj)
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

  //公积金汇缴支付流程操作-送审
  static processApproval(params){
    let url = domainJson.approvalUrl;
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:"",
            message:""
        }
        responseData.code=response.data.code
        responseData.message= response.data.message
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  }


  //公积金汇缴支付流程操作-汇缴
  static processPayment(params){
    let url = domainJson.paymentUrl;
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:"",
            message:""
        }
        responseData.code=response.data.code
        responseData.message= response.data.message
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  }

  //公积金汇缴支付流程操作-出票
  static processTicket(params){
    let url = domainJson.ticketUrl;
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:"",
            message:""
        }
        responseData.code=response.data.code
        responseData.message= response.data.message
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  }

  //公积金汇缴支付流程操作-回单
  static processReceipt(params){
    let url = domainJson.receiptUrl;
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:"",
            message:""
        }
        responseData.code=response.data.code
        responseData.message= response.data.message
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  }

  static createPaymentComList(params){
    let url ="/api/fundcommandservice/hfFundPay/createPaymentComList";
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:"",
            message:""
        }
        responseData.code=response.data.code
        responseData.message= response.data.message
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  }

}
