<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户基本公积金账号：">
          <label>{{companyFundAccount.hfComBasicAccount}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户补充公积金账号：">
          <label>{{companyFundAccount.hfComAddedAccount}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户中心：">
          <label>{{companyFundAccount.customerCenter}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费区县：">
          <label>{{companyFundAccount.paymentBankName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账户状态：">
          <label>{{companyFundAccount.comAccountStatus}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="末次汇缴月（基本）：">
          <label>{{companyFundAccount.comHfMonthBasic}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="末次汇缴月（补充）：">
          <label>{{companyFundAccount.comHfMonthAdded}}</label>
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
        <Form-item label="截单年月（基本）：">
          <label>{{companyFundAccount.endMonthBasic}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="截单年月（补充）：">
          <label>{{companyFundAccount.endMonthAdded}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <label>{{companyFundAccount.paymentWayName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金企业U盾：">
          <label>{{companyFundAccount.ukeyStoreName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户编号：">
          <label>{{companyFundAccount.comanyId}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户名称：">
          <label>{{companyFundAccount.companyName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业账户类型：">
          <label>{{companyFundAccount.hfAccountTypeName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账号名称：">
          <label>{{companyFundAccount.comAccountName}}
            <span style="color: red">{{companyFundAccount.comTaskCategory}}</span>
          </label>
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

      }
    },
    computed: {
      companyFundAccount() {
        return this.companyFundAccountInfo
      }
    },
  }
</script>
