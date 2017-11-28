<template>
  <Form label-width=150>
    <Row>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公积金类型：">
          {{fundOperator.fundType}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="任务：">
          {{fundOperator.taskType}}
          </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转出单位：">
          <Select v-model="fundOperator.outValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in unitList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转出单位账号：">
          <Input v-model="fundOperator.outAccount" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转入单位：">
          <Select v-model="fundOperator.inValue" style="width: 100%;" :disabled="disabled" transfer>
            <Option v-for="item in unitList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转入单位账号：">
          <Input v-model="fundOperator.inAccount" placeholder="请输入..." :disabled="disabled"></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转移日期：">
          <DatePicker v-model="fundOperator.transferDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="回单日期：">
          <DatePicker v-model="fundOperator.backBillDate" placement="bottom-end" placeholder="选择日期" :disabled="disabled" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="操作日期：">
          {{fundOperator.operatorDate}}
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
        unitList: [
          {value: 0, label: '市公积金封存办(中心)'},
          {value: 1, label: '中智大库'},
          {value: 2, label: '中智外包'},
          {value: 3, label: '原单位'},
          {value: 4, label: '独立户XX有限公司1'},
          {value: 5, label: '独立户XX有限公司2'}
        ],
      }
    },
    computed: {
      fundOperator() {
        return this.fundOperatorInfo
      }
    }
  }
</script>
