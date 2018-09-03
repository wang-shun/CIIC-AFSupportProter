<template>
  <div class="smList">
    <Card>
      <Form :model="transferItem" ref="transferItem" :rules="transferValidate" :label-width="120">
        <Row type="flex" justify="start" class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="雇员编号：" prop="employeeId">
              <Input v-model="transferItem.employeeId" placeholder="请输入" @on-blur="queryEmployeeInfo"></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="公司编号：" prop="companyId">
              <Input v-model="transferItem.companyId" placeholder="请输入"></Input>
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
              <Input v-model="transferItem.turnOutAddress" placeholder="请输入"></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <FormItem label="备注：">
              <Input type="textarea" v-model="transferItem.remark" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入..."></Input>
            </FormItem>
          </Col>
        </row>
        <Row type="flex" justify="start">
          <Col :sm="{span: 24}" class="tr">
            <Button type="primary" @click="addTransfer" :loading="loading">提交</Button>
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
        transferItem: {
          employeeId: '',
          employeeName: '',
          companyId: '',
          companyName: '',
          idNum: '',
          turnOutDate: null,
          turnOutAddress: '',
          turnBackDate: null,
          remark: ''
        },
        transferValidate: this.$Validator.transferValidator,
      }
    },
    methods: {
      ...mapActions("TRANSFER", [EventTypes.TRANSFER_INSERT, EventTypes.EMPLOYEEINFO]),

      back() {
        this.$local.back();
      },
      addTransfer() {
        if (this.transferItem.employeeName != null) {
          this.$refs['transferItem'].validate((valid) => {
            if (valid) {
              /*vue数据脱绑*/
              let params = JSON.parse(JSON.stringify(this.transferItem));
              /*前台时间转化为字符串*/
              params.turnOutDate = this.$utils.formatDate(this.transferItem.turnOutDate, 'YYYY-MM-DD');
              params.turnBackDate = this.$utils.formatDate(this.transferItem.turnBackDate, 'YYYY-MM-DD');
              this.loading = true;
              this[EventTypes.TRANSFER_INSERT]({
                data: params,
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
        } else {
          this.$Message.error("雇员不存在，提交失败");
        }
      },
      queryEmployeeInfo() {
        if (this.transferItem.employeeId === null || this.transferItem.companyId === null) {
          this.$Message.error("请完善雇员编号、公司编号");
          return;
        }
        let params = {};
        params.employeeId = this.transferItem.employeeId;
        params.companyId = this.transferItem.companyId;
        this[EventTypes.EMPLOYEEINFO]({
          data: params,
          callback: (res) => {
            if (res.object.code === 0 && res.object.data !== null) {
              this.transferItem.employeeName = res.object.data.employeeName;
              this.transferItem.companyName = res.object.data.companyName;
              this.transferItem.idNum = res.object.data.idNum;
              this.$Message.success("查询人员信息成功");
            } else if (res.object.code === 0 && res.object.data === null) {
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
