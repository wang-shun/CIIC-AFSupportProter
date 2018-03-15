import ajax from "../../lib/ajax";

/**
 * 任务单
 */
const ajaxApi = ajax.ajaxHmc;

const queryTaskPage = params => ajaxApi.postJSON("/api/afsupportcenter/healthmedical/afTpaTask/queryTaskPage", params);

export default {
  queryTaskPage,
}
