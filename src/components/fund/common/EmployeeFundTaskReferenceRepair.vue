<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金基数：">
          {{reference.fundBase}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金比例：">
          {{reference.fundPercent}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="补缴开始月份：">
          {{reference.startRepairDate}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="补缴开始月份：">
          {{reference.endRepairDate}}
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      referenceInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {

      }
    },
    computed: {
      reference() {
        return this.referenceInfo
      }
    }
  }
</script>
