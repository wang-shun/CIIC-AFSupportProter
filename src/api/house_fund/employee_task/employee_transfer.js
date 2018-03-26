import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {

  queryTransfer: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/queryEmpTaskTransfer', params);
    return await response.data;
  },

  queryTransferForNewTask: async (params) => {
    let response =await AJAX.post('/api/fundcommandservice/hfEmpTask/queryEmpTaskTransferNewTask', params);
    return await response.data;
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
}
