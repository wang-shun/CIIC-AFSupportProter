<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="出库日期：">
            <DatePicker v-model="stockAndMail.outStockDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="出库人：">
            <Input v-model="stockAndMail.outStocker" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信日期：">
            <DatePicker v-model="stockAndMail.actMailDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际寄信人：">
            <Input v-model="stockAndMail.actSender" placeholder="请输入"/>
          </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start" class="mt20">
        <Col :sm="{span: 24}" class="tr">
          <Button type="primary">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      stockAndMailInfo: {
        type: Object
      }
    },
    data() {
      return {

      }
    },
    computed: {
      stockAndMail() {
        return this.stockAndMailInfo;
      }
    }
  }
</script>
