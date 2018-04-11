<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="缴费银行：">
          <label>{{companyTask.paymentBankValue}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="付款方式：">
          <label>{{companyTask.payMethodValue}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="终止类型：">
          <label>{{companyTask.endTypeValue}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账户名称：">
          <label>{{companyTask.companyFundAccountName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业公积金账号：">
          <label>{{companyTask.companyFundAccountNum}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金企业U盾：">
          <label>{{companyTask.UKeyValue}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="每月关账日：">
          <label>{{companyTask.closeAccountEveryMonth}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="受理日期：">
          <label>{{companyTask.acceptDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="送审日期：">
          <label>{{companyTask.deliveredDate}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="完成日期：">
          <label>{{companyTask.finishDate}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      companyTaskInfo: {
        type: Object
      }
    },
    computed: {
      companyTask() {
        return this.companyTaskInfo;
      }
    }
  }
</script>
