<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        城镇社会保险变更总汇明细
        <div slot="content">
            <!-- <Form :label-width=150 ref="pagParam" :model="pagParam">
              <Form-item label="" >
                <Input v-model="pagParam.statementId" disabled></Input>
              </Form-item>
            </Form> -->
            <Form :label-width=150 ref="empChangeData" :model="empChangeData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="社保月份：" prop="ssMonth">
                  <label>{{empChangeData.ssMonth}}</label>
                </Form-item>
              </Col>
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">-->
                <!--<Form-item label="企业社保账户：" prop="comAccountName">-->
                  <!--<label >{{empChangeData.comAccountName}}</label>-->
                <!--</Form-item>-->
              <!--</Col>-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">-->
                <!--<Form-item label="企业社保账号：" prop="ssAccount">-->
                  <!--<label>{{empChangeData.ssAccount}}</label>-->
                <!--</Form-item>-->
              <!--</Col>-->
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">-->
                <!--<Form-item label="客户编号：" prop="companyIds">-->
                  <!--<label >{{empChangeData.companyIds}}</label>-->
                <!--</Form-item>-->
              <!--</Col>-->
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="最近计算人：" prop="computeUserId">
                  <label>{{empChangeData.computeUserId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="最近计算时间：" prop="lastComputeTime">
                  <label >{{empChangeData.lastComputeTime}}</label>
                </Form-item>
              </Col> -->
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Table
        :columns="empChangeDetailDataColumns"
        :data="empChangeDetailData" height=500>
    </Table>

    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Button type="info" @click="ok">导出</Button>
        <!--<Button type="primary" :loading="isLoading" @click="calculate" >重新汇总</Button>-->
        <Button type="info" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../../assets/api/storage'
//  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import companyAccountSearchModal from '../../../common_control/CompanyAccountSearchModal.vue'
//  import EventType from '../../../../store/event_types'
  import api from '../../../../api/social_security/month_emp_change'
  import reportApi from '../../../../api/social_security/social_security_report'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        isLoading: false,
        collapseInfo: [1], //展开栏
        empChangeData: {
          ssMonth:'',//社保月份
          comAccountId:'',
          comAccountName: '', //社保账户类型
          computeUserId:'',
          lastComputeTime:'',
          companyIds:'',
          ssAccount:'',
          companyId:''
        },
        monthEmpChangeId:0,
        empChangeDetailData: [],
        empChangeDetailDataColumns: [

          {title: '企业社保账户', key: 'comAccountName',  align: 'center',fixed: "left",width:200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
          {title: '社保登记码', key: 'ssAccount',  align: 'center',fixed: "left",width:120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.ssAccount),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId',  align: 'center',fixed: "left",width:120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '社保序号', key: 'ssSerial',  align: 'center',fixed: "left",width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.ssSerial),
              ]);
            }
          },
          {title: '雇员编号', key: 'employeeId',  align: 'center',fixed: "left",width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '姓名', key: 'employeeName',  align: 'center',fixed: "left",width:100,
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '身份证号', key: 'idNum',  align: 'center',width:100,
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '结算区县', key: 'settlementArea',  align: 'center',width:100,
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.settlementArea),
              ]);
            }
          },
          {title: '人员属性', key: 'empClassify',  align: 'center',width:100,
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empClassify),
              ]);
            }
          },


          {title: '变更类型', key: 'changeTypeName', align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.changeTypeName),
              ]);
            }
          },
          {title: '个人月缴纳基数', key: 'baseAmount', align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.baseAmount),
              ]);
            }
          },
          {title: '养老单位缴费额', key: 'comAmountPension',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountPension),
              ]);
            }
          },
          {title: '养老个人缴费额', key: 'empAmountPension',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empAmountPension),
              ]);

            }
          },
          {title: '养老单位补缴', key: 'comCompensatedAmountPension', align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountPension),
              ]);
            }
          },
          {title: '养老个人补缴', key: 'empCompensatedAmountPension',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empCompensatedAmountPension),
              ]);
            }
          },
          {title: '养老一次性支付', key: 'onePaymentPension', align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.onePaymentPension),
              ]);
            }
          },
          {title: '医疗单位缴费额', key: 'comAmountMedical',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountMedical),
              ]);
            }
          },
          {title: '医疗个人缴费额', key: 'empAmountMedical',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empAmountMedical),
              ]);

            }
          },
          {title: '医疗单位补缴', key: 'comCompensatedAmountMedical', align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountMedical),
              ]);
            }
          },
          {title: '医疗个人补缴', key: 'empCompensatedAmountMedical',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empCompensatedAmountMedical),
              ]);
            }
          },
          {title: '失业单位缴费额', key: 'comAmountUnemployment',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountUnemployment),
              ]);
            }
          },
          {title: '失业个人缴费额', key: 'empAmountUnemployment',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empAmountUnemployment),
              ]);

            }
          },
          {title: '失业单位补缴', key: 'comCompensatedAmountUnemployment', align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountUnemployment),
              ]);
            }
          },
          {title: '失业个人补缴', key: 'empCompensatedAmountUnemployment',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empCompensatedAmountUnemployment),
              ]);
            }
          },

          {title: '工伤单位缴费额', key: 'gsComAmount',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.gsComAmount),
              ]);
            }
          },
          {title: '工伤单位补缴', key: 'gsComRepayAmount',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.gsComRepayAmount),
              ]);
            }
          },
          {title: '生育单位缴费额', key: 'syComAmount',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.syComAmount),
              ]);
            }
          },
          {title: '生育单位补缴', key: 'syComRepayAmount',  align: 'center',width:100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.syComRepayAmount),
              ]);
            }
          },
          
        ],
        // pagParam: {
        //   //对账主表ID
        //   statementId : ''
        // }
      }
    },
    mounted() {
    //当前页面来自两个入口，一个来自社保对账，另一个来自社保报表，传递进来的参数不一样
      let ssMonth = this.$route.query.ssMonth;
//      let comAccountId = this.$route.query.ssAccountId;
      let ssAccount = this.$route.query.ssAccount;
      let companyId = this.$route.query.companyId;
      let ssAccountType = this.$route.query.ssAccountType;
      let monthEmpChangeId = '';
      let params={};

      this.empChangeData.ssMonth = this.$route.query.ssMonth;
//      this.empChangeData.comAccountId = this.$route.query.ssAccountId;
//      this.empChangeData.ssAccount = this.$route.query.ssAccount;

//      reportApi.getAccountRelationByAccountId({
//        comAccountId : comAccountId
//      }).then(
//        data => {
//          if (data.code === 200) {
//            if (data.data) {
//              this.empChangeData.comAccountName = data.data.comAccountName;
//              this.empChangeData.companyIds = data.data.companyIds;
//            }
//          } else {
//            this.$Message.error(data.message);
//          }
//        }
//      )

      if(ssMonth != null){
        params={
          ssMonth : ssMonth,
//          comAccountId : comAccountId,
          ssAccount: ssAccount,
          ssAccountType : ssAccountType,
          companyId : companyId
        }
        api.queryYysReport(params).then(
          data=>{
            if (data.code === 200) {
              this.empChangeDetailData = data.data;
            } else {
              this.$Message.error(data.message);
            }
          }
        )
//        api.getSsMonthEmpChangeId(params).then(
//          data=>{
//            monthEmpChangeId = data.data;
//            this.monthEmpChangeId = monthEmpChangeId;
//            if(monthEmpChangeId == null || monthEmpChangeId == ''){
//              monthEmpChangeId = this.$route.query.monthEmpChangeId;
//            }
//            if(monthEmpChangeId == null || monthEmpChangeId == ''){
//                this.empChangeData.ssMonth = this.$route.query.ssMonth;
//                this.empChangeData.comAccountId = this.$route.query.ssAccountId;
//                this.empChangeData.comAccountName = this.$route.query.ssAccount;
//            }
//             this.serachMonthEmpChange(monthEmpChangeId);
//             this.showMonthEmpChangeDetail(monthEmpChangeId);
//          }
//        )
//      }else{
//         monthEmpChangeId = this.$route.query.monthEmpChangeId;
//         this.serachMonthEmpChange(monthEmpChangeId);
//         this.showMonthEmpChangeDetail(monthEmpChangeId);
      }

    },
    computed: {
//      ...mapState('socialSecurityReconcilateDetail',{
//          data:state => state.data
//      })
    },
    methods: {
      //...mapActions('socialSecurityReconcilateDetail',[EventType.SOCIALSECURITYRECONCILATEDETAIL]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {
        let ssMonth = this.$route.query.ssMonth;
        let ssAccount = this.$route.query.ssAccount;
        let companyId = this.$route.query.companyId;
        let ssAccountType = this.$route.query.ssAccountType;
        let params={
          ssMonth : ssMonth,
          ssAccount: ssAccount,
          ssAccountType : ssAccountType,
          companyId : companyId
        }
        api.yysExport({
          pageSize: 999999,
          pageNum: 0,
          params: params,
        });
      },
      cancel () {

      },
      goBack(){
        history.go(-1);
      },
