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
        企业终止操作
        <div slot="content">
          <Form :label-width=100>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：">
                  <DatePicker v-model="endOperator.accpetDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：">
                  <DatePicker v-model="endOperator.approvalDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：">
                  <DatePicker v-model="endOperator.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止日期：">
                  <DatePicker v-model="endOperator.endDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退原因：">
                  <Input v-model="endOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
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
  import EventType from '../../../store/event_types'

  export default {
    components: {chat, companySocialSecurityInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        currentStep: 2,
        endOperator: {
          accpetDate: '',
          approvalDate: '',
          finishDate: '',
          endDate: '',
          refuseReason: ''
        }
      }
    },
    mounted() {
      this[EventType.COMPANYTASKPROGRESSSENDINFOTYPE]()
    },
    computed: {
      ...mapState('companyTaskProgressSendInfo', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('companyTaskProgressSendInfo', [EventType.COMPANYTASKPROGRESSSENDINFOTYPE]),
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
