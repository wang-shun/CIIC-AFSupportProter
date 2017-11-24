<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :fundInfo="data.companyFundAccountInfo" :isShowPayMonth="false"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-fund-account-info :employeeFundInfo="data.employeeFundAccountInfo" :isShowFundStatus="true"></employee-fund-account-info>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <employee-fund-task-reference-info :referenceInfo="data.employeeFundTaskReferenceInfo"></employee-fund-task-reference-info>
        </div>
      </Panel>
      <Panel name="4">
        操作
        <div slot="content">

        </div>
      </Panel>
      <Panel name="5">
        历史任务单
        <div slot="content">
          <!--<fund-info></fund-info>-->
        </div>
      </Panel>
    </Collapse>

  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../../store/EventTypes'
  import companyFundAccountInfo from '../../commoncontrol/companyfundaccountinfo.vue'
  import employeeFundAccountInfo from '../../commoncontrol/employeefundaccountinfo.vue'
  import historyTaskList from '../../commoncontrol/historytasklist.vue'
  import employeeFundTaskReferenceInfo from '../../commoncontrol/employeefundtaskreferenceinfo.vue'

  export default {
    components: {companyFundAccountInfo, employeeFundAccountInfo, historyTaskList, employeeFundTaskReferenceInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7], //展开栏
        taskType: this.$route.query.taskType
      }
    },
    mounted() {
      this[EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]()
    },
    computed: {
      ...mapState('employeeFundHistoryDetail', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundHistoryDetail', [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]),
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
