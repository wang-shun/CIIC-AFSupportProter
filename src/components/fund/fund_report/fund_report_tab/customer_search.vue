<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        客户查询
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeNumber">
                  <Input v-model="operatorSearchData.employeeNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员名称：" prop="employeeName">
                  <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金账号：" prop="fundAccount">
                  <Input v-model="operatorSearchData.fundAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="补充公积金账号：" prop="fundAccount">
                  <Input v-model="operatorSearchData.addFundAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search">缴费明细</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="isShowFundPayChangeList = true;">基本公积金汇缴变更清册</Button>
        <Button type="primary" @click="isShowFundPayRepairList = true;">基本公积金补缴清册</Button>
        <Button type="primary" @click="isShowAddFundPayChangeList = true;">补充公积金汇缴变更清册</Button>
        <Button type="primary" @click="isShowAddFundPayRepairList = true;">补缴公积金补缴清册</Button>
      </Col>
    </Row>
    <Row class="mt20">
      <Form :label-width=150>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="最近计算时间：">
            {{data.lastCalculateDate}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
          <Form-item label="最近计算人：">
            {{data.lastCalculater}}
          </Form-item>
        </Col>
        <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" class="tr">
          <Button type="primary">重新汇总计算</Button>
        </Col>
      </Form>
    </Row>
    <Row>
      <Col :sm="{span:24}">
        <Table border :columns="customerSearchColumns" :data="data.customerSearchData"></Table>
        <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
      </Col>
    </Row>

    <Modal
      v-model="isShowFundPayChangeList"
      title="上海市公积金汇缴变更清册"
      width="960"
    >
      <fund-pay-change-list :fundPayChangeInfo="data.fundPayChangeInfo"></fund-pay-change-list>
      <div slot="footer">
        <Button type="warning" @click="isShowFundPayChangeList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowFundPayRepairList"
      title="上海市公积金补缴清册"
      width="960"
    >
      <fund-pay-repair-list :fundPayRepairInfo="data.fundPayRepairInfo"></fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayChangeList"
      title="上海市补充公积金汇缴变更清册"
      width="960"
    >
      <add-fund-pay-change-list :addFundPayChangeInfo="data.addFundPayChangeInfo"></add-fund-pay-change-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayChangeList = false;">返回</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowAddFundPayRepairList"
      title="上海市补充公积金补缴清册"
      width="960"
    >
      <add-fund-pay-repair-list :addFundPayRepairInfo="data.addFundPayRepairInfo"></add-fund-pay-repair-list>
      <div slot="footer">
        <Button type="warning" @click="isShowAddFundPayRepairList = false;">返回</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/event_types'

  import fundPayChangeList from '../../common/FundPayChangeList.vue'
  import fundPayRepairList from '../../common/FundPayRepairList.vue'
  import addFundPayChangeList from '../../common/AddFundPayChangeList.vue'
  import addFundPayRepairList from '../../common/AddFundPayRepairList.vue'

  export default {
    components: {fundPayChangeList, fundPayRepairList, addFundPayChangeList, addFundPayRepairList},
    data() {
      return {
        collapseInfo: [1],
        operatorSearchData: {
          employeeNumber: "",
          employeeName: "",
          fundAccount: "",
          addFundAccount: ""
        },
        isShowFundPayChangeList: false,
        isShowFundPayRepairList: false,
        isShowAddFundPayChangeList: false,
        isShowAddFundPayRepairList: false,
        customerSearchColumns: [
          {title: '公积金类型', key: 'fundType', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeNumber', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeNumber),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '公积金账号', key: 'fundAccount', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundAccount),
              ]);
            }
          },
          {title: '证件号码', key: 'IdNumber', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.IdNumber),
              ]);
            }
          },
          {title: '缴费月份', key: 'payMonth', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.payMonth),
              ]);
            }
          },
          {title: '实际月份', key: 'actMonth', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.actMonth),
              ]);
            }
          },
          {title: '缴费类型', key: 'payType', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.payType),
              ]);
            }
          },
          {title: '公积金基数', key: 'fundBase', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundBase),
              ]);
            }
          },
          {title: '公积金比例', key: 'fundPercent', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundPercent),
              ]);
            }
          },
          {title: '公积金金额', key: 'fundPrice', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundPrice),
              ]);
            }
          },
          {title: '公司编号', key: 'companyNumber', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.fundPrice),
              ]);
            }
          },
          {title: '公司全称', key: 'companyName', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyName),
              ]);
            }
          },
          {title: '公司公积金账号', key: 'companyFundAccount', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.companyFundAccount),
              ]);
            }
          },
        ]
      }
    },
    mounted() {
      this[EventType.CUSTOMERSEARCH]()
    },
    computed: {
      ...mapState('customerSearch',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('customerSearch',[EventType.CUSTOMERSEARCH]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
    }
  }
</script>
