import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {

  empTaskHandleDataQuery: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTaskHandle/empTaskHandleDataQuery', params);
    return await response.data;
  },

  empTaskHandleDataSave: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTaskHandle/empTaskHandleDataSave', params);
    return await response.data;
  },

  empTaskHandle: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTaskHandle/empTaskHandle', params);
    return await response.data;
  },
  empTaskNotHandle: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTaskHandle/empTaskNotHandle', params);
    return await response.data;
  },
  empTaskHandleDelay: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTaskHandle/empTaskHandleDelay', params);
    return await response.data;
  },
  empTaskHandleReject: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTaskHandle/empTaskHandleReject', params);
    return await response.data;
  },
  empTaskHandleCancel: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTaskHandle/empTaskHandleCancel', params);
    return await response.data;
  }
}
