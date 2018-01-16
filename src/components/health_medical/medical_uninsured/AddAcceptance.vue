<template>
  <div>
    <Card>
      <Form :model="formItem" :label-width="140">
        <Row type="flex" justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="业务顾问：" prop="types">
            <span class="expand-value">周莉</span>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="雇员编号：" prop="name">
            <span class="expand-value">1232154</span>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="雇员姓名：" v-if="!onlyNum" prop="dataTypes">
            <span class="expand-value">戴敏</span>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="证件号码：">
            <span class="expand-value">310105198505305026</span>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="中止日期：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="退保日期：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="款项类型：">
            <Select placeholder="请选择">
              <Option v-for="item in moneyTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="受理类型：">
            <Select placeholder="请选择">
              <Option v-for="item in caseTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="连带人：">
            <Select placeholder="请输入">
              <Option v-for="item in liandairens" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="连带人出生日期：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="受理金额：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="发票张数：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="医疗备注：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
          </Form-item>
          </Col>
        </Row>
      </Form>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="back">返回</Button>
        <router-link to="/addAcceptanceEmployeeList">
          <Button type="primary">提交</Button>
        </router-link>
        </Col>
      </Row>
    </Card>
  </div>
</template>
<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'

  export default {
    data() {
      return {
        onlyNum: false,
        formItem: {
          name: null,
          code: null,
          types: "",
          typeVal: "请选择",
          disabled: true,
          routerChanged: false,
          note: "雇员的名称"
        },
        moneyTypes: admissibility.moneyTypes,
        caseTypes: admissibility.caseTypes,
        /** 连带人后台加载*/
        liandairens: [
          {
            value: '1',
            label: '戴敏一'
          },
          {
            value: '2',
            label: '戴敏二'
          },
          {
            value: '3',
            label: '戴敏三'
          }
        ],

        ruleValidate: {
          name: [
            {required: true, message: '薪资项模板名称不能为空', trigger: 'blur'}
          ],
          types: [
            {required: true, message: '请选择薪资项模板类别', trigger: 'change'}
          ],
          dataTypes: [
            {required: true, message: '请选择数据类型', trigger: 'change'}
          ],
        }
      }
    },
    methods: {
      back() {
        this.$local.back();
      },
      selectChange() {
        this.formItem.disabled = false;
        if (this.formItem.types == "computed" || this.formItem.types == "seniorComputed" || this.formItem.types == "fixed") {
          this.onlyNum = true;
        } else {
          this.onlyNum = false;
        }
      },
    },
  }
</script>
