import Utils from "../../lib/utils";

const ajax = Utils.ajaxEw;


const marketData = params => ajax.post("/market/marketList",params)

export default {
  marketData
}
