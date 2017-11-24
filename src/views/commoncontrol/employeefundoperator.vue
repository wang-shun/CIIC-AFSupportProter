<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金类型：">
          {{fundOperatorInfo.fundType}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="基本/补充公积金账户：">
          <Input v-model="fundOperatorInfo.fundAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员起缴月份">
          <DatePicker v-model="fundOperatorInfo.startPayDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    data() {
      return {
        fundOperatorInfo: {
          fundType: '基本公积金',
          fundAccount: '',
          startPayDate: '201701',
        }
      }
    }
  }
</script>
