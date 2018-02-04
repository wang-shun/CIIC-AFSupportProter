import Utils from "../../lib/utils";

const ajaxq = Utils.ajaxhmq;
const ajaxc = Utils.ajaxhmc;

//query服务
const transferList = params => ajaxq.post("/api/afsupportcenter/healthmedical/queryservice/MedicalRelationTransform/getEntityList", params);
const reimbursementList = params => ajaxq.post("/api/afsupportcenter/healthmedical/queryservice/FragmentaryReimbursement/getEntityList", params);
//command服务
const transferAdd = params => ajaxc.post("/api/afsupportcenter/healthmedical/commandservice/MedicalRelationTransform/save", params);
const transferUpdate = params => ajaxc.post("/api/afsupportcenter/healthmedical/commandservice/MedicalRelationTransform/edit", params);
const reimbursementAdd = params => ajaxc.post("/api/afsupportcenter/healthmedical/commandservice/FragmentaryReimbursement/save", params);
const reimbursementUpdate = params => ajaxc.post("/api/afsupportcenter/healthmedical/commandservice/FragmentaryReimbursement/edit", params);

/**
 * 医疗关系转移
 */
export default {
  transferList,
  reimbursementList,
  transferAdd,
  reimbursementAdd,
  transferUpdate,
  reimbursementUpdate,
}
