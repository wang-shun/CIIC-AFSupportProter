import ajax from "../../lib/ajax";
/**
 * 补充医疗
 */
/**后台结构变动，现在只有一个服务*/
const ajaxApi = ajax.ajaxHmc;

const queryAcceptancePage = params => ajaxApi.postJSON("/supplyMedicalService/queryAcceptancePage", params);
const queryAcceptanceTotal = params => ajaxApi.postJSON("/supplyMedicalService/queryAcceptanceTotal", params);
const queryMedicalInvoiceDetail = params => ajaxApi.get("/supplyMedicalService/queryMedicalInvoiceDetail/" + params);
const updateMedicalInvoice = params => ajaxApi.postJSON("/supplyMedicalService/updateMedicalInvoice", params);


export default {
  queryAcceptancePage,
  queryAcceptanceTotal,
  queryMedicalInvoiceDetail,
  updateMedicalInvoice,
}
