<template>
  <div>
    <Form :label-width="150">
      <Row justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="原档案编号：">
            <Input v-model="modifyFileNumber.originFileNumber" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="现档案编号：">
            <Select v-model="modifyFileNumber.nowFileNumberValue" transfer>
              <Option v-for="(nowFileNumber, index) in nowFileNumberList" :key="index">{{nowFileNumber}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="改号提交人：">
            <Input v-model="modifyFileNumber.modifyCommiter" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="改号提交日期：">
            <Input v-model="modifyFileNumber.modifyCommitDate" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="改号完成人：">
            <Input v-model="modifyFileNumber.modifyFinisher" placeholder="请输入"/>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="改号完成日期：">
            <Input v-model="modifyFileNumber.modifyFinishDate" placeholder="请输入"/>
          </Form-item>
        </Col>
      </Row>
      <Row>
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
      modifyFileNumberInfo: {
        type: Object
      }
    },
    data() {
      return {
        nowFileNumberList: []
      }
    },
    computed: {
      modifyFileNumber() {
        return this.modifyFileNumberInfo;
      }
    }
  }
</script>
