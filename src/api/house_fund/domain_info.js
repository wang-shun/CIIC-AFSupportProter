let domainJson = {
	// "protcal": "http",
	// "domain": "localhost",
    // "port": 6003,

  //todo: update with 公积金 urls

    //获得企业任务单 未处理
    "getNoProcessCompanyTask":"/api/fundcommandservice/hfComTask/postNoProcessTask",

    //企业任务单提交或修改
    "updateCompanyTask":"/api/fundcommandservice/hfComTask/updateCompanyTask",

    //企业任务单提交或修改（变更）
    "updateCompanyTaskChangeInfo":"/api/fundcommandservice/hfComTask/updateCompanyTaskChangeInfo",

    //企业任务单提交或修改（终止）
    "updateCompanyTaskEndInfo":"/api/fundcommandservice/hfComTask/updateCompanyTaskEndInfo",

    //获得企业任务单支付方式数据
    "getCompanyTaskPaymentWayData":"/api/fundcommandservice/hfComTask/getCompanyTaskPaymentWayData",

    //获得企业任务单任务状态数据
    "getCompanyTaskTaskStatusData":"/api/fundcommandservice/hfComTask/getCompanyTaskTaskStatusData",

    //获得企业任务单任务状态数据
    "getCompanyTaskEndTypeData":"/api/fundcommandservice/hfComTask/getCompanyTaskEndTypeData",





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
