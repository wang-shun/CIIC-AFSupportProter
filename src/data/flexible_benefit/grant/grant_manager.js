import ajax from "../../../lib/ajax";

//query服务
const ajaxQuery = ajax.ajaxFbq;
//command服务
const ajaxCommand = ajax.ajaxFbc;

//query服务
const grantList = params => ajaxQuery.postJSON("/grantQueryService/applyList", params);
const queryGiftInformation = params => ajaxQuery.postJSON("/grantQueryService/queryGiftInformation", params);
const queryMarketInformation = params => ajaxQuery.postJSON("/grantQueryService/queryMarketInformation", params);
//command服务
const grantGiftUpdate = params => ajaxCommand.postJSON("/grantQueryService/applyUpdate", params);

export default {
  grantList,
  queryGiftInformation,
  queryMarketInformation,
  grantGiftUpdate,
}
