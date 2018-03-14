import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {

  queryTransfer: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTask/queryTransfer', params);
    return await response.data;
  },

  queryTransferNew: (params) => {
    AJAX.post('/api/fundcommandservice/hfEmpTask/queryTransferNew', params);
  },

  hfEmpTaskRejectQuery: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/hfEmpTaskRejectQuery', params);
    return await response.data;
  },

  hfEmpTaskRejectExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/hfEmpTaskRejectExport', params);
  },

  hfEmpTaskBatchReject: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/hfEmpTaskBatchReject', params);
    return await response.data;
  },

  newEmpTaskTxtExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/newEmpTaskTxtExport', params);
  },
}