//      serachMonthEmpChange(monthEmpChangeId){
//        api.serachMonthEmpChange({
//          monthEmpChangeId: monthEmpChangeId
//        }).then(data => {
//          if(data.data != null){
//            this.empChangeData = data.data;
//          }
//        })
//      },
//      showMonthEmpChangeDetail(monthEmpChangeId){
//        api.showMonthEmpChangeDetail({
//          monthEmpChangeId: monthEmpChangeId
//        }).then(data => {
//          if(data.data != null){
//            this.empChangeDetailData = data.data;
//          }
//        })
//      },
//      calculate(){
//        this.isLoading = true;
//        let userInfo = sessionStorage.getItem('userInfo');
//        let userName='';
//        if (userInfo) {
//          userName= JSON.parse(userInfo).displayName;
//        }else{
//          this.$Message.error('获取用户信息超时，请重新登录系统。');
//          return;
//        }
//
//        let params = {
//          comAccountId:this.empChangeData.comAccountId,
//          ssMonth:this.empChangeData.ssMonth,
//          generalMethod:'generateMonthEmpChangeReport',
//          userName:userName
//        };
//        api.summaryCalculate(params).then(data=>{
//            if(data.code==1){
//              this.$Message.error(data.message);
//            }else{
//              this.$Notice.success({
//                    title: '重新汇总提示',
//                    desc: '服务器已接收您的汇总计算，请等待片刻重新刷新页面，并留意‘最后计算时间’的更新。'
//                });
//            }
//            this.isLoading = false;
//
//        }).catch(error=>{
//          this.$Message.error('系统异常！');
//        });
//
//      }
    }
  }
</script>
