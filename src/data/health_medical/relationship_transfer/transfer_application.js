import Utils from "../../../lib/utils";

const ajaxq = Utils.ajaxhmq;
const ajaxc = Utils.ajaxhmc;

//query服务
const transferList = params => ajaxq.post("/api/afsupportcenter/healthmedical/queryservice/MedicalRelationTransform/getEntityList", params);
const reimbursementList = params => ajaxq.post("/api/afsupportcenter/healthmedical/queryservice/FragmentaryReimbursement/getEntityList", params);
//command服务
const transferAdd = params => ajaxc.post("/api/afsupportcenter/healthmedical/commandservice/MedicalRelationTransform/save", params);

export default {
  transferList,
  reimbursementList,
  transferAdd,
}
