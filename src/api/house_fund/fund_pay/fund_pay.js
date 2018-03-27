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
            responseData.data.makePayListData.push(obj)
          }
          responseData.data.makePayListInfo.payDate = 'n/a'
          responseData.data.makePayListInfo.rows = response.data.total
          responseData.data.makePayListInfo.fundAccounts = 'n/a'
          responseData.data.makePayListInfo.payAmoun = 'n/a'
          responseData.data.makePayListInfo.repair = 'n/a'
          responseData.data.makePayListInfo.amount = 'n/a'

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

}
