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

  hfEmpTaskBatchReject: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTask/hfEmpTaskBatchReject', params);
    return await response.data;
  },

}
