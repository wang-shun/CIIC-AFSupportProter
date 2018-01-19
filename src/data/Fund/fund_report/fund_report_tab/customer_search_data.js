/**
 * Created by huangye on 2018/1/19.
 */
import Utils from "../../../../lib/utils";

const customerSearch = params => Utils.promise({
  data:{
    code:200,
    data: {
      lastCalculateDate: "2017-3-4 23:23",
      lastCalculater: "张三",
      customerSearchData: [
        {fundType: "公积金", employeeNumber: "09F5635", employeeName: "章佳音", fundAccount: "060407153", IdNumber: "31010219820411282X", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19512", fundPercent: "0.14", fundPrice: "2732", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11B5105", employeeName: "方蓓瑛", fundAccount: "127039247", IdNumber: "310110198812170521", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "7643", fundPercent: "0.14", fundPrice: "1070", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11C4311", employeeName: "杨阳", fundAccount: "127039259", IdNumber: "310107198605041745", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19512", fundPercent: "0.14", fundPrice: "1070", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11D8033", employeeName: "沈业佳", fundAccount: "127039284", IdNumber: "330902198901210027", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "9400", fundPercent: "0.14", fundPrice: "1316", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11F4774", employeeName: "王昕", fundAccount: "127039417", IdNumber: "42010219881002282X", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19512", fundPercent: "0.14", fundPrice: "2732", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "封存", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "启封", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "补缴", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "11P7283", employeeName: "罗得一", fundAccount: "157221015", IdNumber: "320402198810252513", payMonth: "2017.07", actMonth: "2017.07", payType: "补缴", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12N2993", employeeName: "赵佳怡", fundAccount: "144511629", IdNumber: "310109198705233544", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9703", employeeName: "于锦", fundAccount: "048213366", IdNumber: "330203196309210676", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9704", employeeName: "李伟顺", fundAccount: "030936299", IdNumber: "310103195712170455", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9706", employeeName: "杨奕", fundAccount: "028108917", IdNumber: "310106196610011641", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"},
        {fundType: "公积金", employeeNumber: "12R9707", employeeName: "史潮", fundAccount: "048574739", IdNumber: "310101197309230012", payMonth: "2017.07", actMonth: "2017.07", payType: "标准", fundBase: "19000", fundPercent: "0.14", fundPrice: "2660", companyNumber: "18130", companyName: "", companyFundAccount: "882222694"}
      ],
      fundPayChangeInfo: {
        companyName: "花旗银行(中国有限公司)",
        listId: "18130",
        basicFundAccount: "882222694",
        payYear: "2017",
        payMonth: "07",
        amountPage: "3",
        currentPage: "1",
        list:{
          add: [
            {index: 1, changeType: "开户", name: "徐亚一", IdNumber: "362301199003311531", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 2, changeType: "开户", name: "石悦", IdNumber: "14010619921104304X", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 3, changeType: "开户", name: "杨天儒", IdNumber: "5101081991108080629", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 4, changeType: "开户", name: "饶钥", IdNumber: "420111199409115027", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 5, changeType: "开户", name: "李欣阳", IdNumber: "341002199308251045", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 6, changeType: "开户", name: "赵怡思", IdNumber: "130104199210041822", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 7, changeType: "开户", name: "陈俐孜", IdNumber: "612524199311044883", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 8, changeType: "开户", name: "张思宇", IdNumber: "440106199304210020", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 9, changeType: "开户", name: "曾霄霄", IdNumber: "130104199012011841", fundType: "新开", payEveryMonth: "1820.00", salary: "13000.00", payPercent: "7%"},
            {index: 10, changeType: "开户", name: "李雨萌", IdNumber: "410403199009095746", fundType: "新开", payEveryMonth: "1120.00", salary: "8000.00", payPercent: "7%"}
          ],
          desc: [
            {fundAccount: "165543620", name: "李翔", notes: "封存", payEveryMonth: "1952.00"},
            {fundAccount: "061856885", name: "罗丽丽", notes: "封存", payEveryMonth: "2732.00"},
            {fundAccount: "058080697", name: "叶碧灵", notes: "封存", payEveryMonth: "2732.00"},
            {fundAccount: "134189553", name: "毛越", notes: "封存", payEveryMonth: "2142.00"},
            {fundAccount: "084736859", name: "陈雪", notes: "封存", payEveryMonth: "2494.00"},
            {fundAccount: "084839144", name: "李敏", notes: "封存", payEveryMonth: "2494.00"},
            {fundAccount: "139714996", name: "辛竞一", notes: "封存", payEveryMonth: "2484.00"},
            {fundAccount: "085612649", name: "袁雯", notes: "封存", payEveryMonth: "2494.00"},
            {fundAccount: "084927320", name: "钱慧芳", notes: "封存", payEveryMonth: "2494.00"},
            {fundAccount: "086379732", name: "王晓昕", notes: "封存", payEveryMonth: "2494.00"}
          ]
        },
        subtotal: {
          addPeoples: 10,
          addPrice: 17500.00,
          descPeoples: 10,
          descPrice: 17500.00
        },
        total: {
          addPeoples: 22,
          addPrice: 45428.00,
          descPeoples: 17,
          descPrice: 36288.00
        },
        maker: "王莺",
        makeDate: "2017/7/21 10:01:49"
      },
      fundPayRepairInfo: {
        companyName: "花旗银行(中国有限公司)",
        listId: "18130",
        basicFundAccount: "882222694",
        payYear: "2017",
        payMonth: "7",
        payDay: "21",
        amountPage: "1",
        currentPage: "1",
        list:[
          {index: 1, employeeAccount: "084703222", name: "黎宇", IdNumber: "360102197607016335", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
          {index: 2, employeeAccount: "060119688", name: "毛颖桢", IdNumber: "310107198207193022", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
          {index: 3, employeeAccount: "141871167", name: "夏乔乔", IdNumber: "320282198412071427", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
          {index: 4, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 5, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 6, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 7, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 8, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 9, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 10, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""}
        ],
        reason: "<p>补缴原因：<br/>① 漏缴补缴 ② 少缴补缴 ③ 欠缴单位补缴 ④ 外省市转入补缴 ⑤ 错缴更正补缴 ⑥ 特殊补缴</p><p>注：<br/>(1) 补缴原因栏填写补缴原因代码;<br/>(2) 本表一式三联，一联经建行盖章后返回单位，一联由建留存，一联由建行转公积金管理中心;<br/>(3) 正常缴存单位为整体或部分职工补缴住房公积金超过12个月的，须经市公积金管理中心或区县中心审核，本表须一式四联。</p>",
        subTotal: {
          peoples: 3,
          amount: 7482.00
        },
        total: {
          peoples: 3,
          amount: 7482.00
        },
        maker: "王莺"
      },
      addFundPayChangeInfo: {
        companyName: "罗克韦尔自动化(中国)有限公司",
        listId: "2816",
        basicFundAccount: "209882466381",
        payYear: "2017",
        payMonth: "07",
        amountPage: "2",
        currentPage: "1",
        list:{
          add: [
            {index: 1, changeType: "开户", name: "柳维奇", fundAccount: "158797954", addFundAccount: "", payEveryMonth: "614.00", payPercent: "3%"},
            {index: 2, changeType: "开户", name: "李永贵", fundAccount: "188592350", addFundAccount: "", payEveryMonth: "600.00", payPercent: "3%"},
            {index: 3, changeType: "开户", name: "徐浩", fundAccount: "104908920", addFundAccount: "", payEveryMonth: "1050.00", payPercent: "3%"},
            {index: 4, changeType: "开户", name: "李全波", fundAccount: "101259165", addFundAccount: "", payEveryMonth: "1170.00", payPercent: "3%"},
            {index: 5, changeType: "转入", name: "刘伟", fundAccount: "", addFundAccount: "052509700", payEveryMonth: "1170.00", payPercent: "3%"},
            {index: 6, changeType: "转入", name: "吴燕燕", fundAccount: "", addFundAccount: "083148130", payEveryMonth: "1170.00", payPercent: "3%"},
            {index: 7, changeType: "转入", name: "詹世涛", fundAccount: "", addFundAccount: "101391718", payEveryMonth: "1170.00", payPercent: "3%"},
            {index: 8, changeType: "转入", name: "何倩倩", fundAccount: "", addFundAccount: "109158030", payEveryMonth: "1170.00", payPercent: "3%"},
            {index: 9, changeType: "转入", name: "黄定伟", fundAccount: "", addFundAccount: "123358165", payEveryMonth: "1110.00", payPercent: "3%"},
            {index: 10, changeType: "", name: "", fundAccount: "", addFundAccount: "", payEveryMonth: "", payPercent: ""}
          ],
          desc: [
            {addFundAccount: "061379993", name: "赵雯静", notes: "封存", payEveryMonth: "494.00"},
            {addFundAccount: "089391677", name: "郭晓燕", notes: "封存", payEveryMonth: "396.00"},
            {addFundAccount: "115593987", name: "王欢", notes: "封存", payEveryMonth: "524.00"},
            {addFundAccount: "057658809", name: "杨钧", notes: "封存", payEveryMonth: "1070.00"},
            {addFundAccount: "089091566", name: "张志刚", notes: "封存", payEveryMonth: "1070.00"},
            {addFundAccount: "088758073", name: "冯建华", notes: "封存", payEveryMonth: "1170.00"},
            {addFundAccount: "052443191", name: "朱文君", notes: "封存", payEveryMonth: "1070.00"},
            {addFundAccount: "084108254", name: "徐罡", notes: "封存", payEveryMonth: "1008.00"},
            {addFundAccount: "057783719", name: "彭刚", notes: "封存", payEveryMonth: "1170.00"},
            {addFundAccount: "144385376", name: "刘小珍", notes: "封存", payEveryMonth: "630.00"}
          ]
        },
        subtotal: {
          addPeoples: 9,
          addPrice: 9224.00,
          descPeoples: 10,
          descPrice: 8602.00
        },
        total: {
          addPeoples: 9,
          addPrice: 9224.00,
          descPeoples: 12,
          descPrice: 10742.00
        },
        maker: "王莺",
        makeDate: "2017/8/21 10:05:34"
      },
      addFundPayRepairInfo: {
        companyName: "花旗银行(中国有限公司)",
        listId: "18130",
        basicFundAccount: "882222694",
        payYear: "2017",
        payMonth: "7",
        payDay: "21",
        amountPage: "1",
        currentPage: "1",
        list:[
          {index: 1, employeeAccount: "084703222", name: "黎宇", IdNumber: "360102197607016335", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
          {index: 2, employeeAccount: "060119688", name: "毛颖桢", IdNumber: "310107198207193022", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
          {index: 3, employeeAccount: "141871167", name: "夏乔乔", IdNumber: "320282198412071427", repairReason: "①", dateToDate1: "2017.6~2017.6", payPercent1: "7%", repairPriceEveryMonth1: "2494.00", repairSubTotal1: "2494.00", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: "2494.00"},
          {index: 4, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 5, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 6, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 7, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 8, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 9, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""},
          {index: 10, employeeAccount: "", name: "", IdNumber: "", repairReason: "", dateToDate1: "", payPercent1: "", repairPriceEveryMonth1: "", repairSubTotal1: "", dateToDate2: "", payPercent2: "", repairPriceEveryMonth2: "", repairSubTotal2: "", repairTotal: ""}
        ],
        reason: "<p>补缴原因：<br/>① 漏缴补缴 ② 少缴补缴 ③ 欠缴单位补缴 ④ 外省市转入补缴 ⑤ 错缴更正补缴 ⑥ 特殊补缴</p><p>注：<br/>(1) 补缴原因栏填写补缴原因代码;<br/>(2) 本表一式三联，一联经建行盖章后返回单位，一联由建留存，一联由建行转公积金管理中心;<br/>(3) 正常缴存单位为整体或部分职工补缴住房公积金超过12个月的，须经市公积金管理中心或区县中心审核，本表须一式四联。</p>",
        subTotal: {
          peoples: 3,
          amount: 7482.00
        },
        total: {
          peoples: 3,
          amount: 7482.00
        },
        maker: "王莺"
      }
    }
  }
})

export default {
  customerSearch
}
