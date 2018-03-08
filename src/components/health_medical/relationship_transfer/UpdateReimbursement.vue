<template>
  <div class="addMedicalTransform">
    <Card>
      <Form :model="reimbursementItem" ref="reimbursementItem" :rules="reimbursementValidator" :label-width="120">
        <Row type="flex" justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="雇员编号：" prop="employeeId">
            <Input v-model="reimbursementItem.employeeId" placeholder="请输入"/>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="公司编号：">
            <Input v-model="reimbursementItem.companyId" placeholder="请输入" @on-blur="queryEmployeeInfo"/>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="雇员姓名：">
            <span>戴敏</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="证件号码：">
            <span>3100011989070101568</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="公司名称：">
            <span>东莞瑞德丽邦基数咨询服务有限公司</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="客户经理：">
            <span>张丽玲</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="受理金额：" prop="caseMoney">
            <InputNumber v-model="reimbursementItem.caseMoney" placeholder="请输入" style="width: 100%"></InputNumber>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="发票数：" prop="invoiceNumber">
            <InputNumber v-model="reimbursementItem.invoiceNumber" placeholder="请输入" style="width: 100%"></InputNumber>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="医保结算金额：" prop="medicalClearingMoney">
            <InputNumber v-model="reimbursementItem.medicalClearingMoney" placeholder="请输入"
                         style="width: 100%"></InputNumber>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="医疗备注：" prop="medicalRemark">
            <Input type="textarea" v-model="reimbursementItem.medicalRemark" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."/>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="医疗结算反馈：" prop="medicalCle1aringFeedBack">
            <Input type="textarea" v-model="reimbursementItem.medicalCle1aringFeedBack"
                   :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
          </FormItem>
          </Col>
        </row>
        <Row type="flex" justify="start">
          <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="updateReimbursement">提交</Button>
          <Button type="success" @click="back">返回</Button>
          </Col>
        </Row>
      </Form>
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
