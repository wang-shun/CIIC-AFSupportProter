import ajax from "../../../lib/ajax";
//query服务
const ajaxQuery = ajax.ajaxFbq;
//command服务
const ajaxCommand = ajax.ajaxFbc;

//query服务
const giftData = params => ajaxQuery.postJSON("/giftQueryService/giftList", params);
//command服务
const giftInsert = params => ajaxCommand.upload("/giftCommandService/giftInsert", params);
const giftUpdate = params => ajaxCommand.upload("/giftCommandService/giftUpdate", params);

export default {
  giftData,
  giftInsert,
  giftUpdate,
}
