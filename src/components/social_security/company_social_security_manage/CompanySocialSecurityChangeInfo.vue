<template>
  <Form :label-width=120>
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
          <company-social-security-info :company="data.company"></company-social-security-info>
        </div>
      </Panel>
      <Panel name="2">
        前道传递信息
        <div slot="content">
          <Row>
            <Col :sm="{span: 23, offset: 1}">
              <label>共{{data.chatList.length}}条历史备注</label>
              <chat :chatList="data.chatList" class="mt20"></chat>
            </Col>
          </Row>
        </div>
      </Panel>
      <Panel name="3">
        企业变更操作
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更内容：" class="">
                  <Select v-model="changeOperator.changeContentValue" style="width: 100%;" transfer>
                    <Option v-for="item in changeOperator.changeContentList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="所属行业：" class="">
                  <Input v-model="changeOperator.belongsIndustry" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业工伤比例：" class="">
                  <Input v-model="changeOperator.companyWorkInjuryPercentage" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更开始月份：" class="">
                  <DatePicker v-model="changeOperator.changeStartMonth" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：" class="">
                  <DatePicker v-model="changeOperator.accpetDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="审送日期：" class="">
                  <DatePicker v-model="changeOperator.approvalDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：" class="">
                  <DatePicker v-model="changeOperator.finishDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退原因：" class="">
                  <Input v-model="changeOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
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

        changeOperator: {
          changeContentValue: '',
          changeContentList: [
            {value: '1', label: '行业比例'},
            {value: '2', label: '付款方式'},
            {value: '3', label: '企业法人'},
            {value: '4', label: '公司名称'}
          ],
          belongsIndustry: '',
          companyWorkInjuryPercentage: '',
          changeStartMonth: '',
          accpetDate: '',
          approvalDate: '',
          finishDate: '',
          refuseReason: ''
        }
      }
    },
    mounted() {
      this[EventType.COMPANYSOCIALSECURITYCHANGEINFOTYPE]()
    },
    computed: {
      ...mapState('companySocialSecurityChangeInfo',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('companySocialSecurityChangeInfo', [EventType.COMPANYSOCIALSECURITYCHANGEINFOTYPE]),
      goBack() {
        this.$router.push({name: 'companySocialSecurity'})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
