<template>
  <div>
    <Form :label-width="100">
      <Row justify="start">
        <Col :sm="{span: 12}">
          <Form-item label="客户编号：">
            {{customer.customerNumber}}
          </Form-item>
        </Col>
        <Col :sm="{span: 12}">
        <Form-item label="客户名称：">
          {{customer.customerName}}
          </Form-item>
        </Col>
        <Col :sm="{span: 12}">
          <Form-item label="雇员编号：">
            {{customer.employeeNumber}}
          </Form-item>
        </Col>
        <Col :sm="{span: 12}">
          <Form-item label="雇员姓名：">
            {{customer.employeeName}}
          </Form-item>
        </Col>
        <Col :sm="{span: 12}">
          <Form-item label="预留档案编号：">
            {{customer.reservedFileNumber}}
          </Form-item>
        </Col>
        <Col :sm="{span: 12}">
          <Form-item label="证件号码：">
            {{customer.IdNumber}}
          </Form-item>
        </Col>
        <Col :sm="{span: 12}">
          <Form-item label="档案编号：">
            {{customer.fileNumber}}
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
