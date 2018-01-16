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
        企业社保账户信息
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
        任务单参考信息
        <div slot="content">
          <chat :chatList="data.chatList"></chat>
        </div>
      </Panel>
      <Panel name="4">
        转移操作
        <div slot="content">
          <transfer-operate :fundOperatorInfo="data.fundOperatorInfo"></transfer-operate>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="primary" @click="">保存</Button>
        <Button type="info" @click="">打印转移单</Button>
        <Button type="default">不需处理</Button>
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
  import transferOperate from '../common/TransferOperate.vue'

  export default {
    components: {companyFundAccountInfo, employeeInfo, chat, transferOperate},
    data() {
      return {
        currentStep: 2,
        collapseInfo: [1, 2, 3, 4], //展开栏
      }
    },
    mounted() {
      this[EventType.EMPLOYEEFUNDTRANSFERPROGRESSTWO]()
    },
    computed: {
      ...mapState('employeeFundTransferProgressTwo', {
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundTransferProgressTwo', [EventType.EMPLOYEEFUNDTRANSFERPROGRESSTWO]),
      nextStep() {
        this.$router.push({name: 'employeeFundSpecialProgressThree'});
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
