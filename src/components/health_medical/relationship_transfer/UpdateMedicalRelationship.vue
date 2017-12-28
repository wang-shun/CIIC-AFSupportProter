<template>
  <div class="smList">
    <Card>
      <Form :model="transferItem" ref="transferItem" :rules="transferValidate" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="雇员编号：" prop="employeeId">
            <Input v-model="transferItem.employeeId" placeholder="请输入"/>
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
          <Form-item label="转出日期：" prop="turnOutDate">
            <DatePicker v-model="transferItem.turnOutDate" placeholder="请输入"></DatePicker>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="转出地点：" prop="turnOutAddress">
            <Input v-model="transferItem.turnOutAddress" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="转回日期：" prop="turnBackDate">
            <DatePicker v-model="transferItem.turnBackDate" placeholder="请输入"></DatePicker>
          </Form-item>
          </Col>

          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 0 }">
          <Form-item label="备注：">
            <Input type="textarea" v-model="transferItem.remark" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入..."/>
          </Form-item>
          </Col>
        </row>
      </Form>
      <div class="tc">
        <Button type="primary" @click="updateTransfer">提交</Button>
        <Button type="success" @click="back">返回</Button>
      </div>
    </Card>
  </div>
</template>
<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/EventTypes"

  export default {
    data() {
      return {
        transferItem: {},
        transferValidate: this.$Validator.transferValidator,
      }
    },
    created() {
      this.transferItem = this.$route.params.data;
      this.initData();
    },
    watch: {
      formItem: function (val, oldval) {
        if (this.transferItem) {
          sessionStorage.setItem('transferFormItem', JSON.stringify(this.transferItem));
        }
      }
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.TRANSFER_INSERT]),
      initData() {
        if (!this.transferItem) {
          this.transferItem = JSON.parse(sessionStorage.getItem('transferFormItem'));
        }
      },
      back() {
        this.$local.back();
      },
      updateTransfer() {
        console.info(this.transferItem)
        this.$refs['transferItem'].validate((valid) => {
          if (valid) {
            /*vue数据脱绑*/
            let params = JSON.parse(JSON.stringify(this.transferItem));
            /*前台时间转化为字符串*/
            params.turnOutDate = this.$utils.formatDate(this.transferItem.turnOutDate, 'YYYY-MM-DD');
            params.turnBackDate = this.$utils.formatDate(this.transferItem.turnBackDate, 'YYYY-MM-DD');
            this[EventTypes.TRANSFER_UPDATE]({
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
    },
  }


</script>
