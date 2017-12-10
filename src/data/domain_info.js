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
    "getCompanyInfoAndMaterialUrl":"/api/soccommandservice/ssComTask/getCompanyInfoAndMaterial"
    
}

// let getLocation = domainJson.protcal+"://"+domainJson.domain+":"+domainJson.port

export{
    domainJson
}
