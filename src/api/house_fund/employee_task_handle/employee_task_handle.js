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
  },
  comAccountQuery: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfEmpTaskHandle/comAccountQuery', params);
    return await response.data;
  },
  transEmpTaskQuery: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTaskHandle/transEmpTaskQuery', params);
    return await response.data;
  },
  createTransEmpTask: async (params) => {
    let response = await AJAX.postJSON('/api/fundcommandservice/hfEmpTaskHandle/createTransEmpTask', params);
    return await response.data;
  },
  minusMonths(yearMonth, months) {
    if (!yearMonth || yearMonth == '') {
      return '';
    }
    let year = yearMonth.substr(0,4);
    let month = yearMonth.substr(4,2);
    let monthInt = parseInt(month);
    let yearInt = parseInt(year);

    let years = Math.floor(months / 12);
    yearInt -= years;
    months -= years * 12;

    if (monthInt <= months) {
      yearInt --;
      monthInt = monthInt + 12 - months;
    } else {
      monthInt -= months;
    }

    if (monthInt < 10) {
      return yearInt + '0' + monthInt;
    } else {
      return yearInt + '' + monthInt;
    }
  },
  plusMonths(yearMonth, months) {
    if (!yearMonth || yearMonth == '') {
      return '';
    }
    let year = yearMonth.substr(0,4);
    let month = yearMonth.substr(4,2);
    let monthInt = parseInt(month);
    let yearInt = parseInt(year);

    let years = Math.floor(months / 12);
    yearInt += years;
    months -= years * 12;

    if (monthInt + months > 12) {
      yearInt ++;
      monthInt = monthInt + months - 12;
    } else {
      monthInt += months;
    }

    if (monthInt < 10) {
      return yearInt + '0' + monthInt;
    } else {
      return yearInt + '' + monthInt;
    }
  },
}
