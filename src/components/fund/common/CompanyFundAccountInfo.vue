<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户基本公积金账号：">
          <label>{{companyFundAccount.customerBasicFundAccount}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户补充公积金账号：">
          <label>{{companyFundAccount.customerAddFundAccount}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户中心：">
          <label>{{companyFundAccount.customerCenter}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费区县：">
          <label>{{companyFundAccount.payRegion}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账户状态：">
          <label>{{companyFundAccount.companyFundAccountStatus}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="末次汇缴月：">
          <label>{{companyFundAccount.lastPayMonth}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客服经理：">
          <label>{{companyFundAccount.serviceManager}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户专员：">
          <label>{{companyFundAccount.customerServicer}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="截单年月：">
          <label>{{companyFundAccount.endDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <label>{{companyFundAccount.payMethodValue}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金企业U盾：">
          <label>{{companyFundAccount.UKeyValue}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户编号：">
          <label>{{companyFundAccount.customerNumber}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户名称：">
          <label>{{companyFundAccount.customerName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业账户类型：">
          <label>{{companyFundAccount.accountType}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      companyFundAccountInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        payMethodList: [
          {label: "自付", value: "0"}
        ],
        UKeyList: [
          {label: "有(中智代办)", value: "0"}
        ]
      }
    },
    computed: {
      companyFundAccount() {
        return this.companyFundAccountInfo
      }
    },
  }
</script>
