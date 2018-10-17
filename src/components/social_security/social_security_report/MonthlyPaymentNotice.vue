<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
         月缴费通知
        <div slot="content">
          <Form :label-width=200>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="社保年月：">
                  <label>{{ssMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="企业社保账户名称：">
                  <label>{{accountName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="企业社保账号：">
                  <label>{{account}}</label>
                </Form-item>
              </Col>
             <Col :sm="{span:22}" :md="{span: 16}" :lg="{span: 12}">
                <Form-item label="客户编号：">
                  <label>{{companyId}}</label>
                </Form-item>
              </Col>
            </Row>
            <Table border :columns="noticeInfo.noticeColumns" :data="noticeData" ></Table>
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
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" @click="calculate" >重新汇总</Button>
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
  import api from '../../../api/social_security/social_security_report';
  import tools from "../../../lib/tools";

  export default {
    data() {
      return{
        ssMonth:this.$route.query.ssMonth,
        comAccountId:this.$route.query.ssAccountId,
        accountName:'',
        account:'',
        companyId:'',
        lowerTotalAmount:'',
        capitalTotalAmount:'',
        //recentlyCalculatedPerson:'张三',//最近计算人
        collapseInfo: [1], //展开栏
        noticeData:[],
        noticeInfo: {
          noticeColumns: [
            {title: '序号', key: 'seq', align: 'center', width: 60, className: 'mw100',
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
        }
      }
    },
    mounted() {
      this.getAccountCompanay();
      this.paymentDetailQuery();
    },
    computed: {
    },
    methods: {
      goBack() {
        this.$router.push({name: 'socialSecurityReport'})
      },
      ok () {

      },
      cancel () {

      },
      paymentDetailQuery(){
        api.getPaymentDetail({
         // comAccountId: this.comAccountId,
          ssAccount:this.$route.query.ssAccount,
          paymentMonth: this.ssMonth,
          companyId:this.$route.query.companyId,
        }).then(data => {
          this.noticeData = data.data;
          let response = data.data;
          if(response != null){
            let obj = response.filter(x=>x.paymentItemName == '缴纳合计（1+2+3+4+5+6-8）')[0];
            if(obj != null){
              let amount = parseFloat(obj.baseMedicalAmount) + parseFloat(obj.addMedicalAmount) + parseFloat(obj.unemploymentAmount) + parseFloat(obj.maternityAmount) + parseFloat(obj.basePensionAmount) + parseFloat(obj.accidentAmount);
              if(isNaN(amount)) {
                amount=0;
              }
              this.lowerTotalAmount = amount.toFixed(2)
              this.lowerTotalAmount = this.lowerTotalAmount*1;

              if(this.lowerTotalAmount != null){
                this.capitalTotalAmount = tools.dx(this.lowerTotalAmount);
                if(this.capitalTotalAmount=='分'){
                  this.capitalTotalAmount='';
                }
              }
            }
          }
        })
      },

      getAccountCompanay(){
        api.getAccountById({
          //comAccountId: this.comAccountId,
          companyId:this.$route.query.companyId,
          ssAccount:this.$route.query.ssAccount,
        }).then(data=>{
          this.accountName = data.data.comAccountName;
          this.account = data.data.ssAccount;
          this.companyId =data.data.companyId;
        })
      },

      calculate(){
        let params = {
          comAccountId:this.comAccountId,
          ssMonth:this.ssMonth,
          generalMethod:'generatePaymentDetailReport'
        };
        api.summaryCalculate(params).then(data=>{
            console.log(data.code);
            if(data.code==1){
              this.$Message.error(data.message);
              this.paymentDetailQuery();
            }
        }).catch(error=>{
          this.$Message.error('系统异常！');
        })
         
      }
    }
  }
</script>
