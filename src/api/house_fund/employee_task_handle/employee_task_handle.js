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
  }
}
