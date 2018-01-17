<template>
  <div class="auditAcceptance">
    <Card>
      <Form ref="formItem" :model="formItem" :label-width="140">
        <Row justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="就诊医院：" prop="name">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="受理金额：" prop="types">
            <Input v-model="formItem.name" placeholder=""/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="付款方式：" prop="types">
            <Select v-model="formItem.payType" placeholder="请选择" :clearable="true">
              <Option v-for="item in payTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="就诊日期：">
            <DatePicker v-model="formItem.deliveryDate" type="date" placeholder="请选择日期" style="width: 100%"></DatePicker>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="住院开始日期：">
            <DatePicker v-model="formItem.deliveryDate" type="date" placeholder="请选择日期" style="width: 100%"></DatePicker>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="住院结束日期：">
            <DatePicker v-model="formItem.deliveryDate" type="date" placeholder="请选择日期" style="width: 100%"></DatePicker>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="诊断：" prop="name">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="住院天数：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="审核金额：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="备注：">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="附件：">
            <Input v-model="formItem.name" placeholder="请输入"/>
          </Form-item>
          </Col>
        </row>
        <Row type="flex" justify="start">
          <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="addUninsuredReviewDeal">提交</Button>
          <Button type="warning" @click="back">返回</Button>
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
</template>

<script>
  import admissibility from '../../../store/modules/health_medical/data_sources/admissibility.js'

  export default {
    data() {
      return {
        formItem: {
          name: null,
          code: null,
        },
        payTypes: admissibility.payTypes,
        caseTypes: admissibility.caseTypes,
        statusProperties: admissibility.statusProperties,
      }
    },
    methods: {
      addUninsuredReviewDeal() {

        this.$router.push({name:"uninsuredReview"})
      },
      back() {
        this.$local.back();
      },
    },
  }
</script>
