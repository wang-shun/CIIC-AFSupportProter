<template>
  <div class="smList">
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        查询报表
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :rules="ruleValidate" :label-width="120"> 
            <Row type="flex" justify="start">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="报表主题：" prop="formTitle">
                  <Select v-model="formTitle" placeholder="请先选择报表主题内容" transfer>
                    <Option v-for="(value,key) in this.baseDic.form_title" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>    
              </i-col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '1'">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="截止日期：">
                  <DatePicker type="date" placeholder="请选择" transfer></DatePicker>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '2' || formTitle === '3'">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户经理：" prop="manager">
                  <Input v-model="queryItem.manager" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员出生日期：" prop="manager">
                  <DatePicker type="date" placeholder="请选择" transfer></DatePicker>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '4' || formTitle === '5'">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户总监：" prop="majordomo">
                  <Input v-model="queryItem.majordomo" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户经理：" prop="manager">
                  <Input v-model="queryItem.manager" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务产品：" prop="product">
                  <Input v-model="queryItem.product" placeholder="请输入"/>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '6'">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务产品" prop="companyId">
                  <Input v-model="queryItem.product" placeholder="请输入"/>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '7' || formTitle === '8'">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"/>
                </Form-item>
              </i-col>
               <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="companyName">
                  <Input v-model="queryItem.empId" placeholder="请输入"/>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '9'">
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户总监：" prop="majordomo">
                  <Input v-model="queryItem.majordomo" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户经理：" prop="manager">
                  <Input v-model="queryItem.manager" placeholder="请输入"/>
                </Form-item>
              </i-col>
              <i-col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"/>
                </Form-item>
              </i-col>
            </Row>
            <Row type="flex" justify="start" class="tr">  
              <i-col :sm="{span: 24}">
                <Button type="primary" @click="exportform(queryItem)" class="ml10" icon="ios-search">导出报表</Button>
                <Button type="warning" @click="$refs['queryItem'].resetFields();" class="ml10">重置</Button>
              </i-col>
            </Row>   
          </Form>
        </div>
      </Panel>
    </Collapse>
    <!-- <div v-if="queryItem.formTitle === '1'">
      <Child1 :queryParam="queryParam"></Child1>
    </div>
    <div v-if="queryItem.formTitle === '2'">
      <Child2 :queryParam="queryParam"></Child2>
    </div>
    <div v-if="queryItem.formTitle === '3'">
      <Child3 :queryParam="queryParam"></Child3>
    </div>
    <div v-if="queryItem.formTitle === '4'">
      <Child4 :queryParam="queryParam"></Child4>
    </div>
    <div v-if="queryItem.formTitle === '5'">
      <Child5 :queryParam="queryParam"></Child5>
    </div>
    <div v-if="queryItem.formTitle === '6'">
      <Child6 :queryParam="queryParam"></Child6>
    </div>
    <div v-if="queryItem.formTitle === '7'">
      <Child7 :queryParam="queryParam"></Child7>
    </div>
    <div v-if="queryItem.formTitle === '8'">
      <Child8 :queryParam="queryParam"></Child8>
    </div>
    <div v-if="queryItem.formTitle === '9'">
      <Child9 :queryParam="queryParam"></Child9>
    </div>
    <div v-if="queryItem.formTitle === '10'">
      <Child10 :queryParam="queryParam"></Child10>
    </div> -->
  </div>
</template>
<script>
  import Child1 from './child/Child1'
  import Child2 from './child/Child2'
  import Child3 from './child/Child3'
  import Child4 from './child/Child4'
  import Child5 from './child/Child5'
  import Child6 from './child/Child6'
  import Child7 from './child/Child7'
  import Child8 from './child/Child8'
  import Child9 from './child/Child9'
  import Child10 from './child/Child10'

  import axios from 'axios'
  import Tools from '../../../lib/tools'
  import Decode from '../../../lib/decode'

  const host = process.env.SITE_HOST_REPORT_FORM
  export default {
    components: {
      Child1,
      Child2,
      Child3,
      Child4,
      Child5,
      Child6,
      Child7,
      Child8,
      Child9,
      Child10
    },
    data() {
      return {
        collapseInfo: [1],
        queryParam: {},
        formTitle:'1',
        queryItem: {
          companyId: '',
          majordomo: '',
          manager: '',
          companyName: '',
          product: '',
          birthday: '',
          empId: ''
        },
        ruleValidate: {
          formTitle: [{ required: true, message: '请选择报表主题', trigger: 'change' }],
        }
      }
    },
    methods: {
      exportform(form){
         if (this.formTitle == '2') {
          window.location = host+'/api/reportform/get2?companyId=' + form.companyId +
                                                  '&companyName=' + form.companyName +
                                                  '&manager=' + form.manager +
                                                  '&birthday=' + Tools.formatDate(form.birthday, "yyyy-MM-dd") 
        }
        if (this.formTitle == '3') {
          window.location = host+'/api/reportform/get3?companyId=' + form.companyId +
                                                  '&companyName=' + form.companyName +
                                                  '&manager=' + form.manager +
                                                  '&birthday=' + Tools.formatDate(form.birthday, "yyyy-MM-dd") 
        }
        if (this.formTitle == '4') {
          window.location = host+'/api/reportform/get4?companyId=' + form.companyId +
                                                  '&companyName=' + form.companyName +
                                                  '&majordomo=' + form.majordomo +
                                                  '&manager=' + form.manager +
                                                  '&product=' + form.product
        }
        if (this.formTitle == '5') {
          window.location = host+'/api/reportform/get5?companyId=' + form.companyId +
                                                  '&companyName=' + form.companyName +
                                                  '&majordomo=' + form.majordomo +
                                                  '&manager=' + form.manager +
                                                  '&product=' + form.product
        }
        if (this.formTitle == '7') {
          window.location = host+'/api/reportform/get7?companyId=' + form.companyId +
                                                  '&companyName=' + form.companyName +
                                                  '&employeeId=' + form.employeeId
        }
      }
    },
    watch: {
      formTitle: function (){
        this.$refs.queryItem.resetFields();
      }
    }
  }
</script>

<style>

</style>
