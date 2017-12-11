<template>
  <div class="smList">
    <Card>
      <Form :model="formItem" ref="formItem" :rules="marketValidate" :label-width="120">
        <row>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="活动主题：" prop="activityTitle">
            <Input v-model="formItem.activityTitle" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="发布人：" prop="publisher">
            <Input v-model="formItem.publisher" placeholder="请输入"/>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="礼品形式：" prop="giftForm" @on-change="$refs['giftForm'].validate()">
            <CheckboxGroup v-model="formItem.giftForm">
              <Checkbox label="1">实物</Checkbox>
              <Checkbox label="2">纸质票券</Checkbox>
              <Checkbox label="3">电子票券</Checkbox>
            </CheckboxGroup>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="派送方式：" prop="sendWay">
            <CheckboxGroup v-model="formItem.sendWay">
              <Checkbox label="0">送至中心</Checkbox>
              <Checkbox label="1">委托快递</Checkbox>
            </CheckboxGroup>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="活动时间：" prop="marketTime">
            <DatePicker v-model="formItem.marketTime" type="daterange" style="width: 100%;" placeholder="选择日期"></DatePicker>
          </Form-item>
          </Col>
          <Col :xs="{ span: 6, offset: 1 }" :lg="{ span: 6, offset: 1 }">
          <Form-item label="详细内容：" prop="content">
            <Input v-model="formItem.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."/>
          </Form-item>
          </Col>
        </row>
        <row>
          <Col :xs="{ span: 6, offset: 8 }" :lg="{ span: 6, offset: 8 }">
          <Button type="primary" @click="addMarketActivity()">提交</Button>
          <Button type="warning" @click="back">返回</Button>
          </Col>
        </row>
      </Form>
    </Card>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  import EventTypes from "../../../store/EventTypes"

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
        marketValidate: {
          activityTitle: [
            {required: true, message: '请输入活动主题', trigger: 'blur'}
          ],
          publisher: [
            {required: true, message: '请输入发布人', trigger: 'change'}
          ],
          giftForm: [
            {required: true, message: '请选择派送方式', trigger: 'change'},
            {
              validator(rule, val ,callback) {
               if (!val || val.length === 0) {
                 callback(new Error('请选择礼品形式'))
               } else {
                 callback()
               }
              },
              trigger: 'change'
            }
          ],
          sendWay: [
            {required: true, message: '请选择派送方式', trigger: 'change'},
            {
              validator(rule, val ,callback) {
                if (!val || val.length === 0) {
                  callback(new Error('请选择派送方式'))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }
          ],
          marketTime: [
            {required: true, message: '请选择活动时间', trigger: 'change'},
            {
              validator(rule, val ,callback) {
                if (!val || val.length < 2) {
                  callback(new Error('请选择活动时间'))
                } else {
                  callback()
                }
              },
              trigger: 'change'
            }
          ],
          status: [
            {required: true, message: '请选择状态', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入详细内容', trigger: 'change'},
            {
              validator(rule, val ,callback) {
                if (!val || val.length >= 200) {
                  callback(new Error('不超过200字'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            }
          ],
        }
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
            params.beginTime = this.$utils.formatDate(this.formItem.marketTime[0], 'YYYY-MM-DD HH:mm:ss');
            params.endTime = this.$utils.formatDate(this.formItem.marketTime[1], 'YYYY-MM-DD HH:mm:ss');
            params.giftForm = params.giftForm.join();
            params.sendWay = params.sendWay.join();
            this[EventTypes.MARKETINSERTTYPE]({
              data: params,
              callback: (res) => {
                if (res.data == 1) {
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
    watch: {
      //监听路由变化 页面重载或路由跳转获取URL参数
      $route() {
      }
    },
    created() {
    },
  }
</script>

<style>

</style>
