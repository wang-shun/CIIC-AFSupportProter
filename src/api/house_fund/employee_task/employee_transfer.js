import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

//公积金转移通知书
function getFundTransferNoteObj(row){
  var html = `

  <div style="page-break-after:always;">
  <table cellpadding="0" cellspacing="0"  style="border-collapse: collapse; border-spacing: 0; width: 600px; margin-left:22px;margin-top:-95px" >
    <tr>
      <td height="140px" style="vertical-align: bottom;">  
      <div style="text-align: left;  float: right; width: 150px;">${row.paymentBank}</div>
      </td>
    </tr>
    <tr>
      <td height="35px" style="vertical-align: center;">
        <div style="text-align: right;  float: left; width: 235px;">${row.createdByYYYY}</div>
        <div style="text-align: right;  float: left; width: 55px;">${row.createdByMM}</div>
        <div style="text-align: right;  float: left; width: 50px;">${row.createdByDD}</div>
      </td>
    </tr>
     <tr>
      <td height="30px">
        <div style="text-align: left;  float: left; width: 90px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 170px;">${row.employeeName}</div>
        <div style="text-align: left;  float: left; width: 110px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 170px;">${row.hfEmpAccount==null?'':row.hfEmpAccount}</div>
      </td>
    </tr>
    <tr style="padding: 0">
      <td height="35px">
        <div style="text-align: left;  float: left; width: 130px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 197px;">${row.inUnitName==null?'':row.inUnitName}</div>
        <div style="text-align: left;  float: left; width: 60px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 200px;">${row.outUnitName==null?'':row.outUnitName}</div>
      </td>
    </tr>
    <tr>
      <td height="35px">
        <div style="text-align: left;  float: left; width: 130px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 197px;">${row.inComAccount==null?'':row.inComAccount}</div>
        <div style="text-align: left;  float: left; width: 60px;">&nbsp;</div>
        <div style="text-align: left;  float: left; width: 170px;">${row.outComAccount==null?'':row.outComAccount}</div>
      </td>
    </tr>
    <tr>
      <td height="35px">
        <div style="text-align: right;  float: left; width: 300px;"></div>
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
  checkEmpTransferEndMonthSame: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/checkEmpTransferEndMonthSame', params);
    return await response.data;
  },
  empToCenterTransferExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/empToCenterTransferExport', params);
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
  getPrintTransfer: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/getPrintTransfer', params);
    return await response.data;
  },
  batchPrintNote: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/batchPrintNote', params);
    return await response.data;
  },
  printTransferNote: async (rows)=> {
    let head =`<html><head><title>上海市住房公积金转移通知书</title></head><body style="margin: 0; padding: 0; border: 0;  font: inherit; vertical-align: baseline; line-height: 1; font-size: 8px;background-size: 600px 336px; background-repeat: no-repeat;">`;
    let foot = `</body></html>`;
    let obj = getFundTransferNoteObj(rows[0]);
    let html = head + obj + foot;
    let pwin = window.open("","print")
    pwin.document.write(html);
    pwin.document.close();
    pwin.print();
 },

}
