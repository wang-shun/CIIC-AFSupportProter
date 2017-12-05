let domainJson = {
	"protcal": "http",
	"domain": "localhost",
    "port": 6003,
    "getCompanyTask":"/api/soccommandservice/ssComTask/getTask"
}

let getLocation = domainJson.protcal+"://"+domainJson.domain+":"+domainJson.port

export{
    domainJson,getLocation
}
