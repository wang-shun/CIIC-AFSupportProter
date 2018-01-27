import ajax from "../../../lib/ajax";

//query服务
const ajaxQuery = ajax.ajaxFbq;
//command服务
const ajaxCommand = ajax.ajaxFbc;

//query服务
const marketData = params => ajaxQuery.postJSON("/marketQueryService/marketList", params);
//command服务
const marketInsert = params => ajaxCommand.postJSON("/marketCommandService/marketActivityAdd", params);
const marketUpdate = params => ajaxCommand.postJSON("/marketCommandService/marketActivityUpdate", params);

export default {
  marketData,
  marketInsert,
  marketUpdate,
}
