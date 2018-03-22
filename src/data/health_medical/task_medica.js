import ajax from "../../lib/ajax";

/**
 * 任务单
 */
const ajaxApi = ajax.ajaxHmc;

const queryTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryTaskPage", params);
const updateTpaTask = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/updateTpaTask", params);
const syncToWarranty = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/syncToWarranty", params);

export default {
  queryTaskPage,
  updateTpaTask,
  syncToWarranty,
}
