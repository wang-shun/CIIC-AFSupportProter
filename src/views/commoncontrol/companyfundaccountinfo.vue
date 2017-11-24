<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户编号：">
          <label>{{fund.customerNumber}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户名称：">
          <label>{{fund.customerName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="结算区域：">
          <label>{{fund.region}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账户状态：">
          <label>{{fund.status}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="所属公积金中心：">
          <label>{{fund.fundCenter}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客服经理：">
          <label>{{fund.serviceManager}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="账户类型：">
          <label>{{fund.accountType}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户公积金截止日：">
          <label>{{fund.endDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="isShowPayMonth">
        <Form-item label="客户汇缴月份：">
          <label>{{fund.payMonth}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      fundInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      isShowPayMonth: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        companyFundAccountInfo: this.fundInfo
      }
    },
    computed: {
      fund() {
        return this.fundInfo
      }
    },
  }
</script>
