<template>
  <div>
    <h2 class="tc">上海市住房公积金补缴清册</h2>
    <div class="listHead">
      <p class="tl w50"><span class="fb">单位名称：</span>{{addFundPayRepair.companyName}}</p>
      <p class="tr w50">{{addFundPayRepair.listId}}</p>
      <p class="tl w30"><span class="fb">单位(住房)公积金账号：</span>{{addFundPayRepair.basicFundAccount}}</p>
      <p class="tc w35">{{addFundPayRepair.payYear}}　年　{{addFundPayRepair.payMonth}}　月　{{addFundPayRepair.payDay}}　日</p>
      <p class="tr w30">共　{{addFundPayRepair.amountPage}}　页　第　{{addFundPayRepair.currentPage}}　页</p>
    </div>
    <table border="1" cellspacing="0" cellpading="0">
      <tr>
        <td class="w4" rowspan="2">序号</td>
        <td class="w9" rowspan="2">职工账号</td>
        <td class="w6" rowspan="2">姓名</td>
        <td class="w14" rowspan="2">证件号</td>
        <td class="w5" rowspan="2">补缴原因</td>
        <td colspan="8">补缴时间</td>
        <td class="w10" rowspan="2">补缴金额合计</td>
      </tr>
      <tr>
        <td class="w11">年月至年月</td>
        <td class="w5">缴存比例</td>
        <td class="w5">月补缴金额</td>
        <td class="w5">补缴金额小计</td>
        <td class="w11">年月至年月</td>
        <td class="w5">缴存比例</td>
        <td class="w5">月补缴金额</td>
        <td class="w5">补缴金额小计</td>
      </tr>
      <tr v-for="item in addFundPayRepair.list">
        <td>{{item.index}}</td>
        <td>{{item.employeeAccount}}</td>
        <td>{{item.name}}</td>
        <td>{{item.IdNumber}}</td>
        <td>{{item.repairReason}}</td>
        <td>{{item.dateToDate1}}</td>
        <td>{{item.payPercent1}}</td>
        <td>{{item.repairPriceEveryMonth1}}</td>
        <td>{{item.repairSubTotal1}}</td>
        <td>{{item.dateToDate2}}</td>
        <td>{{item.payPercent2}}</td>
        <td>{{item.repairPriceEveryMonth2}}</td>
        <td>{{item.repairSubTotal2}}</td>
        <td>{{item.repairTotal}}</td>
      </tr>
      <tr>
        <td rowspan="2" colspan="9" class="tl" style="padding: 5px" v-html="addFundPayRepair.reason"></td>
        <td colspan="2">本页小计</td>
        <td>人数</td>
        <td>{{addFundPayRepair.subTotal.peoples}}</td>
        <td>{{addFundPayRepair.subTotal.amount}}</td>
      </tr>
      <tr>
        <td colspan="2">本页合计(填首页)</td>
        <td>人数</td>
        <td>{{addFundPayRepair.total.peoples}}</td>
        <td>{{addFundPayRepair.total.amount}}</td>
      </tr>
    </table>
    <div class="tl mt50">
      <p class="dib w33">
        <span class="fb">填写表人：</span>　{{addFundPayRepair.maker}}
      </p>
      <p class="dib w33">
        <span class="fb">市或区县中心审核人：</span>
      </p>
      <p class="dib w33">
        <span class="fb">建行经办人：</span>
      </p>
      <p class="dib w33">
        <span class="fb">单位盖章：</span>
      </p>
      <p class="dib w33">
        <span class="fb">市或区县中心盖章：</span>
      </p>
      <p class="dib w33">
        <span class="fb">建行经办行盖章：</span>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      addFundPayRepairInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      addFundPayRepair() {
        return this.addFundPayRepairInfo;
      }
    }
  }
</script>
<style>
  .listHead {overflow: auto}
  .listHead p {
    line-height: 25px;
    height: 25px;
    float: left;
  }

  td {
    text-align: center;
    line-height: 25px;
    height: 25px;
  }
</style>
