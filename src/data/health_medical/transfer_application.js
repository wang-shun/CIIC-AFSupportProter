import ajax from '../../lib/ajax'

const ajaxApi = ajax.ajaxHmc

const transferList = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/MedicalRelationTransform/getEntityList', params)
const transferAdd = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/MedicalRelationTransform/save', params)
const transferUpdate = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/MedicalRelationTransform/edit', params)
const reimbursementList = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/FragmentaryReimbursement/getEntityList', params)
const reimbursementAdd = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/FragmentaryReimbursement/save', params)
const reimbursementUpdate = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/FragmentaryReimbursement/edit', params)
const getEmployeeInfo = params => ajaxApi.postJSON('/api/afsupportcenter/healthmedical/FragmentaryReimbursement/getEmployeeInfo', params)

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
    getEmployeeInfo,
}
