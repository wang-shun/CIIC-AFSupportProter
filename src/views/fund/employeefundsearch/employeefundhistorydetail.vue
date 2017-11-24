<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :fundInfo="data.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-fund-account-info :employeeFundInfo="data.employeeFundAccountInfo"></employee-fund-account-info>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">

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
          <fund-info :fundInfo="data.addFundInfo" :isBasicFund="false"></fund-info>
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

  export default {
    components: {companyFundAccountInfo, employeeFundAccountInfo, fundInfo, fundTransfer, historyTaskList},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5, 6, 7], //展开栏
        fundColumns: [
          {title: '公司编号', key: 'companyNumber', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyNumber),
              ]);
            }
          },
          {title: '公司名称', key: 'companyName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '入住日期', key: 'checkInDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.checkInDate),
              ]);
            }
          },
          {title: '离职日期', key: 'checkOutDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.checkOutDate),
              ]);
            }
          },
          {title: '上下岗状态', key: 'workStatus', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.workStatus),
              ]);
            }
          },
          {title: '选择', key: '', align: 'center',
            render: (h, params) => {
              return h('div', [
                h('a', {
                  on: {
                    click: () => {

                    }
                  }
                }, '选择'),
              ]);
            }
          }
        ],

      }
    },
    mounted() {
      this[EventTypes.EMPLOYEEFUNDBASICINFO]()
    },
    computed: {
      ...mapState('employeeFundBasicInfo', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundBasicInfo', [EventTypes.EMPLOYEEFUNDBASICINFO]),
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
