<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        城镇社会保险变更总汇明细(养保、医保、失保)
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
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业社保账户：" prop="comAccountName">
                  <label >{{empChangeData.comAccountName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="最近计算人：" prop="computeUserId">
                  <label>{{empChangeData.computeUserId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="最近计算时间：" prop="lastComputeTime">
                  <label >{{empChangeData.lastComputeTime}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Table
        :columns="empChangeDetailDataColumns"
        :data="empChangeDetailData">
    </Table>

    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Button type="info" @click="ok">导出</Button>
        <Button type="primary" @click="calculate" >重新汇总</Button>
        <Button type="info" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import companyAccountSearchModal from '../../../common_control/CompanyAccountSearchModal.vue'
  import EventType from '../../../../store/event_types'
  import api from '../../../../api/social_security/month_emp_change'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        collapseInfo: [1], //展开栏
        empChangeData: {
          ssMonth:'',//社保月份
          comAccountId:'',
          comAccountName: '', //社保账户类型
          computeUserId:'',
          lastComputeTime:'',
        },
        statementId:0,
        empChangeDetailData: [],
        empChangeDetailDataColumns: [

          {title: '雇员编号', key: 'employeeId',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeId),

              ]);
            }
          },
          {title: '姓名', key: 'employeeName',  align: 'center',
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '变更类型', key: 'changeTypeName', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.changeTypeName),
              ]);
            }
          },
          {title: '个人月缴纳基数', key: 'baseAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.baseAmount),
              ]);
            }
          },
          {title: '养老单位缴费额', key: 'comAmountPension',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountPension),
              ]);
            }
          },
          {title: '养老个人缴费额', key: 'empAmountPension',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empAmountPension),
              ]);

            }
          },
          {title: '养老单位补缴', key: 'comCompensatedAmountPension', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountPension),
              ]);
            }
          },
          {title: '养老个人补缴', key: 'empCompensatedAmountPension',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empCompensatedAmountPension),
              ]);
            }
          },
          {title: '养老一次性支付', key: 'onePaymentPension', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.onePaymentPension),
              ]);
            }
          },
          {title: '医疗单位缴费额', key: 'comAmountMedical',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountMedical),
              ]);
            }
          },
          {title: '医疗个人缴费额', key: 'empAmountMedical',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empAmountMedical),
              ]);

            }
          },
          {title: '医疗单位补缴', key: 'comCompensatedAmountMedical', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountMedical),
              ]);
            }
          },
          {title: '医疗个人补缴', key: 'empCompensatedAmountMedical',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empCompensatedAmountMedical),
              ]);
            }
          },
          {title: '失业单位缴费额', key: 'comAmountUnemployment',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountUnemployment),
              ]);
            }
          },
          {title: '失业个人缴费额', key: 'empAmountUnemployment',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empAmountUnemployment),
              ]);

            }
          },
          {title: '失业单位补缴', key: 'comCompensatedAmountUnemployment', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountUnemployment),
              ]);
            }
          },
          {title: '失业个人补缴', key: 'empCompensatedAmountUnemployment',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.empCompensatedAmountUnemployment),
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
     // this[EventType.SOCIALSECURITYRECONCILATEDETAIL]();
      // var pagParam= {
      //       //对账主表ID
      //       statementId : window.sessionStorage.getItem("statementId")
      //     };
      //this.pagParam.statementId = window.sessionStorage.getItem("statementId");
      //this.doAlert(pagParam.statementId);
      this.statementId = window.sessionStorage.getItem("monthEmpChangeId");
      this.serachMonthEmpChange(window.sessionStorage.getItem("monthEmpChangeId"));
      this.showMonthEmpChangeDetail(window.sessionStorage.getItem("monthEmpChangeId"));

    },
    computed: {
      ...mapState('socialSecurityReconcilateDetail',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('socialSecurityReconcilateDetail',[EventType.SOCIALSECURITYRECONCILATEDETAIL]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {
        api.yysExport({
          statementId: this.statementId,
          monthEmpChangeId: this.statementId
        });
      },
      cancel () {

      },
      goBack(){
        history.go(-1);
      },
      doAlert(value) {
        alert(value);
      },
      serachMonthEmpChange(statementId){
        api.serachMonthEmpChange({
          monthEmpChangeId: statementId
        }).then(data => {
          this.empChangeData = data.data;
        })
      },
      showMonthEmpChangeDetail(statementId){
        api.showMonthEmpChangeDetail({
          monthEmpChangeId: statementId
        }).then(data => {
          //console.log(data)
          this.empChangeDetailData = data.data;
        })
      },
      calculate(){
        let params = {
          comAccountId:this.empChangeData.comAccountId,
          ssMonth:this.empChangeData.ssMonth,
          generalMethod:'generateMonthEmpChangeReport'
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
