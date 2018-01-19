/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../lib/utils";

const fundYearAdjustViewDifference = params => Utils.promise({
  data:{
    code:200,
    data: {
      fundYearAdjustViewDifferenceData: [
        {importFundAccount: "001384727", name: "肖杨", importValue: "9323.3", systemValue: "", difference: "系统不存在"},
        {importFundAccount: "001423903", name: "朱肖炅", importValue: "1904.28", systemValue: "", difference: "系统不存在"},
        {importFundAccount: "001713899", name: "吴一平", importValue: "11347.2", systemValue: "2269.44", difference: "9000"},
        {importFundAccount: "001838593", name: "纪冉", importValue: "19512.0", systemValue: "3000.0", difference: "16512"},
        {importFundAccount: "001848940", name: "丁洁", importValue: "15000.0", systemValue: "3000.0", difference: ""},
        {importFundAccount: "001858865", name: "陈轶", importValue: "19512.0", systemValue: "3902.4", difference: ""},
        {importFundAccount: "001879686", name: "徐培", importValue: "11000.0", systemValue: "2200.0", difference: ""},
        {importFundAccount: "001946377", name: "徐敏", importValue: "7000.0", systemValue: "1400.0", difference: ""},
        {importFundAccount: "001978305", name: "徐扬华", importValue: "19000.0", systemValue: "3800.0", difference: ""},
      ]
    }
  }
})

export default {
  fundYearAdjustViewDifference
}
