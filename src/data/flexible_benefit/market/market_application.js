import Utils from "../../../lib/utils";

const ajaxq = Utils.ajaxFbq;
const ajaxc = Utils.ajaxFbc;

//query服务
const marketData = params => ajaxq.post("/marketQueryService/marketList", params);
//command服务
const marketInsert = params => ajaxc.post("/marketCommandService/marketActivityAdd", params);
const marketUpdate = params => ajaxc.post("/marketCommandService/marketActivityUpdate", params);

export default {
  marketData,
  marketInsert,
  marketUpdate,
}
