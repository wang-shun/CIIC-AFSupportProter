<template>
  <div class="smList">
    <Card>
      <Form :model="formItem" ref="formItem" :rules="marketValidate" :label-width="120">
        <Row class="mt20 mr10">
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="活动主题：" prop="activityTitle">
              <Input v-model="formItem.activityTitle" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="发布人：" prop="publisher">
              <Input v-model="formItem.publisher" placeholder="请输入"></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="礼品形式：" prop="giftForm">
              <CheckboxGroup v-model="formItem.giftForm">
                <Checkbox label="1">实物</Checkbox>
                <Checkbox label="2">纸质票券</Checkbox>
                <Checkbox label="3">电子票券</Checkbox>
              </CheckboxGroup>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="派送方式：" prop="sendWay">
              <CheckboxGroup v-model="formItem.sendWay">
                <Checkbox label="0">送至中心</Checkbox>
                <Checkbox label="1">委托快递</Checkbox>
              </CheckboxGroup>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="活动时间：" prop="marketTime">
              <DatePicker v-model="formItem.marketTime" type="daterange" style="width: 100%;"
                          placeholder="选择日期"></DatePicker>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="状态：" prop="status">
              <Select v-model="formItem.status" style="width:200px">
                <Option value="0">进行中</Option>
                <Option value="1">已结束</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="详细内容：" prop="content">
              <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
            <Button type="warning" @click="back">返回</Button>
            <Button type="primary" @click="updateMarketActivity()">提交</Button>
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
        onlyNum: false,
        formItem: {
          id: null,
          activityTitle: "",//活动主题
          publisher: "",//发布人
          marketTime: [],//活动时间
          status: "",//状态
          content: "",//详细内容
          giftForm: [],//礼品形式
          sendWay: [],//派送方式
        },
        peopleTypes: [
          {
            value: '1',
            label: '常规礼品申请'
          },
          {
            value: '2',
            label: '公司礼品申请'
          }
        ],
        marketValidate: this.$Validator.marketValidate,
      }
    },

    created() {
      this.formItem = this.$route.params.data;
      this.initData();
    },
    watch: {
      formItem: function (val, oldval) {
        if (this.formItem) {
          sessionStorage.setItem('updateActivityFormItem', JSON.stringify(this.formItem));
        }
      }
    },
    methods: {
      ...mapActions("MARKET", [EventTypes.MARKETUPDATETYPE]),
      initData() {
        if (!this.formItem) {
          this.formItem = JSON.parse(sessionStorage.getItem('updateActivityFormItem'));
        }
      },
      back() {
        this.$local.back();
      },
      updateMarketActivity() {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            /*vue数据脱绑*/
            let params = JSON.parse(JSON.stringify(this.formItem));
            /*前台时间转化为字符串*/
            params.beginTime = this.formItem.marketTime[0];
            params.endTime = this.formItem.marketTime[1];
            /*修改时间*/
            params.modifiedTime = new Date();
            params.giftForm = params.giftForm.join();
            params.sendWay = params.sendWay.join();
            this[EventTypes.MARKETUPDATETYPE]({
              data: params,
              callback: (res) => {
                if (res.data.code === 0) {
                  this.$router.push({path: '/marketActivitiesManager'})
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

<style>

</style>
