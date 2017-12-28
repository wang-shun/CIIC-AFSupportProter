import Utils from "../../../lib/utils";

const ajaxq = Utils.ajaxFbq;
// const ajaxc = Utils.ajaxFbc;
const ajaxData = Utils.ajaxData;

//query服务
const giftData = params => ajaxq.post("/giftQueryService/giftList", params);
//command服务
const giftInsert = params => ajaxData.post("/giftCommandService/giftInsert", params);
const giftUpdate = params => ajaxData.post("/giftCommandService/giftUpdate", params);

export default {
  giftData,
  giftInsert,
  giftUpdate,
}

/*const giftData = params => Utils.promise({
  data:{
    code:200,
    data: {
      data6: [
        {
          acceptanceId: "儿童节礼品",
          employeeId: "1000元以下",
          employeeName: "199",
          companyId: "460",
          companyname: "儿童节礼品",
          state: "正常"
        },
        {
          acceptanceId: "书记《用人大师》",
          employeeId: "1000元以下",
          employeeName: "48",
          companyId: "5",
          companyname: "全球500强企业的用人之道",
          state: "已下架"
        }
      ],
      peopleTypes: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "雇员"
        },
        {
          value: "2",
          label: "子女"
        },
        {
          value: "3",
          label: "配偶"
        }
      ]
    }
  }
})*/

