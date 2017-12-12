<template>
  <Form :label-width=150>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="企业社保账号：" class="">
        <label>{{company.comAccountId}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="客户编号：" class="">
        <label>{{company.companyId}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="参保户名称：" class="">
        <label>{{company.title}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="社保中心：" class="">
        <label>{{company.settlementArea}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="UKey密码：" class="">
        <label>{{company.ssPwd}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="账户类型：" class="">
        <label>{{company.ssAccountType}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="客服经理：" class="">
        <label>{{company.companyServicer}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="服务中心：" class="">
        <label>{{company.serviceCenter}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="企业社保账户状态：" class="">
        <label>{{company.state ? '有效' : '终止' }}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="客户社保截至日：" class="">
        <label>{{company.companySocialSecurityEndData}}</label>
      </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      company: {
        require: true,
        Type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    computed: {},
    methods: {}
  }
</script>
