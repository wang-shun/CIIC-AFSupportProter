let domainJson = {
	// "protcal": "http",
	// "domain": "localhost",
    // "port": 6003,

  //todo: update with 公积金 urls

    //获得企业任务单 未处理
    "getNoProcessCompanyTask":"/api/fundcommandservice/hfComTask/postNoProcessTask",

    //处理中
    "getProgressingCompanyTask":"/api/fundcommandservice/hfComTask/postProgressingTask",

    //已完成
    "getFinshedCompanyTask":"/api/fundcommandservice/hfComTask/postFinishedTask",

    //批退
    "getRefusedCompanyTask":"/api/fundcommandservice/hfComTask/postRefusedTask",

    //获得客户名称
    "getCustomerName":"/api/fundcommandservice/cmyCompany/getCompanyName",

    //批退任务
    "refusingTaskUrl":"/api/fundcommandservice/hfComTask/refusingTask",

    //获得企业信息和材料收缴信息url
    "getCompanyInfoAndMaterialUrl":"/api/fundcommandservice/hfComTask/getCompanyInfoAndMaterial",

    //签收全部
    "signMaterialsUrl":"/api/fundcommandservice/ssComMaterial/signMaterials",

    //查询企业信息和前道传过来的JSON（包含社保截止和付款方式）
    "getComInfoAndPayWayUrl":"/api/fundcommandservice/hfComTask/getComInfoAndPayWay",

    //企业任务单开户办理页面 添加或者修改（修改是有可能填完数据 然后暂存起来）
    "addOrUpdateCompanyTaskUrl":"/api/fundcommandservice/hfComTask/addOrUpdateCompanyTask",

    //修改任务单状态（因为操作时不一定直接办理完成） 或者终止任务的完成
    "updateOrEndingTaskUrl":"/api/fundcommandservice/hfComTask/updateOrEndingTask",

    //修改任务单状态（因为操作时不一定直接办理完成） 或者转移任务的完成
    "updateOrTransferTaskUrl":"/api/fundcommandservice/ssComTask/updateOrTransferTask",

      //修改任务单状态（因为操作时不一定直接办理完成） 或者变更任务的完成
    "updateOrChangeTaskUrl":"/api/fundcommandservice/hfComTask/updateOrChangeTask",

    //任务单的撤销
    "taskRevocationUrl":"/api/fundcommandservice/hfComTask/taskRevocation",

    //企业社保管理查看页面信息
    "comSocialSecurityManageInfoUrl":"/api/fundcommandservice/ssComAccount/comSocialSecurityManageInfo",

}

// let getLocation = domainJson.protcal+"://"+domainJson.domain+":"+domainJson.port
export {
    domainJson
}
