import Utils from "../../../lib/utils";

const ajaxq = Utils.ajaxhmq;
const ajaxc = Utils.ajaxhmc;

//query服务
const transferList = params => ajaxq.post("/api/afsupportcenter/healthmedical/queryservice/MedicalRelationTransform/getEntityList", params);
const reimbursementList = params => ajaxq.post("/api/afsupportcenter/healthmedical/queryservice/FragmentaryReimbursement/getEntityList", params);
//command服务

export default {
  transferList,
  reimbursementList,
}
