import ajax from "../../../lib/ajax";

//query服务
const ajaxQuery = ajax.ajaxFbq;
//command服务
const ajaxCommand = ajax.ajaxFbc;

//query服务
const fbqBasePaths = ajax.fbqBasePaths;
const grantList = params => ajaxQuery.postJSON("/grantQueryService/applyList", params);
const queryGiftInformation = params => ajaxQuery.postJSON("/grantQueryService/queryGiftInformation", params);
const queryMarketInformation = params => ajaxQuery.postJSON("/grantQueryService/queryMarketInformation", params);
const getSubDepartmentsOfLevel = () => ajaxQuery.get("/grantQueryService/getSubDepartmentsOfLevel");
//command服务
const giftGrantUpdate = params => ajaxCommand.postJSON("/grantCommandService/updateGiftApplyGrant", params);
const marketGrantUpdate = params => ajaxCommand.postJSON("/grantCommandService/updateMarketApplyGrant", params);

export default {
  fbqBasePaths,
  grantList,
  queryGiftInformation,
  queryMarketInformation,
  getSubDepartmentsOfLevel,
  giftGrantUpdate,
  marketGrantUpdate,
}
