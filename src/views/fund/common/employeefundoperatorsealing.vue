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
          <Select v-model="fundOperator.changeType" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in changeList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="汇缴截至月份：">
          <DatePicker v-model="fundOperator.endPayDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户汇缴月份：">
          <DatePicker v-model="fundOperator.customerPayDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}">
        <Form-item label="办理备注：">
          <Input v-model="fundOperator.doRemark" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 24}">
        <Form-item label="批退备注：">
          <Input v-model="fundOperator.refuseRemark" placeholder="请输入..." :disabled="disabled"></Input>
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
        changeList: [
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
