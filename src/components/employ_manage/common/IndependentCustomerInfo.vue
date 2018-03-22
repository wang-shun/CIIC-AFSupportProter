<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司编号：">
            {{customer.companyId}}
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="公司名称：">
            {{customer.title}}
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
