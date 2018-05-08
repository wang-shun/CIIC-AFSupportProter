import utils from '../../../lib/ajax'
import {domainJson} from "../domain_info";
let ajax = utils.ajaxHfc


//公积金转移通知书
function getFundTransferNoteObj(row){
  var html = `<div style="page-break-after:always;">
  <table cellpadding="0" cellspacing="0">
    <tr>
      <td height="85px"></td>
    </tr>
    <tr>
      <td height="20px">
        <div style="text-align: right; height: 20px; line-height: 20px; float: left; width: 240px;">${row.year}</div>
        <div style="text-align: right; height: 20px; line-height: 20px; float: left; width: 55px;">${row.month}</div>
        <div style="text-align: right; height: 20px; line-height: 20px; float: left; width: 50px;">${row.day}</div>
      </td>
    </tr>
     <tr>
      <td height="30px">
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 270px;">${row.employeeName}</div>
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 270px;">${row.fundAccount}</div>
      </td>
    </tr>
    <tr>
      <td height="35px">
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 300px;">${row.transferInUnitName}</div>
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 245px;">${row.transferOutUnitName}</div>
      </td>
    </tr>
    <tr>
      <td height="35px">
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 300px;">${row.transferInAccount}</div>
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 245px;">${row.transferOutAccount}</div>
      </td>
    </tr>
    <tr>
      <td height="35px">
        <div style="text-align: right; height: 35px; line-height: 35px; float: left; width: 300px;">${row.totalNum}</div>
      </td>
    </tr>
  </table>
</div>`;
  return html;
}

//公积金汇缴书
function getFundPayNoteObj(row){
 
  console.log(row)
  var html = `<div style="page-break-after:always;">
  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; width: 600px; height: 336px;margin-left:10px;margin-top:-67px ">
    <tr>
      <td height="60px" style="vertical-align: bottom;"></td>
    </tr>
    <tr>
      <td height="20px" style="vertical-align: bottom;">
        <div style="text-align: right;  float: left; width: 230px;">${row.curYear}</div>
        <div style="text-align: right;  float: left; width: 60px;">${row.curMonth}</div>
        <div style="text-align: right;  float: left; width: 60px;">${row.curDay}</div>
        <div style="text-align: right;  float: left; width: 145px;"></div>
      </td>
    </tr>
     <tr>
      <td height="30px" style="vertical-align: center;">
        <div style="text-align: right; float: left; width: 130px;">　</div>
        <div style="text-align: left;  float: left; width: 196px;">${row.comAccountName}</div>
        <div style="text-align: left;  float: left; width: 60px;">${row.isRemitted==null?'':row.isRemitted?'✓':''}</div>
        <div style="text-align: left;  float: left; width: 90px;">${row.paymentYear}</div>
        <div style="text-align: left;  float: left; width: 50px;">${row.paymentMonth}</div>
      </td>
    </tr>
    <tr>
      <td height="30px" style="vertical-align: top;">
      <div style="text-align: right; float: left; width: 130px;">　</div>
        <div style="text-align: left; float: left; width: 196px;">${row.hfComAccount}</div>
        <div style="text-align: left; float: left; width: 60px;">${row.isRepair==null?'':row.isRepair?'✓':''}</div>
        <div style="text-align: left; float: left; width: 90px;">${row.repairAmount==null?'':row.repairAmount}</div>
        <div style="text-align: left; float: left; width: 50px;">${row.repairCountEmp==null?'':row.repairCountEmp}</div>
      </td>
    </tr>
    <tr>
      <td height="40px" style="vertical-align: top;">
        <div style="text-align: right;  float: left; width: 110px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 294px;">${row.moneyCN}</div>
        <div style="text-align: right;  float: left; width: 120px; ">${row.remittedAmountArrange}</div>
      </td>
    </tr>
    <tr>
      <td height="20px" style="vertical-align: top;">
        <div style="height: 20px;">
          <div>
            <div style="text-align: right;  float: left; width: 85px;">${row.remittedCountEmpLast==null?'　':row.remittedCountEmpLast}</div>
            <div style="text-align: right;  float: left; width: 75px;">${row.remittedAmountLast==null?'　':row.remittedAmountLast}</div>
            <div style="text-align: right;  float: left; width: 50px;">${row.remittedCountEmpAdd==null?'　':row.remittedCountEmpAdd}</div>
            <div style="text-align: right;  float: left; width: 75px;">${row.remittedAmountAdd==null?'　':row.remittedAmountAdd}</div>
            <div style="text-align: right;  float: left; width: 45px;">${row.remittedCountEmpReduce==null?'　':row.remittedCountEmpReduce}</div>
            <div style="text-align: right;  float: left; width: 75px;">${row.remittedAmountReduce==null?'　':row.remittedAmountReduce}</div>
            <div style="text-align: right;  float: left; width: 45px;">${row.remittedCountEmp==null?'　':row.remittedCountEmp}</div>
            <div style="text-align: right;  float: left; width: 75px;">${row.remittedAmount==null?'　':row.remittedAmount}</div>
          </div>
        </div>
      </td>
    </tr>
    <tr>
      <td height="35px" style="vertical-align: center;">
        <div style="height: 35px;">
         
            <div>
            <div style="text-align: right;  float: left; width: 200px;">${row.bankName}</div>
            <div style="text-align: right;  float: left; width: 105px;"></div>
            <div style="text-align: right;  float: left; width: 70px;"></div>
          </div>
        </div>
      </td>
    </tr>
  </table>
</div>`;
return html;
}


