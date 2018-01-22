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
          {{fundOperator.task}}
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转出单位：">
          <Select v-model="fundOperator.transferOutValue" style="width: 100%;" transfer>
            <Option v-for="item in transferOutList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转出单位账号：">
          <Input v-model="fundOperator.transferOutCompanyAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转入单位：">
          <Select v-model="fundOperator.transferInValue" style="width: 100%;" transfer>
            <Option v-for="item in transferInList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转入单位账号：">
          <Input v-model="fundOperator.transferInCompanyAccount" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="转移日期：">
          <DatePicker v-model="fundOperator.transferDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="回单日期：">
          <DatePicker v-model="fundOperator.feedbackDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="操作日期：">
          {{fundOperator.operateDate}}
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="打印日期：">
          {{fundOperator.printDate}}
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 16}">
        <Form-item label="办理备注：">
          <Input v-model="fundOperator.doRemark" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    props: {
      fundOperatorInfo: {
        type: Object
      }
    },
    data() {
      return {
        transferOutList: [
          {label: "市公积金封存办(中心)", value: 0},
          {label: "中智大库", value: 1},
          {label: "中智外包", value: 2},
          {label: "原单位", value: 3},
          {label: "独立户XX有限公司1", value: 4},
          {label: "独立户XX有限公司2", value: 5},
        ],
        transferInList: [
          {label: "市公积金封存办(中心)", value: 0},
          {label: "中智大库", value: 1},
          {label: "中智外包", value: 2},
          {label: "原单位", value: 3},
          {label: "独立户XX有限公司1", value: 4},
          {label: "独立户XX有限公司2", value: 5},
        ]
      }
    },
    computed: {
      fundOperator() {
        return this.fundOperatorInfo;
      }
    }
  }
</script>
