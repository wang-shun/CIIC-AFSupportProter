<template>
  <div class="addMedicalTransform">
    <Card>
      <Form :model="reimbursementItem" ref="reimbursementItem" :rules="reimbursementValidator" :label-width="120">
        <Row type="flex" justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="雇员编号：" prop="employeeId">
              <Input v-model="reimbursementItem.employeeId" placeholder="请输入" @on-blur="queryEmployeeInfo"></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="公司名称：">
              <label>
                <Select v-model="reimbursementItem.companyName" style="width:100%"
                        @on-change="v=>{selectEmployee(v.value)}" :label-in-value="true">
                  <Option v-for="item in employeeList" :value="item.companyName" :key="item.companyName">
                    {{ item.companyName }}
                  </Option>
                </Select>
              </label>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="公司编号：" prop="companyId">
              <span>{{reimbursementItem.companyId}}</span>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="雇员姓名：">
              <span>{{reimbursementItem.employeeName}}</span>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="证件号码：">
              <span>{{reimbursementItem.idNum}}</span>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="受理金额：" prop="caseMoney">
              <InputNumber v-model="reimbursementItem.caseMoney" placeholder="请输入" style="width: 100%"></InputNumber>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="发票数：" prop="invoiceNumber">
              <InputNumber v-model="reimbursementItem.invoiceNumber" placeholder="请输入"
                           style="width: 100%"></InputNumber>
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
                     placeholder="请输入..."></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="医疗结算反馈：" prop="medicalClearingFeedBack">
              <Input type="textarea" v-model="reimbursementItem.medicalClearingFeedBack"
                     :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
          </Col>
        </row>
        <Row type="flex" justify="start">
          <Col :sm="{span: 24}" class="tr">
            <Button type="primary" @click="addReimbursement" :loading="loading">提交</Button>
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
        loading: false,
        employeeList: [],
        reimbursementItem: {
          employeeId: '',
          employeeName: '',
          companyId: '',
          companyName: '',
          caseMoney: 0,
          idNum: '',
          invoiceNumber: 0,
          medicalRemark: '',
          medicalClearingMoney: 0,
          medicalClearingFeedBack: '',
        },
        reimbursementValidator: this.$Validator.reimbursementValidator
      };
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.REIMBURSEMENT_INSERT, EventTypes.EMPLOYEEINFO]),

      back() {
        this.$local.back();
      },
      addReimbursement() {
        this.$refs['reimbursementItem'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this[EventTypes.REIMBURSEMENT_INSERT]({
              data: this.reimbursementItem,
              callback: (res) => {
                this.loading = false;
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
      selectEmployee(val) {
        let employee = this.employeeList.find(item => item.employeeName = val);
        this.reimbursementItem.companyId = employee.companyId;
        this.reimbursementItem.employeeName = employee.employeeName;
        this.reimbursementItem.idNum = employee.idNum;
      },
      queryEmployeeInfo() {
        if (!this.reimbursementItem.employeeId) {
          return;
        }
        let params = {};
        params.employeeId = this.reimbursementItem.employeeId;
        this[EventTypes.EMPLOYEEINFO]({
          data: params,
          callback: (res) => {
            if (res.object.code === 0 && res.object.data) {
              this.employeeList = res.object.data;
              this.$Message.success("查询人员信息成功");
            } else if (res.object.code === 0 && !res.object.data) {
              this.$Message.error("没有查询到人员信息");
            } else {
              this.$Message.error("服务器异常，请稍后再试");
            }
          },
          errCallback: () => {
            this.$Message.error("服务器异常，请稍后再试");
          }
        });
      }
    },
  }
</script>
