<template>
  <Form :label-width=150>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员编号：">
          <label>{{employee.code}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员姓名：">
          <label>{{employee.name}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="证件号码：">
          <label>{{employee.idNo}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="入职日期：">
          <label>{{employee.checkInTime}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="学历：">
          <label>{{employee.education}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="人员分类：">
          <label>{{employee.personType}}</label>
        </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0'">
        <Form-item label="社保账号分类：">
          <label>{{employee.socialSecurityType}}</label>
        </Form-item>
      </Col>
      <!-- 调整和转出 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '1' || operatorType === '2'">
        <Form-item label="社保序号：">
          <label>{{employee.socialSecurityIndex}}</label>
        </Form-item>
      </Col>
      <!-- 调整和转出 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '1' || operatorType === '2'">
        <Form-item label="企业社保账号：">
          <label>{{employee.companySocialSecurityAccount}}</label>
        </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType == '0'">
        <Form-item label="户口地址：">
          <label>{{employee.residenceAddress}}</label>
        </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType == '0'">
        <Form-item label="联系地址：">
          <label>{{employee.contactAddress}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
    name:"employeeinfo",
    props:{
      operatorType:{
        type: String
      },
      employee: {
        require: true,
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {

    }
  }
</script>