<template>
  <div>
    <h2 class="tc">上海市公积金汇缴变更清册</h2>
    <div class="listHead">
      <p class="tl w50"><span class="fb">单位名称：</span>{{fundPayChange.companyName}}</p>
      <p class="tr w50">{{fundPayChange.listId}}</p>
      <p class="tl w35"><span class="fb">基本住房公积金账号：</span>{{fundPayChange.basicFundAccount}}</p>
      <p class="tc w35"><span class="fb">缴交日期：</span>　{{fundPayChange.payYear}}　年　{{fundPayChange.payMonth}}　月</p>
      <p class="tr w30">共　{{fundPayChange.amountPage}}　页　第　{{fundPayChange.currentPage}}　页</p>
    </div>
    <table border="1" cellspacing="0" cellpading="0">
      <tr>
        <td colspan="9" class="tc">本月增加汇缴</td>
        <td colspan="5" class="tc">本月减少汇缴</td>
      <tr>
        <td colspan="9" class="tc">新增职工开户、转入、启封</td>
        <td colspan="5" class="tc">职工销户、转出、封存</td>
      </tr>
      <tr>
        <td class="w2">序号</td>
        <td class="w4">变更类型</td>
        <td class="w7">姓名</td>
        <td class="w15" colspan="2">证件号</td>
        <td class="w10">公积金账号</td>
        <td class="w15">每月应缴额</td>
        <td class="w15">工资收入</td>
        <td class="w7">缴存比例(%)</td>
        <td class="w7" colspan="2">公积金账号</td>
        <td class="w7">姓名</td>
        <td class="w4">摘要</td>
        <td class="w7">每月应缴额</td>
      </tr>
      <tr v-for="(add, index) in fundPayChange.list.add">
        <td>{{fundPayChange.list.add[index].index}}</td>
        <td>{{fundPayChange.list.add[index].changeType}}</td>
        <td>{{fundPayChange.list.add[index].name}}</td>
        <td colspan="2">{{fundPayChange.list.add[index].IdNumber}}</td>
        <td>{{fundPayChange.list.add[index].fundType}}</td>
        <td>{{fundPayChange.list.add[index].payEveryMonth}}</td>
        <td>{{fundPayChange.list.add[index].salary}}</td>
        <td>{{fundPayChange.list.add[index].payPercent}}</td>
        <td colspan="2">{{fundPayChange.list.desc[index].fundAccount}}</td>
        <td>{{fundPayChange.list.desc[index].name}}</td>
        <td>{{fundPayChange.list.desc[index].notes}}</td>
        <td>{{fundPayChange.list.desc[index].payEveryMonth}}</td>
      </tr>
      <tr>
        <td colspan="3">本页小计</td>
        <td>人数</td>
        <td>{{fundPayChange.subtotal.addPeoples}}</td>
        <td>金额</td>
        <td colspan="3">{{fundPayChange.subtotal.addPrice}}</td>
        <td>人数</td>
        <td>{{fundPayChange.subtotal.descPeoples}}</td>
        <td>金额</td>
        <td colspan="2">{{fundPayChange.subtotal.descPrice}}</td>
      </tr>
      <tr>
        <td colspan="3">本月合计<br/>(填第一页)</td>
        <td>人数</td>
        <td>{{fundPayChange.total.addPeoples}}</td>
        <td>金额</td>
        <td colspan="3">{{fundPayChange.total.addPrice}}</td>
        <td>人数</td>
        <td>{{fundPayChange.total.descPeoples}}</td>
        <td>金额</td>
        <td colspan="2">{{fundPayChange.total.descPrice}}</td>
      </tr>
    </table>
    <div class="tr mt50">
      <span class="fb">制表：</span>　{{fundPayChange.maker}}
      <span class="fb ml150">单位盖章：</span>
      <span class="fb ml150">制表日期：</span>{{fundPayChange.makeDate}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      fundPayChangeInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      fundPayChange() {
        return this.fundPayChangeInfo;
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
