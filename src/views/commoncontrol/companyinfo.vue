<template>
  <Form :label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户编号：" class="">
          <label>{{companyInfo.customerNumber}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户名称：" class="">
          <label>{{companyInfo.customerName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="服务中心：" class="">
          <label>{{companyInfo.serviceCenter}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客服经理：" class="">
          <label>{{companyInfo.serviceManager}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    name:"companyinfo",
    props: {
      companyInfo: {
        type: Object
      }
    }
  }
</script>
