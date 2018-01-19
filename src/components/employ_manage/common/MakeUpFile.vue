<template>
  <div>
    <Form :label-width="150">
      <Row type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档案1：">
            <DatePicker v-model="makeUpFile.makeUpfile1" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档人1：">
            <Input v-model="makeUpFile.maker1" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Button type="primary" class="ml10">保存</Button>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档案2：">
            <DatePicker v-model="makeUpFile.makeUpfile2" type="date" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="补调档人2：">
            <DatePicker v-model="makeUpFile.maker2" type="daterange" placeholder="" transfer></DatePicker>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Button type="primary" class="ml10">保存</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>
<script>
  export default {
    props: {
      makeUpFileInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {

      }
    },
    computed: {
      makeUpFile() {
        return this.makeUpFileInfo;
      }
    }
  }
</script>
