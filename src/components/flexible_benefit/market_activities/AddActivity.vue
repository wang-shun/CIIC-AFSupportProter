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
            <Form-item label="礼品形式：" prop="giftForm" @on-change="$refs['giftForm'].validate()">
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
            <Form-item label="详细内容：" prop="content">
              <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col :sm="{span: 24}" class="tr">
            <Button type="warning" @click="back">返回</Button>
            <Button type="primary" @click="addMarketActivity()">提交</Button>
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
          activityTitle: "",//活动主题
          publisher: "",//发布人
          marketTime: [],//开始时间--结束时间
          content: "",//详细内容
          giftForm: [],//礼品形式
          sendWay: [],//派送方式
        },
        marketValidate: this.$Validator.marketValidate,
      }
    },
    methods: {
      ...mapActions("MARKET", [EventTypes.MARKETINSERTTYPE]),
      back() {
        this.$local.back();
      },
      addMarketActivity() {
        this.$refs['formItem'].validate((valid) => {
          if (valid) {
            /*vue数据脱绑*/
            let params = JSON.parse(JSON.stringify(this.formItem));
            /*前台时间转化为字符串*/
            params.beginTime = this.formItem.marketTime[0];
            params.endTime = this.formItem.marketTime[1];
            params.giftForm = params.giftForm.join();
            params.sendWay = params.sendWay.join();
            this[EventTypes.MARKETINSERTTYPE]({
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
    created() {
    },
  }
</script>

<style>

</style>
