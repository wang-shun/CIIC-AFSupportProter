<template>
  <Form label-width="150" ref="operatorSearchData" :model="operatorSearchData">
    <Row class="mt20">
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员编号：" prop="employeeNumber">
          <Input v-model="operatorSearchData.employeeNumber" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员姓名：" prop="employeeName">
          <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="证件号：" prop="IdNumber">
          <Input v-model="operatorSearchData.IdNumber" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户编号：" prop="customerNumber">
          <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="客户名称：" prop="customerName">
          <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="上下岗状态：" prop="workStatusValue">
          <Select v-model="operatorSearchData.workStatusValue" style="width: 100%;" transfer>
            <Option v-for="item in workStatusList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
      <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="是否打印通知书：" prop="isPrintValue">
          <Select v-model="operatorSearchData.isPrintValue" style="width: 100%;" transfer>
            <Option v-for="item in isPrintList" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
      </Col>
    </Row>
    <Row>
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" icon="ios-search">查询</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary">创建转移任务单</Button>
        <Button type="primary">选择批量转移到中心</Button>
        <Button type="warning">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    data() {
      return {
        operatorSearchData: {
          employeeNumber: '',
          employeeName: '',
          IdNumber: '',
          customerNumber: '',
          customerName: '',
          workStatusValue: '',
          isPrintValue: ''
        },
        workStatusList: [
          {value: 0, label: '在职'},
          {value: 1, label: '离职'},
        ],
        isPrintList: [
          {value: 0, label: '是'},
          {value: 1, label: '否'},
        ]
      }
    }
  }
</script>
