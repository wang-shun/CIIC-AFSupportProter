<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="实际结费日期：">
            <DatePicker v-model="fileSettle.actSettleDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工档案费缴至：">
            <Input v-model="fileSettle.refuseFileFeePayTo" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="支付档案费金额：">
            <Input v-model="fileSettle.filePrice" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="档案结费起始日期：">
            <DatePicker v-model="fileSettle.priceRange" type="daterange" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单并档日期：">
            <DatePicker v-model="fileSettle.refuseTicketMergeFileDate" type="date" placeholder="" transfer></DatePicker>
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
      fileSettleInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      fileSettle() {
        return this.fileSettleInfo;
      }
    }
  }
</script>
