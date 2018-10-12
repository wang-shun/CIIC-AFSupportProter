<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        月缴费通知
        <div slot="content">
          <Form :label-width=200>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户名称：">
                  <label>{{paymentComData.comAccountName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账号：">
                  <label>{{paymentComData.ssAccount}}</label>
                </Form-item>
              </Col>
            </Row>

          </Form>
        </div>
      </Panel>
    </Collapse>
 
      <div slot="content">
          <Form :label-width=200>
      <Table :columns="noticeColumns" :data="noticeData"></Table>

    <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="应缴纳合计（小写）：">
                  <label>{{lowerTotalAmount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="应缴纳合计（大写）：">
                  <label>{{capitalTotalAmount}}</label>
                </Form-item>
              </Col>

            </Row>
    <Button type="primary" @click="calculate" v-show="this.ifShowSumButton">重新汇总</Button>
    <Button type="warning" @click="goBack">返回</Button>


          </Form>
        </div>
   
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../assets/api/storage'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
  import api from '../../../api/social_security/payment_notice'
  import tools from "../../../lib/tools";
  export default {
    data() {
      return{
        collapseInfo: [1], //展开栏
        noticeColumns: [
          {title: '序号', key: 'seq', align: 'center', width: 60, className: 'mw240',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.seq),
              ]);
            }
          },
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
        comAccountId :'',
        paymentMonth :'',
        lowerTotalAmount:'',
        capitalTotalAmount:'',
        paymentComData: {
          comAccountName: '',
          comAccountId: '',
          ssAccount:'',
          oughtAmount: '',
          companyName: '',
          changeAmount: '',
          totalPayAmount: '',
          totalPayAmountUP: '',
          remark: '',
        },
        ifShowSumButton:false,
      }
    },
    mounted() {
      //this[EventType.PAYMENTNOTICETYPE]();
      let paymentComId = sessionStorage.getItem("paymentnotice_paymentComId");
      this.comAccountId = sessionStorage.getItem("paymentnotice_comAccountId");
      this.paymentMonth = sessionStorage.getItem("paymentnotice_paymentMonth");
      let paymentState = sessionStorage.getItem("paymentnotice_paymentState");
      this.ssAccount = sessionStorage.getItem("paymentnotice_ssAccount");
     
      if(paymentState == "1" || paymentState == "3" || paymentState == "5" || paymentState == "7"){ //1 未到账 2 可付  3 内部批退 7 财务批退
      //if(paymentState != "3" && paymentState != "5" && paymentState != "7"){
          this.ifShowSumButton= true;
      }
      this.getPaymentComDtoByPaymentId(paymentComId);
      this.statementResultQuery(this.ssAccount,this.paymentMonth);
    },
    computed: {
      ...mapState('paymentNotice', {
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('paymentNotice', [EventType.PAYMENTNOTICETYPE]),
      goBack() {
        //this.$router.push({name: 'socialSecurityPay'})
        this.$router.go(-1);
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
      statementResultQuery(ssAccount,paymentMonth){
        api.statementResultQuery({
          ssAccount: ssAccount,
          paymentMonth: paymentMonth
        }).then(data => {
          this.noticeData = data.data;
          let response = data.data;
          if(response != null){
            let obj = response.filter(x=>x.paymentItemName == '缴纳合计（1+2+3+4+5+6-8）')[0];
            if(obj != null){
              let amount = parseFloat(obj.baseMedicalAmount) + parseFloat(obj.addMedicalAmount) + parseFloat(obj.unemploymentAmount) + parseFloat(obj.maternityAmount) + parseFloat(obj.basePensionAmount) + parseFloat(obj.accidentAmount);
              this.lowerTotalAmount = amount.toFixed(2)
              this.lowerTotalAmount = this.lowerTotalAmount*1;
              if(this.lowerTotalAmount != null){
                this.capitalTotalAmount = tools.dx(this.lowerTotalAmount);
              }
            }
          }
        })
      },
      calculate(){
        let params = {
          comAccountId:this.comAccountId,
          ssMonth:this.paymentMonth,
          generalMethod:'generatePaymentDetailReport'
        };
        api.summaryCalculate(params).then(data=>{
            if(data.code==1){
              this.$Message.error(data.message);
            }
        }).catch(error=>{
          this.$Message.error('系统异常！');
        });

      let paymentComId = sessionStorage.getItem("paymentnotice_paymentComId");
      this.comAccountId = sessionStorage.getItem("paymentnotice_comAccountId");
      this.paymentMonth = sessionStorage.getItem("paymentnotice_paymentMonth");
      this.getPaymentComDtoByPaymentId(paymentComId);
      this.statementResultQuery(this.ssAccount,this.paymentMonth);
      }
    }
  }
</script>
