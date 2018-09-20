<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="服务中心：">
            {{customer.serviceCenter}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司编号：">
            {{customer.companyId}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司名称：">
            {{customer.title}}
            <br>
            {{customer.ciCi}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="客服操作员：">
            {{customer.createdDisplayName}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="雇员服务人员：">
            {{customer.employeeCenterOperator}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="客服经理：">
            {{customer.leaderShipName}}
          </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      customerInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      customer() {
        return this.customerInfo;
      }
    }
  }
</script>
