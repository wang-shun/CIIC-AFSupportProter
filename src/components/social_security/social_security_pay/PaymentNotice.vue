<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        社保支付
        <div slot="content">
          <Form :label-width=200>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公司名称：">
                  <label>{{paymentComData.comAccountName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：">
                  <label>{{paymentComData.comAccountId}}</label>
                </Form-item>
              </Col>
            </Row>
            
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Table 
        :columns="noticeColumns" 
        :data="noticeData">
    </Table>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/EventTypes'
  import api from '../../../api/social_security/payment_notice'

  export default {
    data() {
      return{
        collapseInfo: [1], //展开栏
        noticeColumns: [
          {title: '项目', key: 'paymentItem', align: 'center', width: 240, className: 'mw240',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.paymentItemName),
              ]);
            }
          },
          {title: '基本养老保险', key: 'basePensionAmount', align: 'center', className: 'mw200',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.basePensionAmount),
              ]);
            }
          },
          {title: '基本医疗保险', key: 'baseMedicalAmount', align: 'center', className: 'mw200',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.baseMedicalAmount),
              ]);
            }
          },
          {title: '地方附加医疗保险', key: 'addMedicalAmount', align: 'center', className: 'mw200',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.addMedicalAmount),
              ]);
            }
          },
          {title: '失业保险', key: 'unemploymentAmount', align: 'center', className: 'mw200',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.unemploymentAmount),
              ]);
            }
          },
          {title: '工伤保险', key: 'accidentAmount', align: 'center', className: 'mw200',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.accidentAmount),
              ]);
            }
          },
          {title: '生育保险', key: 'maternityAmount', align: 'center', className: 'mw200',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.maternityAmount),
              ]);
            }
          },
        ],
        noticeData:[],
        
        paymentComData: {
          comAccountName: '',
          comAccountId: '',
          oughtAmount: '',
          companyName: '',
          changeAmount: '',
          totalPayAmount: '',
          totalPayAmountUP: '',
          remark: '',
        },
      }
    },
    mounted() {
      this[EventType.PAYMENTNOTICETYPE]();
      let paymentComId = window.sessionStorage.getItem("paymentnotice_paymentComId");
      let comAccountId = window.sessionStorage.getItem("paymentnotice_comAccountId");
      let paymentMonth = window.sessionStorage.getItem("paymentnotice_paymentMonth");
      this.getPaymentComDtoByPaymentId(paymentComId);
      this.statementResultQuery(comAccountId,paymentMonth);
    },
    computed: {
      ...mapState('paymentNotice', {
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('paymentNotice', [EventType.PAYMENTNOTICETYPE]),
      goBack() {
        this.$router.push({name: 'socialSecurityPay'})
      },
      ok () {

      },
      cancel () {

      },
      getPaymentComDtoByPaymentId(paymentComId){
        api.getPaymentComDtoByPaymentId({
          paymentComId: paymentComId
        }).then(data => {
          this.paymentComData = data.data;
        })
      },
      statementResultQuery(comAccountId,paymentMonth){
        api.statementResultQuery({
          comAccountId: comAccountId,
          paymentMonth: paymentMonth
        }).then(data => {
          this.noticeData = data.data;
        })
      },
    }
  }
</script>
