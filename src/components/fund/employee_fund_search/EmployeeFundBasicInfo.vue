<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        基本信息
        <div slot="content">
          <basic-info :basicInfo="data.basicInfo"></basic-info>
        </div>
      </Panel>
      <Panel name="2">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :companyFundAccountInfo="data.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="3">
        雇员基本公积金信息
        <div slot="content">
          <fund-info :fundInfo="data.basicFundInfo" :isBasicFund="true"></fund-info>
        </div>
      </Panel>
      <Panel name="4">
        雇员补充公积金信息
        <div slot="content">
          <fund-info :fundInfo="data.addFundInfo" :isBasicFund="false"></fund-info>
        </div>
      </Panel>
      <Panel name="5">
        雇员基本/补充公积金转移
        <div slot="content">
          <fund-transfer :transferFundInfo="data.transferFundInfo"></fund-transfer>
        </div>
      </Panel>
      <Panel name="6">
        备注
        <div slot="content">
          <fund-notes :notesInfo="data.notesInfo"></fund-notes>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary">保存</Button>
        <Button type="warning" @click="back">关闭/返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../../store/event_types'
  import basicInfo from '../common/BasicInfo.vue'
  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import fundInfo from '../common/FundInfo.vue'
  import fundTransfer from '../common/FundTransfer.vue'
  import fundNotes from '../common/FundNotes.vue'

  export default {
    components: {basicInfo, companyFundAccountInfo, fundInfo, fundTransfer, fundNotes},
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
