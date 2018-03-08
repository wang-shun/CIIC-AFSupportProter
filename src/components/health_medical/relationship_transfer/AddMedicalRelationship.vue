<template>
  <div class="smList">
    <Card>
      <Form :model="transferItem" ref="transferItem" :rules="transferValidate" :label-width="120">
        <Row type="flex" justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="雇员编号：" prop="employeeId">
            <Input v-model="transferItem.employeeId" placeholder="请输入"/>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="公司编号：">
            <Input v-model="transferItem.companyId" placeholder="请输入" @on-blur="queryEmployeeInfo"/>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="雇员姓名：">
            <span>戴敏</span>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="证件号码：">
            <span></span>
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
          <FormItem label="转出日期：" prop="turnOutDate">
            <DatePicker v-model="transferItem.turnOutDate" placeholder="请输入"></DatePicker>
          </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
          <FormItem label="转回日期：" prop="turnBackDate">
            <DatePicker v-model="transferItem.turnBackDate" placeholder="请输入"></DatePicker>
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
          <Button type="primary" @click="addTransfer">提交</Button>
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
        transferItem: {
          employeeId: "",
          companyId: "",
          turnOutDate: null,
          turnOutAddress: null,
          turnBackDate: null,
          remark: ""
        },
        transferValidate: this.$Validator.transferValidator,
      }
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.TRANSFER_INSERT]),

      back() {
        this.$local.back();
      },
      addTransfer() {
        this.$refs['transferItem'].validate((valid) => {
          if (valid) {
            /*vue数据脱绑*/
            let params = JSON.parse(JSON.stringify(this.transferItem));
            /*前台时间转化为字符串*/
            params.turnOutDate = this.$utils.formatDate(this.transferItem.turnOutDate, 'YYYY-MM-DD');
            params.turnBackDate = this.$utils.formatDate(this.transferItem.turnBackDate, 'YYYY-MM-DD');
            this[EventTypes.TRANSFER_INSERT]({
              data: params,
              callback: (res) => {
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
      queryEmployeeInfo() {
        console.info("=====+++");
      }
    },
  }


</script>
