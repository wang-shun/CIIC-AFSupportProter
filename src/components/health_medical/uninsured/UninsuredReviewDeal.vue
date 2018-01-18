<template>
  <div class="auditAcceptance">
    <Card>
      <Form ref="formItem" :model="formItem" :rules="uninsuredReviewDealRules" :label-width="140">
        <Row justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="就诊医院：" prop="clinicHospital">
            <Input v-model="formItem.clinicHospital" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="受理金额：" prop="acceptAmount">
            <InputNumber :min="1" v-model="formItem.acceptAmount" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="付款方式：" prop="payType">
            <Select v-model="formItem.payType" placeholder="请选择" :clearable="true">
              <Option v-for="item in payTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="就诊日期：" prop="diagnoseDate">
            <DatePicker v-model="formItem.diagnoseDate" type="date" placeholder="请选择日期"
                        style="width: 100%"></DatePicker>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="住院开始日期：" prop="hospitalizationStartDate">
            <DatePicker v-model="formItem.hospitalizationStartDate" type="date" placeholder="请选择日期"
                        style="width: 100%"></DatePicker>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="住院结束日期：" prop="hospitalizationEndDate">
            <DatePicker v-model="formItem.hospitalizationEndDate" type="date" placeholder="请选择日期"
                        style="width: 100%"></DatePicker>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="诊断：" prop="diagnose">
            <Input v-model="formItem.diagnose" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="住院天数：" prop="hospitalizationDays">
            <InputNumber :min="0" v-model="formItem.hospitalizationDays" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="审核金额：" prop="auditAmount">
            <InputNumber :min="1" v-model="formItem.auditAmount" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="备注：" prop="remark">
            <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
          </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="附件：" prop="attachment">
            <Input v-model="formItem.attachment" placeholder="请输入"/>
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
          clinicHospital: null,
          acceptAmount: null,
          payType: null,
          diagnoseDate: null,
          hospitalizationStartDate: null,
          hospitalizationEndDate: null,
          diagnose: null,
          hospitalizationDays: null,
          auditAmount: null,
          remark: null,
          attachment: null,
          auditor: null, // 审核人
          auditDate: new Date(),
        },
        payTypes: admissibility.payTypes,
        caseTypes: admissibility.caseTypes,
        statusProperties: admissibility.statusProperties,
        uninsuredReviewDealRules: admissibility.uninsuredReviewDealRules,
      }
    },
    methods: {
      addUninsuredReviewDeal() {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            this.$router.push({name: "uninsuredReview"})
          }
        });
      },
      back() {
        this.$local.back();
      },
    },
  }
</script>
