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
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
      <Form-item label="人员属性：">
        <label>{{$decode.empClassify(emp.empClassify)}}</label>
      </Form-item>
      </Col>
      <!-- 调整和转出 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-if="operatorType !== '1' && operatorType !== '2'">
      <Form-item label="社保序号：">
        <label>{{emp.ssSerial}}</label>
      </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType !== '1' && operatorType !== '2'">
      <Form-item label="社保账号分类：">
        <label>{{$decode.accountType(emp.ssAccountType)}}</label>
      </Form-item>
      </Col>
      <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 8}" v-show="operatorType == '1' || operatorType=='2'">
      <Form-item label="户口地址：">
        <label>{{emp.residenceAddress}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 20}" :lg="{span: 8}" v-show="operatorType == '1' || operatorType=='2'">
      <Form-item label="户口属性：">
        <label>{{emp.residenceAttribute=='1'?'城镇户口':'农村户口'}}</label>
      </Form-item>
      </Col>
        <!-- 仅新增 -->
      <Col :sm="{span:22}" :md="{span: 20}" :lg="{span: 8}" v-show="operatorType == '1' || operatorType=='2'">
      <Form-item label="联系地址：">
        <label>{{emp.contactAddress}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 20}" :lg="{span: 8}" v-show="operatorType == '1' || operatorType=='2'">
      <Form-item label="邮编：">
        <label>{{emp.zipCode}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 20}" :lg="{span: 8}">
      <Form-item label="基数(使用中)：">
        <label>{{emp.oldEmpBase}}</label>
      </Form-item>
      </Col>
      <Col :sm="{span:22}" :md="{span: 20}" :lg="{span: 8}">
      <Form-item label="档案状态：">
        <label>{{$decode.ssArchiveTaskStatus(emp.archiveStatus)}}</label>
      </Form-item>
      </Col>
      <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType !== '1' && operatorType !== '2'">
      <Form-item label="人员分类：">
        <label>{{emp.empClassify}}</label>
      </Form-item>
      </Col> -->
        <!-- 仅新增 -->
      <!-- <Col :sm="{span:22}" :md="{span: 20}" :lg="{span: 8}" v-show="operatorType == '1' || operatorType=='2'">
      <Form-item label="雇员属性：">
        <label>{{emp.employeeAttribute}}</label>
      </Form-item>
      </Col> -->
    </row>

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
