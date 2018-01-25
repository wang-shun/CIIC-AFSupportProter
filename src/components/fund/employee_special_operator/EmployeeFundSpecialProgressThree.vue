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
          <company-fund-account-info :companyFundAccountInfo="data.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :employeeInfo="data.employeeInfo"></employee-info>
        </div>
      </Panel>
      <Panel name="3">
        公积金特殊操作
        <div slot="content">
          <fund-special-operate :specialOperateInfo="data.specialOperateInfo"></fund-special-operate>
        </div>
      </Panel>
      <Panel name="4">
        <div slot="content">
          <chat :chatList="data.chatList"></chat>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:22}">
        <Form-item label="办理备注：">
          <Input v-model="handleNotes" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:2}">
        <Button type="primary" class="ml10">保存</Button>
      </Col>
      <Col :sm="{span:22}">
        <Form-item label="批退备注：">
          <Input v-model="refuseNotes" placeholder="请输入..."></Input>
        </Form-item>
      </Col>
      <Col :sm="{span:2}">
        <Button type="error" class="ml10">批退</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import employeeInfo from '../common/EmployeeInfo.vue'
  import chat from '../../common_control/chat_history/Chat.vue'
  import fundSpecialOperate from '../common/FundSpecialOperate.vue'

  export default {
    components: {companyFundAccountInfo, employeeInfo, chat, fundSpecialOperate},
    data() {
      return {
        currentStep: 2,
        collapseInfo: [1, 2, 3, 4], //展开栏
        handleNotes: '',
        refuseNotes: ''
      }
    },
    mounted() {
      this[EventType.EMPLOYEEFUNDSPECIALPROGRESSTHREE]()
    },
    computed: {
      ...mapState('employeeFundSpecialProgressThree', {
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundSpecialProgressThree', [EventType.EMPLOYEEFUNDSPECIALPROGRESSTHREE]),
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
