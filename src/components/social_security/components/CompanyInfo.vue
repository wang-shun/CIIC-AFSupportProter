<template>
  <Form :label-width=150>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="企业社保账号：">
        <label>{{company.ssAccount}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="客户编号：">
        <label>{{company.companyId}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="参保户名称：">
        <label>{{company.title}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="社保中心：">
        <label>{{company.settlementArea}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="UKey密码：">
        <label>{{company.ssPwd}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="账户类型：">
        <label>{{company.ssAccountType}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="客服经理：">
        <label>{{company.companyServicer}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="服务中心：">
        <label>{{company.serviceCenter}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="企业社保账户状态：">
        <label>{{company.state ? '有效' : '终止' }}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="客户社保截至日：">
        <label>本月{{company.expireDate}}日</label>
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
