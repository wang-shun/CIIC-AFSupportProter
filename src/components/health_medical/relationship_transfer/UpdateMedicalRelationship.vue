<template>
  <div class="smList">
    <Card>
      <Form :model="transferItem" ref="transferItem" :rules="transferValidate" :label-width="120">
        <Row type="flex" justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="雇员编号：">
            <span>{{transferItem.employeeId}}</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="公司编号：">
            <span>{{transferItem.companyId}}</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="雇员姓名：">
            <span>{{transferItem.employeeName}}</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="公司名称：">
            <span>{{transferItem.companyName}}</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="证件号码：">
            <span>{{transferItem.idNum}}</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="转出日期：" prop="turnOutDate">
            <DatePicker v-model="transferItem.turnOutDate" placeholder="请输入" transfer></DatePicker>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="转回日期：" prop="turnBackDate">
            <DatePicker v-model="transferItem.turnBackDate" placeholder="请输入" transfer></DatePicker>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="转出地点：" prop="turnOutAddress">
            <Input v-model="transferItem.turnOutAddress" placeholder="请输入"/>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="备注：">
            <Input type="textarea" v-model="transferItem.remark" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."/>
          </FormItem>
          </Col>
        </row>
        <Row type="flex" justify="start">
          <Col :sm="{span: 24}" class="tr">
          <Button type="primary" @click="updateTransfer" :loading="loading">提交</Button>
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
        transferItem: {},
        transferValidate: this.$Validator.transferValidator,
      }
    },
    created() {
      this.transferItem = JSON.parse(sessionStorage.getItem('transferFormItem'));
      this.transferItem.turnBackDate = new Date(this.transferItem.turnBackDate);
      this.transferItem.turnOutDate = new Date(this.transferItem.turnOutDate);
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.TRANSFER_UPDATE]),
      back() {
        this.$local.back();
      },
      updateTransfer() {
        this.$refs['transferItem'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this[EventTypes.TRANSFER_UPDATE]({
              data: this.transferItem,
              callback: (res) => {
                this.loading = false;
                if (res.code === 200) {
                  this.$router.push({path: '/relationshipTransfer'})
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