export class FundPay {
  constructor() {
  }

  //post fund pays
  static getFundPaysTableData(params){
    console.log("===");
    console.log(params);
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
          responseData.data.fundPayData=response.data.data;
          console.log(response.data.data)
          // for(let i of response.data.data){
          //   let obj ={}
          //   obj.paymentId = i.paymentId,
          //   obj.paymentState = i.paymentState,
          //   obj.paymentBatchNum=i.paymentBatchNum
          //   obj.totalApplicationAmonut = i.totalApplicationAmonut
          //   obj.totalEmpCount = i.totalEmpCount
          //   obj.paymentMonth = i.paymentMonth
          //   obj.paymentStateValue = i.paymentStateValue
          //   obj.createPaymentUser = i.createPaymentUser
          //   obj.createPaymentDate = i.createPaymentDateString
          //   obj.financePaymentDate = i.financePaymentDateString
          //   obj.accountTypeValue = i.accountTypeValue

          //   responseData.data.fundPayData.push(obj)
          // }
          responseData.data.totalSize=response.data.total
          responseData.data.code=response.data.code
          responseData.data.message= response.data.message
          resolve(responseData)
        }else{
          reject(Error('后台异常！'))
        }
      }).catch(function (error) {
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
          responseData.data.makePayListData=response.data.data;
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
          responseData.data.operateDetailData=response.data.data
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

  static delPayment(params){
    let url ="/api/fundcommandservice/hfFundPay/delHfPayment";
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

  //获取汇缴书信息
  static getRemittedBook(params){
    let url ="/api/fundcommandservice/hfFundPay/printRemittedBook";
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:response.data.code,
            message:response.data.message,
            data:response.data.data,
        }
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  }


//付款凭证打印
  static printFinancePayVoucher(params){
    let url ="/api/fundcommandservice/hfFundPay/printFinancePayVoucher";
    return new Promise(function(resolve,reject){
      ajax.download(url, params);
    })
  }

  //基本公积金清册
  static chgDetailListExport(params){
    return new Promise(function(resolve,reject){
      ajax.download('/api/fundcommandservice/hfMonthCharge/chgDetailListExport', params);
    })
  }
  //补充公积金清册
  static repairDetailListExport(params) {
    return new Promise(function(resolve,reject){
      ajax.download('/api/fundcommandservice/hfMonthCharge/repairDetailListExport', params);
    })
  }


  static generateBankChange(params) {
    let url = domainJson.generateBankChange;
    ajax.download(url, params);
  }

  static generateBankRepair(params) {
    let url = domainJson.generateBankRepair;
    ajax.download(url, params);
  }

  static printTransferNote(rows){
    let head = `<html><head><title>上海市住房公积金转移通知书</title></head><body style="margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; line-height: 1; font-size: 12px; background-size: 600px 336px; background-repeat: no-repeat;">`;
    let foot = `</body></html>`;
    let obj = "";
    rows.forEach(function(e){
      var temp = getFundTransferNoteObj(e);
      obj += temp;
    });
    let html = head + obj + foot;
    let pwin = window.open("","print")
    pwin.document.write(html);
    pwin.document.close();
    pwin.print();
  }

  static printPayNote(rows){
    let head = `<html><head><title>上海市住房公积金汇缴书</title></head><body style="margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; line-height: 1; font-size: 12px; background-size: 600px 336px; background-repeat: no-repeat;">`;
    let foot = `</body></html>`;
    let obj = "";
    rows.forEach(function(e){
      
      var temp = getFundPayNoteObj(e);
      obj += temp;
    });
    let html = head + obj + foot;
    let pwin = window.open("","print")
    pwin.document.write(html);
    pwin.document.close();
    pwin.print();
  }
}
