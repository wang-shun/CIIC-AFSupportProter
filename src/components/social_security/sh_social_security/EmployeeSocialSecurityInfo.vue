<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        客户基本信息
        <div slot="content">
          <Form :label-width=120>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：">
                  <label>{{employeeAndCustomer.companyId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：">
                  <label>{{employeeAndCustomer.title}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：">
                  <label>{{employeeAndCustomer.customerServicer}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <Form :label-width=120>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：">
                  <label>{{employeeAndCustomer.employeeId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：">
                  <label>{{employeeAndCustomer.employeeName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号码：">
                  <label>{{employeeAndCustomer.idNum}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入职日期：">
                  <label>{{employeeAndCustomer.inDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保序号：">
                  <label>{{employeeAndCustomer.ssSerial}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="学历：">
                  <label>{{employeeAndCustomer.education}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：">
                  <label>{{employeeAndCustomer.ssAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="人员分类：">
                  <label>{{getEmpClassify(employeeAndCustomer.empClassify)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="离职日期：">
                  <label>{{employeeAndCustomer.outDate}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        社保汇缴信息
        <div slot="content">
          <Form :label-width=120>
            <Row>
              <Col :sm="{span: 20}">
                <Table width="731" border :columns="socialSecurityInfoListColumns" :data="socialSecurityInfoListData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        变动历史
        <div slot="content">
          <Form :label-width=100>
            <Row class="mt20">
              <Col :sm="{span: 20}">
                <Table width="731" border :columns="changeListColumns" :data="changeListData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../../store/event_types'
  import api from '../../../api/social_security/employee_operator'
  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3, 4], //展开栏
        customer:{

        },
        employeeAndCustomer:{
          companyId:'',
          title:'',
          customerServicer:'',
          employeeId:'',
          idNum:'',
          inDate:'',
          ssSerial:'',
          education:'',
          ssAccount:'',
          empClassify:'',
          outDate:''
        },//客户和雇员基本信息
        socialSecurityInfoListData:[],//基数变更详情
        changeListData:[],//变动历史
        socialSecurityInfoListColumns: [
          {
            title: '变更类型', key: 'remitWay', align: 'center', width: 162,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.remitWay=='1'?'正常': params.row.remitWay='2'?'补缴':''),
              ]);
            }
          },
          {
            title: '基数', key: 'baseAmount', align: 'center', width: 162,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.baseAmount),
              ]);
            }
          },
          {
            title: '起缴年月', key: 'startMonth', align: 'center', width: 203,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {
            title: '截至年月', key: 'endMonth', align: 'center', width: 203,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          }
        ],

        changeListColumns: [
          {
            title: '任务单编号', key: 'empTaskId', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('a', {
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'employeesocialsecuritytaskinfo',
                        query: {operatorType: params.row.taskCategory, sourceFrom: 'search',empTaskId:params.row.empTaskId,empArchiveId:this.$route.query.empArchiveId}
                      });
                    }
                  }
                }, params.row.empTaskId)
              ]);
            }
          },
          {
            title: '办理方式', key: 'handleWay', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.handleWay=='1'?'网上申报':params.row.handleWay=='2'?'柜面办理':''),
              ]);
            }
          },
          {
            title: '变更内容', key: 'taskCategory', align: 'center', width: 105,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.taskCategory!='9'?this.$decode.taskCategory(params.row.taskCategory):this.$decode.specialOperatorType(params.row.taskCategorySpecial)),
              ]);
            }
          },
          {
            title: '任务发起人', key: 'submitterName', align: 'center', width: 115,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.submitterName),
              ]);
            }
          },
          {
            title: '任务发起日期', key: 'submitTime', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          {
            title: '办理结果', key: 'taskStatus', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', this.$decode.empTaskStatus(params.row.taskStatus)),
              ]);
            }
          }
        ]
      }
    },
    async mounted() {
      await this[EventTypes.EMPLOYEESOCIALSECURITYINFO]()
      let params = {empArchiveId:this.$route.query.empArchiveId}

      api.employeeDetailInfoQuery(params).then(data=>{
        console.log(data)
          this.employeeAndCustomer=data.data.ssEmpArchive
          this.socialSecurityInfoListData=data.data.empBasePeriod
          this.changeListData = data.data.ssEmpTasks
      })
    },
    computed: {
      ...mapState('employeeSocialSecurityInfo', {
        data: state => state.data,
      })
    },
    methods: {
      ...mapActions('employeeSocialSecurityInfo', [EventTypes.EMPLOYEESOCIALSECURITYINFO]),
      goBack() {
        this.$router.push({name: 'employeesocialsecuritysearch'});
      },
      getEmpClassify(val){
        if(val==null || typeof(val)=='undefined')return ''
        return this.$decode.empClassify(val)
      }
    }
  }
</script>
