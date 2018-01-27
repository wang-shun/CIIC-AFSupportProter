<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金类型：">
          {{fundOperator.fundType}}
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="变更类型：">
          <Select v-model="fundOperator.changeTypeValue" style="width: 100%;" transfer>
            <Option v-for="item in fundOperator.changeTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="汇缴截止月份">
          <DatePicker v-model="fundOperator.payEndMonth" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户汇缴月份">
          {{fundOperator.customerPayEndMonth}}
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Form-item label="办理备注：">
          <Input v-model="fundOperator.doRemark" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 24}">
        <Form-item label="批退备注：">
          <Input v-model="fundOperator.refuseRemark" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      fundOperatorInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        changeTypeList: [
          {value: 0, label: '转出'},
          {value: 1, label: '封存'}
        ]
      }
    },
    computed: {
      fundOperator() {
        return this.fundOperatorInfo
      }
    }
  }
</script>
