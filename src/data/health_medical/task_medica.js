import ajax from "../../lib/ajax";

/**
 * 任务单
 */
const ajaxApi = ajax.ajaxHmc;

const queryWaitTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryWaitTaskPage", params);
const queryAlreadyTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryAlreadyTaskPage", params);
const updateTpaTask = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/updateTpaTask", params);
const syncToWarranty = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/syncToWarranty", params);

export default {
  queryWaitTaskPage,
  queryAlreadyTaskPage,
  updateTpaTask,
  syncToWarranty,
}
