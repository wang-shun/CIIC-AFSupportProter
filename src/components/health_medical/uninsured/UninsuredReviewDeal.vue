<template>
  <div>
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
          <Form-item ref="upload" label="附件：" prop="attachment">
            <Upload
              :before-upload="handleUpload"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              action="//jsonplaceholder.typicode.com/posts/">
              <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
              <div v-if="formItem.attachment !== null">图片: {{ this.formItem.attachment.name }}</div>
            </Upload>
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
      handleUpload(file) {
        this.formItem.attachment = file;

        /**附件的表单校验，iview不支持，自己调用动态校验方法*/
        let fields = this.$refs['formItem']._data.fields;
        let valid = true;
        for (let field of fields) {
          if (field.prop === 'attachment') {
            field.validate('', errors => {
              if (errors) {
                valid = false;
              }
              if (typeof callback === 'function') {
                callback(valid)
              }
            });
            break;
          }
        }
        return false;
      },
      back() {
        this.$local.back();
      },
    },
  }
</script>
