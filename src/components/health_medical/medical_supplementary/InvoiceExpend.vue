<template>
  <div>
    <Form ref="row" :model="row" :label-width="140">
      <Row type="flex" justify="start" class="m15">
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="就诊机构：">
          {{row.medicalInstitution}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="疾病名称：">
          {{row.diseaseName}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="就诊日期：">
          {{this.$utils.formatDate(row.clinicDate, 'YYYY-MM-DD HH:mm:ss')}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="自付金额：">
          {{row.selfPayAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="统筹金额：">
          {{row.wholePlanAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="附加金额：">
          {{row.attachAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="自费金额：">
          {{row.ownExpenseAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="账户金额：">
          {{row.accountAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="申请金额：">
          {{row.applicationAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="赔付金额：">
          {{row.claimAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="核准金额：">
          {{row.approvedAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="分类自付金额：">
          {{row.csPaymentAmount}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="公司理赔金额：">
          {{row.companyMoney}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="保险理赔金额：" prop="inputDateRange">
          <Input v-model="row.insuranceCompanyMoney" size="large" placeholder="large size"/>
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="结案状态：">
          {{row.closedStatus}}
        </Form-item>
        </Col>
        <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
        <Form-item label="结案备注：">
          {{row.closedRemark}}
        </Form-item>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="updateInvoice">保存修改</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
  import apiAjax from "../../../data/health_medical/supplementary_medica.js";

  export default {
    name: "invoice-expend",
    props: {
      row: Object
    },
    methods: {
      updateInvoice() {
        apiAjax.updateMedicalInvoice(this.row).then(response => {
          if (response.data.code === 200) {
            this.$Message.success("保存成功");
          }
        }).catch(e => {
          console.info(e.message);
          this.$Message.error("服务器异常，请稍后再试");
        });
      },
    }
  }
</script>
