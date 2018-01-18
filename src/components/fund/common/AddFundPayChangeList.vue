<template>
  <div>
    <h2 class="tc">上海市补充公积金汇缴变更清册</h2>
    <div class="listHead">
      <p class="tl w50"><span class="strong">单位名称：</span>{{addFundPayChange.companyName}}</p>
      <p class="tr w50">{{addFundPayChange.listId}}</p>
      <p class="tl w35"><span class="strong">补充住房公积金账号：</span>{{addFundPayChange.basicFundAccount}}</p>
      <p class="tc w35"><span class="strong">缴交日期：</span>　{{addFundPayChange.payYear}}　年　{{addFundPayChange.payMonth}}　月</p>
      <p class="tr w30">共　{{addFundPayChange.amountPage}}　页　第　{{addFundPayChange.currentPage}}　页</p>
    </div>
    <table border="1" cellspacing="0" cellpading="0">
      <tr>
        <td colspan="8" class="tc">本月增加汇缴</td>
        <td colspan="5" class="tc">本月减少汇缴</td>
      <tr>
        <td colspan="8" class="tc">新增职工开户、转入、启封</td>
        <td colspan="5" class="tc">职工销户、转出、封存</td>
      </tr>
      <tr>
        <td class="w2">序号</td>
        <td class="w4">变更类型</td>
        <td class="w7">姓名</td>
        <td class="w15" colspan="2">公积金账号<br/>(新开户必填)</td>
        <td class="w15">补充公积金账号</td>
        <td class="w15">每月应缴额</td>
        <td class="w15">缴存比例(%)</td>
        <td class="w8" colspan="2">补充公积金账号</td>
        <td class="w8">姓名</td>
        <td class="w3">摘要</td>
        <td class="w8">每月应缴额</td>
      </tr>
      <tr v-for="(add, index) in addFundPayChange.list.add">
        <td>{{addFundPayChange.list.add[index].index}}</td>
        <td>{{addFundPayChange.list.add[index].changeType}}</td>
        <td>{{addFundPayChange.list.add[index].name}}</td>
        <td colspan="2">{{addFundPayChange.list.add[index].fundAccount}}</td>
        <td>{{addFundPayChange.list.add[index].addFundAccount}}</td>
        <td>{{addFundPayChange.list.add[index].payEveryMonth}}</td>
        <td>{{addFundPayChange.list.add[index].payPercent}}</td>
        <td colspan="2">{{addFundPayChange.list.desc[index].addFundAccount}}</td>
        <td>{{addFundPayChange.list.desc[index].name}}</td>
        <td>{{addFundPayChange.list.desc[index].notes}}</td>
        <td>{{addFundPayChange.list.desc[index].payEveryMonth}}</td>
      </tr>
      <tr>
        <td colspan="3">本页小计</td>
        <td>人数</td>
        <td>{{addFundPayChange.subtotal.addPeoples}}</td>
        <td>金额</td>
        <td colspan="2">{{addFundPayChange.subtotal.addPrice}}</td>
        <td>人数</td>
        <td>{{addFundPayChange.subtotal.descPeoples}}</td>
        <td>金额</td>
        <td colspan="2">{{addFundPayChange.subtotal.descPrice}}</td>
      </tr>
      <tr>
        <td colspan="3">本月合计<br/>(填第一页)</td>
        <td>人数</td>
        <td>{{addFundPayChange.total.addPeoples}}</td>
        <td>金额</td>
        <td colspan="2">{{addFundPayChange.total.addPrice}}</td>
        <td>人数</td>
        <td>{{addFundPayChange.total.descPeoples}}</td>
        <td>金额</td>
        <td colspan="2">{{addFundPayChange.total.descPrice}}</td>
      </tr>
    </table>
    <div class="tr mt50">
      <span class="strong">制表：</span>　{{addFundPayChange.maker}}
      <span class="strong ml150">单位盖章：</span>
      <span class="strong ml150">制表日期：</span>{{addFundPayChange.makeDate}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      addFundPayChangeInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      addFundPayChange() {
        return this.addFundPayChangeInfo;
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
