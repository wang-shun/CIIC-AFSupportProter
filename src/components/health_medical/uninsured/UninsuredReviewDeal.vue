<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="uninsuredReviewDealRules" :label-width="140">
        <Row justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="就诊医院：" prop="clinicHospital">
              <Input v-model="formItem.clinicHospital" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="受理金额：" prop="acceptAmount">
              {{formItem.acceptAmount}}
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
              <Input v-model="formItem.diagnose" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="住院天数：" prop="hospitalizationDays">
              <InputNumber v-model="formItem.hospitalizationDays" style="width: 100%"></InputNumber>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="审核金额：" prop="auditAmount">
              <InputNumber :min="1" v-model="formItem.auditAmount" style="width: 100%"></InputNumber>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="备注：" prop="remark">
              <Input v-model="formItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入..."></Input>
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
  import apiAjax from "../../../data/health_medical/uninsured_application.js";
  import {localStorage, sessionStorage} from '../../../assets/api/storage'

  export default {
    data() {
      return {
        loading: false,
        formItem: {
          clinicHospital: '',
          acceptAmount: 0,
          payType: '',
          diagnoseDate: null,
          hospitalizationStartDate: null,
          hospitalizationEndDate: null,
          diagnose: '',
          hospitalizationDays: 0,
          auditAmount: 0,
          remark: '',
          attachment: null,
          auditor: '',
          auditDate: new Date(),
        },
        userInfo: {},
        payTypes: admissibility.payTypes,
        caseTypes: admissibility.caseTypes,
        statusProperties: admissibility.statusProperties,
        uninsuredReviewDealRules: admissibility.uninsuredReviewDealRules,
      }
    },
    created() {
      this.formItem.umAcceptanceId = sessionStorage.getItem('umAcceptanceId');
      this.formItem.acceptAmount = sessionStorage.getItem('caseMoney');
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.formItem.auditor = this.userInfo.displayName;
    },
    methods: {
      addUninsuredReviewDeal() {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            if (!this.formItem.attachment) {
              delete this.formItem.attachment
            }
            if (!this.formItem.diagnoseDate || this.formItem.diagnoseDate === '') {
              delete this.formItem.diagnoseDate
            }
            if (!this.formItem.hospitalizationEndDate || this.formItem.hospitalizationEndDate === '') {
              delete this.formItem.hospitalizationEndDate
            }
            if (!this.formItem.hospitalizationStartDate || this.formItem.hospitalizationStartDate === '') {
              delete this.formItem.hospitalizationStartDate
            }
            this.loading = true;
            apiAjax.addUninsuredAudit(this.formItem).then(response => {
              this.loading = false;
              if (response.data.code === 200) {
                this.$router.push({name: "uninsuredReview"})
              } else {
                this.$Message.error("服务器异常，请稍后再试");
              }
            }).catch(e => {
              console.info(e.message);
              this.$Message.error("服务器异常，请稍后再试");
            });
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
