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
        办理所需材料清单
        <div slot="content">
          <handle-need-matrials-list :materialsListInfo="data.materialListData"></handle-need-matrials-list>
        </div>
      </Panel>
      <Panel name="4">
        材料签收往来记录
        <div slot="content">
          <chat :chatList="data.chatList"></chat>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}">
        <Button type="error" @click="goBack">批退</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}" class="tr">
        <Button type="primary">保存</Button>
        <Button type="primary" @click="goBack">反馈未签收</Button>
        <Button type="primary" @click="goBack">签收全部材料</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import employeeInfo from '../common/EmployeeInfo.vue'
  import handleNeedMatrialsList from '../common/HandleNeedMatrialsList.vue'
  import chat from '../../common_control/chat_history/Chat.vue'

  export default {
    components: {companyFundAccountInfo, employeeInfo, handleNeedMatrialsList, chat},
    data() {
      return {
        currentStep: 2,
        collapseInfo: [1, 2, 3, 4], //展开栏
      }
    },
    mounted() {
      this[EventType.EMPLOYEEFUNDSPECIALPROGRESSTWO]()
    },
    computed: {
      ...mapState('employeeFundSpecialProgressTwo', {
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundSpecialProgressTwo', [EventType.EMPLOYEEFUNDSPECIALPROGRESSTWO]),
      nextStep() {
        this.$router.push({name: 'employeeFundSpecialProgressThree'});
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
