<template>
  <Form :label-width=150>
    <Row class="mt20" type="flex" justify="start">
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员编号：">
          <label>{{emp.employeeId}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="雇员姓名：">
          <label>{{emp.employeeName}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="证件号码：">
          <label>{{emp.idNum}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="入职日期：">
          <label>{{emp.inDate}}</label>
        </Form-item>
      </Col>
      <!-- 调整和转出 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="社保序号：">
          <label>{{emp.ssSerial}}</label>
        </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="学历：">
          <label>{{emp.education}}</label>
        </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="社保账户类型：">
          <label>{{emp.ssAccountType}}</label>
        </Form-item>
      </Col>
      <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="人员分类：">
          <label>{{emp.empClassify}}</label>
        </Form-item>
      </Col> -->


      <!-- 调整和转出 -->
      <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="企业社保账号：">
          <label>{{emp.companySocialSecurityAccount}}</label>
        </Form-item>
      </Col> -->
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType == '0'">
        <Form-item label="户口地址：">
          <label>{{emp.residenceAddress}}</label>
        </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType == '0'">
        <Form-item label="联系地址：">
          <label>{{emp.contactAddress}}</label>
        </Form-item>
      </Col>
    </Row>
  </Form>
</template>
<script>
  export default {
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
      emp(){
        var emp = this.employee;

        //emp.empClassify = this.$decode.empClassify(emp.empClassify)
        return emp;
      }
    },
    methods: {

    }
  }
</script>
