import ajax from "../../lib/ajax";


const AJAX = ajax.ajaxSsc;

export default {
    queryRefundDetails:async (params)=>{
        let response = await AJAX.post('/api/soccommandservice/ssEmpRefund/queryRefundDetails', params);
        return await response.data;
    }

}