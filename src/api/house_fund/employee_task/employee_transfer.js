import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

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
 

export default {

  queryTransfer: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/queryEmpTaskTransfer', params);
    return await response.data;
  },
  getCustomers:async (params)=>{
    let response = await AJAX.post('/api/fundcommandservice/hfauthority/getHfCustomerData', params);
    return await response.data;
  },

  queryTransferForNewTask: async (params) => {
    let response =await AJAX.post('/api/fundcommandservice/hfEmpTask/queryEmpTaskTransferNewTask', params);
    return await response.data;
  },
  impTemplateFile: async (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/downloadTransferTemplateFile', params);
  },
  queryComEmpTransferForm: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/queryComEmpTransferForm', params);
    return await response.data;
  },
  //提交转移任务单
  submitTransferTask: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/submitTransferTask', params);
    return await response.data;
  },
  //转移任务单不需处理
  notHandleTransfer: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/notHandleTransfer', params);
    return await response.data;
  },
  comAccountQuery: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTaskHandle/comAccountQuery', params);
    return await response.data;
  },
  printTransferTask: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/printTransferTask', params);
  },
  hfEmpTaskRejectExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/hfEmpTaskRejectExport', params);
  },
  newEmpTaskTxtExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/newEmpTaskTxtExport', params);
  },
  multiEmpTaskTransferExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/multiEmpTaskTransferExport', params);
  },
  empTaskTransferTxtExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/empTaskTransferTxtExport', params);
  },
  feedbackDateUpload: async(params) => {
    let response = await AJAX.upload('/api/fundcommandservice/hfEmpTask/feedbackDateUpload', params);
    return await response.data;
  },
  batchUpdateFeedbackDate: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/batchUpdateFeedbackDate', params);
    return await response.data;
  },
  printTransferNote: async (rows)=> {
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

}
