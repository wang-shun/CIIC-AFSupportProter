/**
 * Created by huangye on 2018/1/17.
 */
import Utils from "../../../lib/utils";

const fundReconciliation = params => Utils.promise({
  data:{
    code:200,
    data: {
      reconciliationData: [
        {fundMonth: '201706', fundCompanyAccountName: '上海迈科商业保理有限公司', fundImportFile: '****.xls', fundType: '基本公积金', reconciliater: '王莺', reconciliateDate: '2017/06/01 10:05:29'},
        {fundMonth: '201706', fundCompanyAccountName: '上海迈科商业保理有限公司', fundImportFile: '****.xls', fundType: '补充公积金', reconciliater: '王莺', reconciliateDate: '2017/06/01 10:05:29'},
        {fundMonth: '201706', fundCompanyAccountName: '上海江东院文化有限责任公司', fundImportFile: '****.xls', fundType: '基本公积金', reconciliater: '王莺', reconciliateDate: '2017/06/01 10:05:29'},
        {fundMonth: '201706', fundCompanyAccountName: '上海中云资产管理有限公司', fundImportFile: '****.xls', fundType: '补充公积金', reconciliater: '王莺', reconciliateDate: '2017/06/01 10:05:29'},
        {fundMonth: '201706', fundCompanyAccountName: '上海中云资产管理有限公司', fundImportFile: '****.xls', fundType: '补充公积金', reconciliater: '王莺', reconciliateDate: '2017/06/01 10:05:29'}
      ],
      viewReconciliationData: [
        {importFundAccount: '001384727', name: '肖杨', importPayPrice: '-9323.3', systemPrice: '0', difference: '系统不存在'},
        {importFundAccount: '001423903', name: '朱肖炅', importPayPrice: '0', systemPrice: '-1904.28', difference: '导入不存在'},
        {importFundAccount: '001713899', name: '吴一平', importPayPrice: '-11347.2', systemPrice: '-2269.44', difference: '9000'},
        {importFundAccount: '001838593', name: '纪冉', importPayPrice: '19512.0', systemPrice: '3902.4', difference: ''},
        {importFundAccount: '001848940', name: '丁洁', importPayPrice: '15000.0', systemPrice: '3000.0', difference: ''},
        {importFundAccount: '001858865', name: '陈轶', importPayPrice: '19512.0', systemPrice: '3902.4', difference: ''},
        {importFundAccount: '001879686', name: '徐培', importPayPrice: '11000.0', systemPrice: '2200.0', difference: ''},
        {importFundAccount: '001946377', name: '徐敏', importPayPrice: '7000.0', systemPrice: '1400.0', difference: ''},
        {importFundAccount: '001978305', name: '徐扬华', importPayPrice: '19000.0', systemPrice: '3800.0', difference: ''},
      ]
    }
  }
})

export default {
  fundReconciliation
}
