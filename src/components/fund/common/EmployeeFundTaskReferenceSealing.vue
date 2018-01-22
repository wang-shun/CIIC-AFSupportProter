<template>
  <Form label-width=150>
    <Row type="flex" justify="start">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="离职日期：">
          {{reference.outDate}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="汇缴截至年月：">
          {{reference.endPayDate}}
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
