<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        客户信息
        <div slot="content">
          <customer-info :customerInfo="data.customerInfo"></customer-info>
        </div>
      </Panel>
      <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <handle-need-matrials-list :materialsListInfo="data.materialListData"></handle-need-matrials-list>
        </div>
      </Panel>
      <Panel name="3">
        材料签收来往记录
        <div slot="content">
          <chat :chatList="data.chatList"></chat>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="error" @click="goBack">批退</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
        <Button type="primary" @click="">保存</Button>
        <Button type="primary" @click="">反馈未签收</Button>
        <Button type="primary" @click="nextStep">签收全部材料</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import customerInfo from "../common/CustomerInfo.vue"
  import handleNeedMatrialsList from "../common/HandleNeedMatrialsList.vue"
  import chat from "../../common_control/chat_history/Chat.vue"

  export default {
    components: {customerInfo, handleNeedMatrialsList, chat},
    data() {
      return {
        collapseInfo: [1, 2, 3]
      }
    },
    mounted() {
      this[EventType.COMPANYFUNDTASKPROGRESSTWO]()
    },
    computed: {
      ...mapState('companyFundTaskProgressTwo',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('companyFundTaskProgressTwo',[EventType.COMPANYFUNDTASKPROGRESSTWO]),
      goBack() {
        this.$router.go(-1);
      },
      nextStep() {
        this.$router.push({name: 'companyFundTaskProgressThree'})
      }
    }
  }
</script>
