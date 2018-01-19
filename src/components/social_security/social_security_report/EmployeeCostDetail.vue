<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
         月缴费通知
        <div slot="content">
          <Form :label-width=200>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="最近计算人：">
                  <label>{{data.recentlyCalculatedPerson}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="社保年月：">
                  <label>{{data.reportYearAndMonth}}</label>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="公司名称：">
                  <label>{{data.companyName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="企业社保账户：">
                  <label>{{data.companySocialSecurityAccount}}</label>
                </Form-item>
              </Col>
            </Row>
            <Table border :columns="noticeInfo.noticeColumns" :data="data.noticeData"></Table>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="应缴纳合计（小写）：">
                  <label>{{data.shouldPayAmount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="应缴纳合计（大写）：">
                  <label>{{data.shouldPayAmountCapital}}</label>
                </Form-item>
              </Col>

            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="" >重新汇总</Button>
                <Button type="warning" @click="goBack" >返回</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  export default {
    data() {
      return{
        recentlyCalculatedPerson:'张三',//最近计算人
        reportYearAndMonth:'201701',//社保年月
        collapseInfo: [1], //展开栏
        noticeInfo: {
          noticeColumns: [
            {title: '序号', key: 'index', align: 'center', width: 100, className: 'mw100',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.index),
                ]);
              }
            },
            {title: '项目', key: 'project', align: 'center', width: 240, className: 'mw240',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.project),
                ]);
              }
            },
            {title: '基本养老保险', key: 'basePensionInsurance', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.basePensionInsurance),
                ]);
              }
            },
            {title: '基本医疗保险', key: 'baseMedicalInsurance', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.baseMedicalInsurance),
                ]);
              }
            },
            {title: '地方附加医疗保险', key: 'areaAddMedicalInsurance', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.areaAddMedicalInsurance),
                ]);
              }
            },
            {title: '失业保险', key: 'unemploymentInsurance', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.unemploymentInsurance),
                ]);
              }
            },
            {title: '工伤保险', key: 'injuryInsurance', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.injuryInsurance),
                ]);
              }
            },
            {title: '生育保险', key: 'fertilityInsurance', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'right'}}, [
                  h('span', params.row.fertilityInsurance),
                ]);
              }
            },
          ],
        }
      }
    },
    mounted() {
      this[EventType.MONTHLYPAYMENTNOTICE]()
    },
    computed: {
      ...mapState('socialsecurityreport', {
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('socialsecurityreport', [EventType.MONTHLYPAYMENTNOTICE]),
      goBack() {
        this.$router.push({name: 'socialsecuritypay'})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
