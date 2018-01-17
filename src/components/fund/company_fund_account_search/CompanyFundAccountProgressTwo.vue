<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账号信息
        <div slot="content">
          <company-fund-account-info-and-operate :companyFundAccountInfo="data.companyFundAccountInfo"></company-fund-account-info-and-operate>
        </div>
      </Panel>
      <Panel name="2">
        企业公积金账号绑定公司列表
        <div slot="content">
          <company-fund-account-bind-list :accountBindCompanyData="data.accountBindCompanyData"></company-fund-account-bind-list>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import companyFundAccountInfoAndOperate from "../common/CompanyFundAccountInfoAndOperate.vue"
  import companyFundAccountBindList from "../common/CompanyFundAccountBindList.vue"

  export default {
    components: {companyFundAccountInfoAndOperate, companyFundAccountBindList},
    data() {
      return {
        collapseInfo: [1, 2]
      }
    },
    mounted() {
      this[EventType.COMPANYFUNDACCOUNTPROGRESSTWO]()
    },
    computed: {
      ...mapState('companyFundAccountProgressTwo',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('companyFundAccountProgressTwo',[EventType.COMPANYFUNDACCOUNTPROGRESSTWO]),
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
