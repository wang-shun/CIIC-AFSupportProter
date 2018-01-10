<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单红联暂存：">
            <Input v-model="refuseMaterials.tempStore" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单红联代转：">
            <Input v-model="refuseMaterials.insteadTransfer" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单返回日期：">
            <DatePicker v-model="refuseMaterials.returnDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退工单并档日期：">
            <DatePicker v-model="refuseMaterials.mergeArchiveDate" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="">
            <Checkbox v-model="refuseMaterials.hasStub">无存根联</Checkbox>
          </Form-item>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      refuseMaterialsInfo: {
        type: Object
      }
    },
    data() {
      return {

      }
    },
    computed: {
      refuseMaterials() {
        return this.refuseMaterialsInfo;
      }
    }
  }
</script>
