<template>
  <Form :label-width=150>
    <Steps :current="currentStep">
      <Step title="材料收集"></Step>
      <Step title="已受理"></Step>
      <Step title="送审中"></Step>
      <Step title="完成"></Step>
    </Steps>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业账户信息
        <div slot="content">
          <company-social-security-info :company="data.company"></company-social-security-info>
        </div>
      </Panel>
      <Panel name="2">
        前道传递信息
        <div slot="content">
          <Row>
            <Col :sm="{span:23, offset: 1}">
              <label>共{{data.chatList.length}}条历史备注</label>
              <chat :chatList="data.chatList" class="mt20"></chat>
            </Col>
          </Row>
        </div>
      </Panel>
      <Panel name="3">
        企业转移操作
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="中心(结算区县)：" class="">
                  <Select v-model="transferOperator.regionValue" style="width: 100%;">
                    <Option v-for="item in transferOperator.regionList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移日期：" class="">
                  <DatePicker v-model="transferOperator.transferDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：" class="">
                  <DatePicker v-model="transferOperator.accpetDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：" class="">
                  <DatePicker v-model="transferOperator.approvalDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：" class="">
                  <DatePicker v-model="transferOperator.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退原因：" class="">
                  <Input v-model="transferOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="primary" @click="goBack">办理</Button>
        <Button type="error" @click="goBack">批退</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../common_control/chat_history/Chat.vue'
  import companySocialSecurityInfo from '../../common_control/CompanySocialSecurityInfo.vue'
  import EventType from "../../../store/event_types"

  export default {
    components: {chat, companySocialSecurityInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        currentStep: 2,
        transferOperator: {
          regionValue: '',
          regionList: [
            {value: '', label: '全部'},
            {value: '徐汇', label: '徐汇'},
            {value: '长宁', label: '长宁'},
            {value: '浦东', label: '浦东'},
            {value: '静安', label: '静安'},
            {value: '黄浦', label: '黄浦'},
            {value: '杨浦', label: '杨浦'},
            {value: '普陀', label: '普陀'},
            {value: '宝山', label: '宝山'},
            {value: '虹口', label: '虹口'},
            {value: '闵行', label: '闵行'},
            {value: '松江', label: '松江'},
            {value: '嘉定', label: '嘉定'},
            {value: '青浦', label: '青浦'},
            {value: '奉贤', label: '奉贤'},
            {value: '崇明', label: '崇明'},
            {value: '金山', label: '金山'},
          ],
          transferDate: '',
          accpetDate: '',
          approvalDate: '',
          finishDate: '',
          refuseReason: ''
        }
      }
    },
    mounted() {
      this[EventType.COMPANYTASKPROGRESSTRANSFERINFOTYPE]()
    },
    computed: {
      ...mapState('companyTaskProgressTransferInfo',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('companyTaskProgressTransferInfo', [EventType.COMPANYTASKPROGRESSTRANSFERINFOTYPE]),
      goBack() {
        this.$router.push({name: 'companyTaskList'})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
