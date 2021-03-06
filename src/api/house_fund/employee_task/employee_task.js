import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {

  hfEmpTaskQuery: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/hfEmpTaskQuery', params);
    return await response.data;
  },

  hfEmpTaskExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/hfEmpTaskExport', params);
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

  empPreInputUpload: async(params) => {
    let response = await AJAX.upload('/api/fundcommandservice/hfEmpTask/empPreInputUpload', params);
    return await response.data;
  },
  downloadEmpPreInputTemplate: async (params) => {
    AJAX.download('/api/fundcommandservice/hfEmpTask/downloadEmpPreInputTemplate', params);
  },
}
