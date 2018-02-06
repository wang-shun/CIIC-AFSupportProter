<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
         月缴费通知
        <div slot="content">
          <!-- <Form :label-width=200>
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
            </Form> -->
            <Row>
              <Col :sm="{span: 24}"  style="padding-bottom:10px">
                <Button type="primary" @click="calculate">重新汇总</Button>
                <Button type="warning" @click="goBack" >返回</Button>
              </Col>
            </Row>
            <Table  border :columns="noticeInfo.noticeColumns" :data="noticeInfo.noticeData" :loading="loading"></Table>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
  import api from '../../../api/social_security/social_security_report'
  export default {
    data() {
      return{
        ssMonth:this.$route.query.ssMonth,
         ssAccount:this.$route.query.ssAccount,
         comAccountId:this.$route.query.ssAccountId,
        collapseInfo: [1], //展开栏
        loading:true,
        noticeInfo: {
          noticeColumns: [
            {title: '雇员编号', key: 'employeeId', align: 'center', className: 'mw240',width: 120,fixed: 'left',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.employeeId),
                ]);
              }
            },
            {title: '雇员姓名', key: 'employeeName', align: 'center', className: 'mw200', width: 120,fixed: 'left',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.employeeName),
                ]);
              }
            },
            {title: '社保序号', key: 'ssSerial', align: 'center', className: 'mw100', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.ssSerial),
                ]);
              }
            },
            {title: '公司编号', key: 'companyId', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.companyId),
                ]);
              }
            },
            {title: '企业社保账户类型', key: 'ssAccountType', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', this.$decode.accountType(params.row.ssAccountType)),
                ]);
              }
            },
            // {title: '人员性质', key: 'empClassify', align: 'center', className: 'mw200', width: 120,
            //   render: (h, params) => {
            //     return h('div', {style: {textAlign: 'center'}}, [
            //       h('span', this.$decode.empClassify(params.row.empClassify)),
            //     ]);
            //   }
            // },
            {title: '社保缴纳月份', key: 'ssMonth', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.ssMonth),
                ]);
              }
            },
            {title: '所属社保月份', key: 'ssMonthBelong', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.ssMonthBelong),
                ]);
              }
            },
            {title: '社保基数', key: 'baseAmount', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.baseAmount),
                ]);
              }
            },
            {title: '养老公司缴费', key: 'pensionComFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.pensionComFee),
                ]);
              }
            },
            {title: '养老个人缴费', key: 'pensionEmpFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.pensionEmpFee),
                ]);
              }
            },
            {title: '养老总计', key: 'pensionTotalFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.pensionTotalFee),
                ]);
              }
            },
            {title: '医疗公司缴费', key: 'medicalComFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.medicalComFee),
                ]);
              }
            },
            {title: '医疗个人缴费', key: 'medicalEmpFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.medicalEmpFee),
                ]);
              }
            },
            {title: '医疗总计', key: 'medicalTotalFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.medicalTotalFee),
                ]);
              }
            },
            {title: '失业公司缴费', key: 'unemploymentComFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.unemploymentComFee),
                ]);
              }
            },
            {title: '失业个人缴费', key: 'unemploymentEmpFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.unemploymentEmpFee),
                ]);
              }
            },
            {title: '失业总计', key: 'unemploymentTotalFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.unemploymentTotalFee),
                ]);
              }
            },
            {title: '工伤公司缴费', key: 'injuryOnJobComFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.injuryOnJobComFee),
                ]);
              }
            },
            {title: '工伤个人缴费', key: 'injuryOnJobEmpFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.injuryOnJobEmpFee),
                ]);
              }
            },
            {title: '工伤总计', key: 'injuryOnJobTotalFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.injuryOnJobTotalFee),
                ]);
              }
            },
            {title: '生育公司缴费', key: 'birthRiskComFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.birthRiskComFee),
                ]);
              }
            },
            {title: '生育个人缴费', key: 'birthRiskEmpFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.birthRiskEmpFee),
                ]);
              }
            },
            {title: '生育总计', key: 'birthRiskTotalFee', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.birthRiskTotalFee),
                ]);
              }
            },
            {title: '社保费总计', key: 'fertilityInsurance', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', 0),
                ]);
              }
            },
            {title: '总计费用', key: 'totalAmount', align: 'center', className: 'mw200', width: 120,
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.totalAmount),
                ]);
              }
            },
          ],
          noticeData:[]
        }
      }
    },
    mounted() {
      let params = {ssMonth:this.ssMonth,ssAccount:this.ssAccount}
      api.queryEmlpyeeMonthFeeDetail(params).then(data=>{
          if(data.code==500){
            this.loading=false;
            this.$Message.error(data.message);
          }else{
            if(null!=data.data){
               this.noticeInfo.noticeData=data.data;
            }
            this.loading=false;
          }
      }).catch(error=>{
        this.loading=false;
      })
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
      calculate(){
        let params = {
          comAccountId:this.comAccountId,  
          ssMonth:this.ssMonth
        };
        api.summaryCalculate(params).then(data=>{
            console.log(data.code);
            if(data.code==1){
              this.$Message.error(data.message);
            }
        }).catch(error=>{
          this.$Message.error('系统异常！');
        })
      }
    }
  }
</script>
