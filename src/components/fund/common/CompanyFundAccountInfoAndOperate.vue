<template>
  <Form :label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费银行：">
          <Select v-model="companyFundAccount.payBankValue" style="width: 100%;" transfer>
            <Option v-for="item in payBankList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <Select v-model="companyFundAccount.payMethodValue" style="width: 100%;" transfer>
            <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账户：">
          <Input v-model="companyFundAccount.companyFundAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业补充公积金账户：">
          <Input v-model="companyFundAccount.companyAddFundAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金企业UKey：">
          <Select v-model="companyFundAccount.UKeyValue" style="width: 100%;" transfer>
            <Option v-for="item in UKeyList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="关账日期：">
          <DatePicker v-model="companyFundAccount.closeAccountDate" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费起始年月：">
          <DatePicker v-model="companyFundAccount.payStartDate" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="">
          <CheckboxGroup v-model="companyFundAccount.tmpStore">
            <Checkbox label="基本暂保管"></Checkbox>
            <Checkbox label="补充暂保管"></Checkbox>
          </CheckboxGroup>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      companyFundAccountInfo: {
        type: Object
      }
    },
    data() {
      return {
        payBankList: [
          {label: "建行徐汇支行", value: 0},
          {label: "建行静安支行", value: 1},
          {label: "建行长宁支行", value: 2},
        ],
        payMethodList: [
          {label: "自开发票", value: 0},
          {label: "我司垫付(客户预付)", value: 1},
          {label: "垫付", value: 2}
        ],
        UKeyList: [
          {label: "有(中智代办)", value: 0},
          {label: "有(客户自办)", value: 1},
          {label: "没有", value: 2}
        ],
      }
    },
    computed: {
      companyFundAccount() {
        return this.companyFundAccountInfo;
      }
    }
  }
</script>
