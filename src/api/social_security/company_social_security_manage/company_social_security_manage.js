import ajax from "../../../lib/ajax";
import {domainJson} from "../domain_info"
const AJAX = ajax.ajaxSsc;

export default {
  //企业社保账户管理详细信息查询
  companySocialSecurityQuery: async (params) => {
    let url=domainJson.comSocialSecurityManageInfoUrl
    let response = await AJAX.post(url, params);
    let result = this.a.getData(response);
    
    if(result.code){
      return await {code:true,data:this.a.handleComSocialSecurityQueryResult(result.data)}
    }else
    return await result;
  },
  
  getData:(response)=>{
    if(response.data.code===200)return {code:true,data:response.data.data}
    else return {code:false,message:response.data.message}
  },


  //处理企业社保账户管理信息查询数据结构
  handleComSocialSecurityQueryResult:(data)=>{  
    
    data.dispatchMaterial = data.dispatchMaterial==null || data.dispatchMaterial==""?[]:JSON.parse(data.dispatchMaterial)
    let ssAccountComRelationDTOList = data.ssAccountComRelationDTOList;
    let ssAccountRatioList = data.ssAccountRatioList;
    let ssComTaskList = data.ssComTaskList;
    delete data.ssAccountComRelationDTOList;
    delete data.ssAccountRatioList;
    delete data.ssComTaskList;
    
    return {account:data,ssAccountComRelation:ssAccountComRelationDTOList,ssAccountRatio:ssAccountRatioList,ssComTask:ssComTaskList}
  }


}

