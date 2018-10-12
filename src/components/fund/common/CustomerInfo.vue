<template>
  <Form :label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户编号：">
          <label>{{customer.customerNumber}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户名称：">
          <label>{{customer.customerName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="isShowComplete">
        <Form-item label="任务发起人：">
          <label>{{customer.initiater}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户中心：">
          <label>{{customer.customerCenter}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客服经理：">
          <label>{{customer.serviceManager}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户专员：">
          <label>{{customer.customerServicer}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户公积金截至日：">
          <label>{{customer.customerFundEndDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="isShowComplete">
        <Form-item label="发起人备注：">
          <label>{{customer.initiaterNotes}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" v-show="isShowComplete">
        <Form-item label="任务发起时间：">
          <label>{{customer.sponsorTime}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      customerInfo: {
        type: Object
      },
      isShowComplete: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      customer() {
        return this.customerInfo;
      }
    }
  }
</script>
