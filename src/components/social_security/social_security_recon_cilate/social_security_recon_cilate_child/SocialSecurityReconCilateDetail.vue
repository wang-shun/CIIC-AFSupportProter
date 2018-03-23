<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        对账差异
        <div slot="content">
            <!-- <Form :label-width=150 ref="pagParam" :model="pagParam">
              <Form-item label="" >
                <Input v-model="pagParam.statementId" disabled></Input>
              </Form-item>
            </Form> -->
            <Form :label-width=150 ref="statementData" :model="statementData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="社保月份：" prop="ssMonth">
                  <label>{{statementData.ssMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业社保账户名称：" prop="comAccountName">
                  <label >{{statementData.comAccountName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="差异总数(按雇员)：" prop="diffSumByEmp">
                  <label>{{statementData.diffSumByEmp}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="差异总数(含项目)：" prop="diffSumByItem">
                  <label >{{statementData.diffSumByItem}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Table
        :columns="statementResultColumns"
        :data="statementResultData">
    </Table>

    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Button type="info" @click="ok">导出</Button>
        <Button type="info" @click="calculate()">差异对比</Button>
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
  import api from '../../../../api/social_security/statement_detail'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        collapseInfo: [1], //展开栏
        statementData: {
          ssMonth:'',//社保月份
          comAccountName: '', //社保账户类型
          diffSumByEmp:'',
          diffSumByItem:'',
        },
        statementId :'',
        statementResultData: [],
        statementResultColumns: [

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
          {title: '险种', key: 'ssTypeName',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.ssTypeName),
              ]);
            }
          },
          {title: '项目', key: 'projectTypeName',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.projectTypeName),
              ]);

            }
          },
          {title: '导入金额', key: 'impAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.impAmount),
              ]);
            }
          },
          {title: '系统金额', key: 'ssAmount',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.ssAmount),
              ]);
            }
          },
          {title: '差异', key: 'diffAmount', align: 'center',
            render: (h, params) => {
              let diffHeadcount = params.row.diffHeadcount;
              let diffAmount = params.row.diffAmount;
              let diffShow = '';
              if(diffHeadcount == 1){
                diffShow = '系统不存在'
              }else if(diffHeadcount == 2){
                diffShow = '导入不存在'
              }else{
                diffShow = diffAmount
              }
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', diffShow),
              ]);
            }
          }
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
      //       statementId : window.sessionStorage.getItem("statementId")
      //     };
      //this.pagParam.statementId = window.sessionStorage.getItem("statementId");
      //this.doAlert(pagParam.statementId);
      this.serachStatementData(window.sessionStorage.getItem("statementId"));
      this.serachStatementResultData(window.sessionStorage.getItem("statementId"));
      this.statementId = window.sessionStorage.getItem("statementId");
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

      },
      cancel () {

      },
      goBack(){
        history.go(-1);
      },
      doAlert(value) {
        alert(value);
      },
      serachStatementData(statementId){
        api.serachStatementData({
          statementId: statementId
        }).then(data => {
          this.statementData = data.data;
        })
      },
      serachStatementResultData(statementId){
        api.serachStatementResultData({
          statementId: statementId
        }).then(data => {
          this.statementResultData = data.data;
        })
      },
      calculate(){
        //alert(this.statementId);
        api.calculate({
          statementId: this.statementId
        }).then(data => {
          this.serachStatementData(this.statementId);
          this.serachStatementResultData(this.statementId);

        })
      },
    }
  }
</script>
