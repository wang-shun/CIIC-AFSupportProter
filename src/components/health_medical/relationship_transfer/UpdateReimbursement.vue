<template>
  <div class="addMedicalTransform">
    <Card>
      <Form :model="reimbursementItem" ref="reimbursementItem" :rules="reimbursementValidator" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="雇员编号：" prop="employeeId">
            <Input v-model="reimbursementItem.employeeId" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="雇员姓名：">
            <span class="expand-value">戴敏</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="证件号码：">
            <span class="expand-value">3100011989070101568</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="公司编号：">
            <span class="expand-value">29198</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="公司名称：">
            <span class="expand-value">东莞瑞德丽邦基数咨询服务有限公司</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="客户经理：">
            <span class="expand-value">张丽玲</span>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="受理金额：" prop="caseMoney">
            <InputNumber v-model="reimbursementItem.caseMoney" placeholder="请输入" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="发票数：" prop="invoiceNumber">
            <InputNumber v-model="reimbursementItem.invoiceNumber" placeholder="请输入" style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="医保结算金额：" prop="medicalClearingMoney">
            <InputNumber v-model="reimbursementItem.medicalClearingMoney" placeholder="请输入"
                         style="width: 100%"></InputNumber>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="医疗备注：" prop="medicalRemark">
            <Input type="textarea" v-model="reimbursementItem.medicalRemark" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="医疗结算反馈：" prop="medicalCle1aringFeedBack">
            <Input type="textarea" v-model="reimbursementItem.medicalCle1aringFeedBack"
                   :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
          </Form-item>
          </Col>
        </row>
      </Form>
      <div class="tc">
        <Button type="primary" @click="updateReimbursement">提交</Button>
        <Button type="success" @click="back">返回</Button>
      </div>
    </Card>
  </div>
</template>
<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/event_types"

  export default {
    data() {
      return {
        reimbursementItem: {},
        reimbursementValidator: this.$Validator.reimbursementValidator
      };
    },
    created() {
      this.reimbursementItem = this.$route.params.data;
      this.initData();
    },
    watch: {
      formItem: function (val, oldval) {
        if (this.reimbursementItem) {
          sessionStorage.setItem('reimbursementFormItem', JSON.stringify(this.reimbursementItem));
        }
      }
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.REIMBURSEMENT_INSERT]),
      initData() {
        if (!this.reimbursementItem) {
          this.reimbursementItem = JSON.parse(sessionStorage.getItem('reimbursementFormItem'));
        }
      },
      back() {
        this.$local.back();
      },
      updateReimbursement() {
        this.$refs['reimbursementItem'].validate((valid) => {
          if (valid) {
            this[EventTypes.REIMBURSEMENT_UPDATE]({
              data: this.reimbursementItem,
              callback: (res) => {
                if (res.code === 200) {
                  this.$router.push({name: 'relationshipTransfer', params: {data: 1}})
                } else {
                  this.$Message.error("服务器异常，请稍后再试");
                }
              },
              errCallback: () => {
                this.$Message.error("服务器异常，请稍后再试");
              }
            });
          }
        })
      },
    },
  }


</script>
