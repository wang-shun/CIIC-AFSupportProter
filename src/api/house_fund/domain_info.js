let domainJson = {
	// "protcal": "http",
	// "domain": "localhost",
    // "port": 6003,

    //企业任务单相关
    //获得企业任务单
    "getCompanyTasks":"/api/fundcommandservice/hfComTask/postComTasks",
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
    //导出企业任务单列表
    "exportCompanyTasks":"/api/fundcommandservice/hfComTask/exportCompanyTasks",
    //批退任务
    "refusingTaskUrl":"/api/fundcommandservice/hfComTask/refusingTask",

    //汇缴支付相关
    //获得汇缴支付清单
    "getFundPaysUrl":"/api/fundcommandservice/hfFundPay/fundPays"

}

// let getLocation = domainJson.protcal+"://"+domainJson.domain+":"+domainJson.port
export {
    domainJson
}
