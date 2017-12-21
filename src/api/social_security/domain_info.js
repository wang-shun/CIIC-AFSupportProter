let domainJson = {
	// "protcal": "http",
	// "domain": "localhost",
    // "port": 6003,
    //获得企业任务单 未处理
    "getNoProgressCompanyTask":"/api/soccommandservice/ssComTask/getNoProgressTask",

    //处理中
    "getProgressingCompanyTask":"/api/soccommandservice/ssComTask/getProgressingTask",

    //已完成
    "getFinshedCompanyTask":"/api/soccommandservice/ssComTask/getFinshedTask",

    //批退
    "getRefusedCompanyTask":"/api/soccommandservice/ssComTask/getRefusedTask",

    //获得客户名称
    "getCustomerName":"/api/soccommandservice/cmyCompany/getCompanyName",

    //批退任务
    "refusingTaskUrl":"/api/soccommandservice/ssComTask/refusingTask",

    //获得企业信息和材料收缴信息url
    "getCompanyInfoAndMaterialUrl":"/api/soccommandservice/ssComTask/getCompanyInfoAndMaterial",

    //签收全部
    "signMaterialsUrl":"/api/soccommandservice/ssComMaterial/signMaterials",

    //查询企业信息和前道传过来的JSON（包含社保截止和付款方式）
    "getComInfoAndPayWayUrl":"/api/soccommandservice/ssComTask/getComInfoAndPayWay",

    //企业任务单开户办理页面 添加或者修改（修改是有可能填完数据 然后暂存起来）
    "addOrUpdateCompanyTaskUrl":"/api/soccommandservice/ssComTask/addOrUpdateCompanyTask",

    //修改任务单状态（因为操作时不一定直接办理完成） 或者终止任务的完成
    "updateOrEndingTaskUrl":"/api/soccommandservice/ssComTask/updateOrEndingTask",

    //修改任务单状态（因为操作时不一定直接办理完成） 或者转移任务的完成
    "updateOrTransferTaskUrl":"/api/soccommandservice/ssComTask/updateOrTransferTask",

      //修改任务单状态（因为操作时不一定直接办理完成） 或者变更任务的完成
    "updateOrChangeTaskUrl":"/api/soccommandservice/ssComTask/updateOrChangeTask",

    //企业社保管理查看页面信息
    "comSocialSecurityManageInfoUrl":"/api/soccommandservice/ssComAccount/comSocialSecurityManageInfo",
    

}

// let getLocation = domainJson.protcal+"://"+domainJson.domain+":"+domainJson.port
export {
    domainJson
}
