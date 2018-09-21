import ajax from "../../lib/ajax";

/**
 * 任务单
 */
const ajaxApi = ajax.ajaxHmc;

const basePaths = ajax.basePaths;
const queryWaitTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryWaitTaskPage", params);
const queryAlreadyTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryAlreadyTaskPage", params);
const updateTpaTask = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/updateTpaTask", params);
const syncToWarranty = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/syncToWarranty", params);
const queryInsuranceCompany = () => ajaxApi.get("/api/afsupportcenter/healthmedical/afTpaTask/queryInsuranceCompany");
const queryIcProductRelation = params => ajaxApi.get("/api/afsupportcenter/healthmedical/afTpaTask/queryIcProductRelation/" + params);
const changeInsuranceCompany = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/changeInsuranceCompany", params);

export default {
  basePaths,
  queryWaitTaskPage,
  queryAlreadyTaskPage,
  updateTpaTask,
  syncToWarranty,
  queryInsuranceCompany,
  queryIcProductRelation,
  changeInsuranceCompany,
}
