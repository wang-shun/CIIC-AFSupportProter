import ajax from "../../lib/ajax";

/**
 * 任务单
 */
const ajaxApi = ajax.ajaxHmc;

const queryWarrantyPage = params => ajaxApi.postJSON("/warrantyService/queryWarrantyPage", params);

export default {
  queryWarrantyPage,
}
