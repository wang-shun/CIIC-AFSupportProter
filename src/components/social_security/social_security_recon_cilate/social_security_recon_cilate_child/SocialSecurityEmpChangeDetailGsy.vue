<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        城镇社会保险变更总汇明细(工保、生保)
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
                <Form-item label="企业社保账号：" prop="comAccountName">
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
        <Button type="info" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../../assets/api/storage'
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
          {title: '工伤单位缴费额', key: 'comAmountAccident',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountAccident),
              ]);
            }
          },
          {title: '工伤单位补缴', key: 'comCompensatedAmountAccident', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountAccident),
              ]);
            }
          },
          {title: '生育单位缴费额', key: 'comAmountMaternity',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comAmountMaternity),
              ]);
            }
          },
          {title: '生育单位补缴', key: 'comCompensatedAmountMaternity', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.comCompensatedAmountMaternity),
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
      this[EventType.SOCIALSECURITYRECONCILATEDETAIL]();
      // var pagParam= {
      //       //对账主表ID
      //       statementId : sessionStorage.getItem("statementId")
      //     };
      //this.pagParam.statementId = sessionStorage.getItem("statementId");
      //this.doAlert(pagParam.statementId);
      this.statementId = sessionStorage.getItem("monthEmpChangeId");
      this.serachMonthEmpChange(sessionStorage.getItem("monthEmpChangeId"));
      this.showMonthEmpChangeDetail(sessionStorage.getItem("monthEmpChangeId"));

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
        api.gsyExport({
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
          this.empChangeDetailData = data.data;
        })
      },
    }
  }
</script>
