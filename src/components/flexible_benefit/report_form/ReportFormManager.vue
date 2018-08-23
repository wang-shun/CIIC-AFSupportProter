<template>
  <div class="smList">
    <Collapse v-model="collapseInfo" accordion>
      <Panel name="1">
        查询报表
        <div slot="content">
          <Form ref="queryItem" :model="queryItem" :rules="ruleValidate" :label-width="120">
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="报表主题：" prop="formTitle">
                  <Select v-model="formTitle" placeholder="请先选择报表主题内容" transfer>
                    <Option v-for="(value,key) in this.baseDic.form_title" :value="key" :key="key">{{ value }}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '2' || formTitle === '3'">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务产品：" prop="product">
                  <Select v-model="queryItem.product" placeholder="请选择" transfer>
                    <Option v-for="item in birthProducts" :value="item.productId" :key="item.productId">
                      {{item.productName}}
                    </Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员出生日期：" prop="birthday" key="1">
                  <Select v-model="queryItem.birthday" placeholder="请先选择月份" transfer>
                    <Option value="1">一月</Option>
                    <Option value="2">二月</Option>
                    <Option value="3">三月</Option>
                    <Option value="4">四月</Option>
                    <Option value="5">五月</Option>
                    <Option value="6">六月</Option>
                    <Option value="7">七月</Option>
                    <Option value="8">八月</Option>
                    <Option value="9">九月</Option>
                    <Option value="10">十月</Option>
                    <Option value="11">十一月</Option>
                    <Option value="12">十二月</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '4' || formTitle === '5'">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务产品：" prop="product" key="2">
                  <Select v-model="queryItem.product" placeholder="请选择" transfer>
                    <Option v-for="item in products" :value="item.productId" :key="item.productId">
                      {{item.productName}}
                    </Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '7'">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="empId" key="3">
                  <Input v-model="queryItem.empId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start" v-if="formTitle === '8'">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司编号：" prop="companyId">
                  <Input v-model="queryItem.companyId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：" prop="companyName">
                  <Input v-model="queryItem.companyName" placeholder="请输入"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="empId" key="3">
                  <Input v-model="queryItem.empId" placeholder="请输入"></Input>
                </Form-item>
              </Col>
            </Row>
            <Row type="flex" justify="start" class="tr">
              <Col :sm="{span: 24}">
                <Button type="primary" @click="exportForm(queryItem)" class="ml10" icon="ios-search">导出报表</Button>
                <Button type="warning" @click="$refs['queryItem'].resetFields()" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>

  import axios from 'axios'
  import Tools from '../../../lib/tools'

  const host = process.env.SITE_HOST_REPORT_FORM
  export default {
    data() {
      return {
        collapseInfo: [1],
        queryParam: {},
        products: [],
        birthProducts: [],
        formTitle: '2',
        queryItem: {
          companyId: '',
          majordomo: '',
          manager: '',
          companyName: '',
          product: 'CPDFL1800059',
          birthday: '1',
          empId: ''
        },
        ruleValidate: {
          formTitle: [{required: true, message: '请选择报表主题', trigger: 'change'}],
        }
      }
    },
    created() {
      this.findProducts();
      this.findBirthProducts()
    },
    methods: {
      findProducts() {
        axios.get(host + '/api/reportform/findProducts').then(response => {
          if (response.data.errCode === "0") {
            this.products = response.data.data
          }
        })
      },
      findBirthProducts() {
        axios.get(host + '/api/reportform/findBirthProducts').then(response => {
          if (response.data.errCode === "0") {
            this.birthProducts = response.data.data
          }
        })
      },
      exportForm(form) {
        if (this.formTitle === '2') {
          window.location = host + '/api/reportform/get2?companyId=' + form.companyId +
            '&companyName=' + form.companyName +
            '&productId=' + form.product +
            '&birthday=' + form.birthday
        } else if (this.formTitle === '3') {
          let birStart = "";
          let birEnd = "";
          if (form.birthday != null && form.birthday[0] !== "") {
            birStart = Tools.reportFormatDate(form.birthday[0], "YYYY-MM-DD")
            birEnd = Tools.reportFormatDate(form.birthday[1], "YYYY-MM-DD")
          }
          window.location = host + '/api/reportform/get3?companyId=' + form.companyId +
            '&companyName=' + form.companyName +
            '&manager=' + form.manager +
            '&birStart=' + birStart + '&birEnd=' + birEnd
        } else if (this.formTitle === '4') {
          window.location = host + '/api/reportform/get4?companyId=' + form.companyId +
            '&companyName=' + form.companyName +
            '&majordomo=' + form.majordomo +
            '&manager=' + form.manager +
            '&productId=' + form.product
        } else if (this.formTitle === '5') {
          window.location = host + '/api/reportform/get5?companyId=' + form.companyId +
            '&companyName=' + form.companyName +
            '&majordomo=' + form.majordomo +
            '&manager=' + form.manager +
            '&productId=' + form.product
        } else if (this.formTitle === '7') {
          window.location = host + '/api/reportform/get7?companyId=' + form.companyId +
            '&companyName=' + form.companyName +
            '&employeeId=' + form.empId
        } else if (this.formTitle === '8') {
          window.location = host + '/api/reportform/get8?companyId=' + form.companyId +
            '&companyName=' + form.companyName +
            '&employeeId=' + form.empId
        }
      }
    },
    watch: {
      formTitle: function () {
        this.$refs.queryItem.resetFields();
        this.queryItem.product = 'CPDFL1800059'
        console.log("empId:" + this.queryItem.empId)
      }
    }
  }
</script>

<style>

</style>
