<template>
  <div>
    <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
      <Row class="mt20" type="flex" justify="start">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="服务中心：" prop="serviceCenterValue">
            <Select v-model="operatorSearchData.serviceCenterValue" style="width: 100%;" transfer>
              <Option v-for="item in operatorSearchData.serviceCenterList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="客户编号：" prop="customerNumber">
            <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="客户名称：" prop="customerName">
            <Input v-model="operatorSearchData.customerName" @on-focus="operatorSearchData.isShowCustomerName = true" placeholder="请输入..."></Input>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="社保账户类型：" prop="accountTypeValue">
            <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
              <Option v-for="item in operatorSearchData.accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="社保账户类型：" prop="companyAccountType">
            <Input v-model="operatorSearchData.companyAccountType" @on-focus="operatorSearchData.isShowAccountType = true" placeholder="请输入..."></Input>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="人员分类：" prop="personTypeValue">
            <Select v-model="operatorSearchData.personTypeValue" style="width: 100%;" transfer>
              <Option v-for="item in operatorSearchData.personTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
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
          <Form-item label="证件号：" prop="idNumber">
            <Input v-model="operatorSearchData.idNumber" placeholder="请输入..."></Input>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="任务单类型：" prop="taskTypeValue">
            <Select v-model="operatorSearchData.taskTypeValue" style="width: 100%;" transfer>
              <Option v-for="item in operatorSearchData.taskTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="结算区县：" prop="region">
            <Select v-model="operatorSearchData.region" style="width: 100%;" transfer>
              <Option >全部</Option>
              <Option v-for="(value,key) in this.baseDic.dic_settle_area" :value="value" :key="key">{{value}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="是否加急：" prop="emergency">
            <Select v-model="operatorSearchData.emergency" style="width: 100%;" transfer>
              <Option v-for="item in operatorSearchData.emergencyList" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="任务发起时间：" prop="taskStartTime">
            <DatePicker v-model="operatorSearchData.taskStartTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
          </Form-item>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col :sm="{span: 24}" class="tr">
            <Button type="primary" icon="ios-search">查询</Button>
            <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
          </Col>
        </Row>
      </Row>
    </Form>

    <!-- 客户名称 模态框 -->
    <Modal
      v-model="operatorSearchData.isShowCustomerName"
      title="选择客户"
      @on-ok="ok"
      @on-cancel="cancel">
      <customer-modal :customerData="customerData"></customer-modal>
    </Modal>

    <!-- 社保账户类型 模态框 -->
    <Modal
      v-model="operatorSearchData.isShowAccountType"
      title="社保账户类型"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-account-search-modal :sSocialSecurityTypeData="sSocialSecurityTypeData"></company-account-search-modal>
    </Modal>
  </div>
</template>
<script>
  import customerModal from './CustomerModal.vue'
  import companyAccountSearchModal from './CompanyAccountSearchModal.vue'

  export default {
    name: 'operatorsearch',
    components: {customerModal, companyAccountSearchModal},
    props: {
      customerData: {
        type: Array
      },
      sSocialSecurityTypeData: {
        type: Array
      }
    },
    data() {
      return {
        operatorSearchData: {
          serviceCenterValue: [],
          serviceCenterList: [
            {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
            {value: 2, label: '日本客户'},
            {value: 3, label: '虹桥'},
            {value: 4, label: '浦东'},
            {value: 5, label: '东区1'},
            {value: 6, label: '东区2'}
          ], //客服中心
          customerNumber: '', //客户编号
          customerName: '', //客户名称
          isShowCustomerName: false, //客户名称显示模态框
          accountTypeValue: '',
          accountTypeList: [
            {value: '1', label: '独立户'},
            {value: '2', label: '大库'},
            {value: '3', label: '外包'}
          ], //社保账户类型
          companyAccountType: '', //社保账户类型
          isShowAccountType: false, //客户名称显示模态框
          personTypeValue: '',
          personTypeList: [
            {value: '1', label: '本地'},
            {value: '2', label: '外地'},
            {value: '3', label: '外籍三险'},
            {value: '4', label: '外籍五险'}
          ], //人员分类
          employeeNumber: '', //雇员编号
          employeeName: '', //雇员姓名
          idNumber: '', //证件号
          taskTypeValue: '',
          taskTypeList: [
            {value: '1', label: '新开转入'},
            {value: '2', label: '调整'},
            {value: '3', label: '补缴'},
            {value: '4', label: '转出'}
          ], //人员分类
          region: '', //结算区域
          emergency: '',
          emergencyList: [
            {value: '1', label: ''},
            {value: '2', label: '加急'}
          ], //是否加急

          taskStartTime: '' //任务发起时间
        }
      }
    },
    methods: {
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
