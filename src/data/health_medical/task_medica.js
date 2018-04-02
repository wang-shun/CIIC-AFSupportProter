import ajax from "../../lib/ajax";

/**
 * 任务单
 */
const ajaxApi = ajax.ajaxHmc;

const queryWaitTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryWaitTaskPage", params);
const queryAlreadyTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryAlreadyTaskPage", params);
const updateTpaTask = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/updateTpaTask", params);
const syncToWarranty = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/syncToWarranty", params);
const queryInsuranceCompany = () => ajaxApi.get("/api/afsupportcenter/healthmedical/afTpaTask/queryInsuranceCompany");
const queryIcProductRelation = params => ajaxApi.get("/api/afsupportcenter/healthmedical/afTpaTask/queryIcProductRelation/" + params);
const exportWaitTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/exportWaitTaskPage", params);

export default {
  queryWaitTaskPage,
  queryAlreadyTaskPage,
  updateTpaTask,
  syncToWarranty,
  queryInsuranceCompany,
  queryIcProductRelation,
  exportWaitTaskPage,
}
