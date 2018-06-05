import ajax from "../../../lib/ajax";

const AJAX = ajax.ajaxHfc;

export default {
  hfMonthChargeQuery: async (params) => {
    let response = await AJAX.post('/api/fundcommandservice/hfMonthCharge/hfMonthChargeQuery', params);
    return await response.data;
  },
  hfMonthChargeExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/hfMonthChargeExport', params);
  },
  chgDetailListExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/chgDetailListExport', params);
  },
  repairDetailListExport: (params) => {
    AJAX.download('/api/fundcommandservice/hfMonthCharge/repairDetailListExport', params);
  },
  printPayNote:(rows) =>{
    let head = `<html><head><title>上海市住房公积金汇缴书</title></head><body style="margin: 0; padding: 0; border: 0; font-size: 100%; font: inherit; vertical-align: baseline; line-height: 1; font-size: 12px; background-size: 600px 336px; background-repeat: no-repeat;">`;
    let foot = `</body></html>`;
    let obj = "";
    rows.forEach(function(e){
      var temp = FundPay.getFundPayNoteObj(e);
      obj += temp;
    });
    let html = head + obj + foot;
    let pwin = window.open("","print")
    pwin.document.write(html);
    pwin.document.close();
    pwin.print();
  },
  //获取汇缴书信息
   getRemittedBook:(params) =>{
    let url ="/api/fundcommandservice/hfFundPay/printRemittedBookByCom";
    return new Promise(function(resolve,reject){
      ajax.post(url, params).then(function (response) {
        let responseData = {
            code:response.data.code,
            message:response.data.message,
            data:response.data.data,
        }
        resolve(responseData)
      }).catch(function (error) {
          console.log(error);
          reject(error);
        });
    })
  },
}
