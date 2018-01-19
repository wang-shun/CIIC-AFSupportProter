<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        客户信息
        <div slot="content">
          <customer-info :customerInfo="data.customerInfo" :isShowComplete="true"></customer-info>
        </div>
      </Panel>
      <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <fund-open-account :openAccountInfo="data.openAccountInfo"></fund-open-account>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="">提交</Button>
        <Button type="error" @click="goBack">批退</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import customerInfo from "../common/CustomerInfo.vue"
  import fundOpenAccount from "../common/FundOpenAccount.vue"

  export default {
    components: {customerInfo, fundOpenAccount},
    data() {
      return {
        collapseInfo: [1, 2]
      }
    },
    mounted() {
      this[EventType.COMPANYFUNDTASKPROGRESSTHREE]()
    },
    computed: {
      ...mapState('companyFundTaskProgressThree',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('companyFundTaskProgressThree', [EventType.COMPANYFUNDTASKPROGRESSTHREE]),
      goBack() {
        this.$router.push({name: "companyFundTaskList"});
      },
    }
  }
</script>
