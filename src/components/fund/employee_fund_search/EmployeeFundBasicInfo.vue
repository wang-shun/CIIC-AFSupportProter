<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        基本信息
        <div slot="content">
         <Form :label-width='150'>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：">
                  <label>{{viewEmpArchive.employeeId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：">
                  <label>{{viewEmpArchive.employeeName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号码：">
                  <label>{{viewEmpArchive.idNum}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：">
                  <label>{{viewEmpArchive.companyId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：">
                  <label>{{viewEmpArchive.title}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="入职日期：">
                  <label>{{viewEmpArchive.inDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="个人基本公积金账号：">
                  <label>{{(viewEmpArchive.hfEmpAccount==null && this.$decode.hf_archiveTaskStatus(viewEmpArchive.archiveTaskStatus)!='')?'新开':viewEmpArchive.hfEmpAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="个人基本公积金状态：">
                  <label>{{this.$decode.hf_archiveTaskStatus(viewEmpArchive.archiveTaskStatus)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="离职日期：">
                  <label>{{viewEmpArchive.outDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="个人补充公积金账号：">
                  <label>{{(viewEmpArchive.hfEmpAccountBc==null && this.$decode.hf_archiveTaskStatus(viewEmpArchive.archiveTaskStatusBc)!='')?'新开':viewEmpArchive.hfEmpAccountBc}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="个人补充公积金状态：">
                  <label>{{this.$decode.hf_archiveTaskStatus(viewEmpArchive.archiveTaskStatusBc)}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        企业公积金账户信息
        <div slot="content">
          <Form :label-width='150'>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：">
                  <label>{{viewComAccount.companyId}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：">
                  <label>{{viewComAccount.title}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费区县：">
                  <label>{{this.$decode.hf_paymentBank(viewComAccount.paymentBank)}}</label>
                </Form-item>
              </Col>

              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服中心：">
                  <label>{{viewComAccount.serviceCenter}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客服经理：">
                  <label>{{viewComAccount.leaderShipName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户专员：">
                  <label>{{viewComAccount.serviceSpecialist}}</label>
                </Form-item>
              </Col>

              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户基本公积金账号：">
                  <label>{{viewComAccount.hfComAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户补充公积金账号：">
                  <label>{{viewComAccount.addComAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账户状态：">
                  <label>{{this.$decode.hf_state(viewComAccount.state)}}</label>
                </Form-item>
              </Col>

            <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款方式：">
                  <label>{{this.$decode.hf_paymentWay(viewComAccount.paymentWay)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金企业U盾：">
                  <label>{{this.$decode.hf_ukeyStore(viewComAccount.ukeyStore)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户类型：">
                  <label>{{ this.$decode.hf_accountType(viewComAccount.hfAccountType)}}</label>
                </Form-item>
              </Col>

              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="末次汇缴月：">
                  <label>{{viewComAccount.comHfMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="每月关账日：">
                  <label>{{viewComAccount.closeDay}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="截单年月：">
                  <label>{{viewComAccount.endMonth}}</label>
                </Form-item>
              </Col>
              
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        雇员基本公积金信息
        <div slot="content">
          <Form :label-width='150'>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="基本公积金账号：">
                  <Input v-model="viewEmpArchive.hfEmpAccount" ></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
                <Form-item label="基本公积金状态：">
                  <label>{{this.$decode.hf_archiveTaskStatus(viewEmpArchive.archiveTaskStatus)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="前道缴纳至月份：">
                  <label>{{viewEmpArchive.taskEndMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费基数：">
                  <label>{{viewEmpPeriod.baseAmount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费金额：">
                  <label>{{viewEmpPeriod.amount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费比例：">
                  <label>{{viewEmpPeriod.ratio}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入实际年月：">
                  <label>{{viewEmpArchive.startMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出实际年月：">
                  <label>{{viewEmpArchive.endMonth}}</label>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
                <!--<Table border class="mt20" :columns="columnsEmpTaskPeriod" :data="listEmpTaskPeriod"></Table>-->
                <origin-emp-task-info :companyId="this.$route.query.companyId" :employeeId="this.$route.query.employeeId" :hfType=1></origin-emp-task-info>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        雇员补充公积金信息
        <div slot="content">
           <Form :label-width='150'>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
                <Form-item label="补充公积金账号：">
                  <Input v-model="viewEmpArchive.hfEmpAccountBc"  
                  :disabled="!viewEmpArchive.empArchiveIdBc" placeholder=""></Input>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}" >
                <Form-item label="补充公积金状态：">
                  <label>{{this.$decode.hf_archiveTaskStatus(viewEmpArchive.archiveTaskStatusBc)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="前道缴纳至月份：">
                  <label>{{viewEmpArchive.taskEndMonthBC}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费基数：">
                  <label>{{viewEmpPeriodAdd.baseAmount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费金额：">
                  <label>{{viewEmpPeriodAdd.amount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费比例：">
                  <label>{{viewEmpPeriodAdd.ratio}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入实际年月：">
                  <label>{{viewEmpArchive.startMonthBc}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出实际年月：">
                  <label>{{viewEmpArchive.endMonthBc}}</label>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
                <!--<Table border class="mt20" :columns="columnsEmpTaskPeriodAdd" :data="listEmpTaskPeriodAdd"></Table>-->
                <origin-emp-task-info :companyId="this.$route.query.companyId" :employeeId="this.$route.query.employeeId" :hfType=2></origin-emp-task-info>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <!--<Panel name="5">-->
        <!--雇员任务单-->
        <!--<div slot="content">-->
          <!--<origin-emp-task-info :empArchiveId="this.$route.query.empArchiveId"></origin-emp-task-info>-->
        <!--</div>-->
      <!--</Panel>-->
       <Panel name="5">
        雇员基本/补充公积金转移
        <div slot="content">
          <Form :label-width='150'>
            <Row>
              <Col :sm="{span: 24}">
                <Table border class="mt20" :columns="columnsTransfer" :data="listEmpTransfer"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <!-- <Panel name="6">
        备注
        <div slot="content">
          <fund-notes :notesInfo="data.notesInfo"></fund-notes>
        </div>
      </Panel> -->
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="saveEmpAccount" v-show="this.$route.query.empArchiveId">保存</Button>
        <Button type="warning" @click="back">关闭/返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
//  import {mapState, mapGetters, mapActions} from 'vuex'
//  import EventTypes from '../../../store/event_types'
  import basicInfo from '../common/BasicInfo.vue'
  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import fundInfo from '../common/FundInfo.vue'
  import fundTransfer from '../common/FundTransfer.vue'
  import fundNotes from '../common/FundNotes.vue'
  import api from '../../../api/house_fund/employee_operator'
  import originEmpTaskInfo from './OriginEmpTaskInfo.vue'

  export default {
    components: {basicInfo, fundNotes, originEmpTaskInfo},
    data() {
      return {
        viewEmpArchive:{
          empArchiveIdBc:'',
          empArchiveId:'',
          employeeId : '',
          employeeName : '',
          idNum : '',
          companyId : '',
          title : '',
          hfEmpAccount : '',
          archiveTaskStatus : '',
          archiveTaskStatusBc : '',
          hfEmpAccountBc : '',
          belongVendor : '',
          inDate : '',
          outDate : ''
        },
        viewEmpPeriod:{
          baseAmount : '',
          startMonth : '',
          endMonth : '',
          ratio : '',
          amount : '',
        },
        viewEmpPeriodAdd:{
          baseAmount : '',
          startMonth : '',
          endMonth : '',
          ratio : '',
          amount : '',
        },
        viewComAccount:{
          comAccountName : '',
          paymentWay : '',
          hfAccountType : '',
          closeDay : '',
          ukeyStore : '',
          paymentBank : '',
          state : '',
          hfType : '',
          hfComAccount : '',
          comStartMonth : '',
          endMonth : '',
          comHfMonth : '',
          addComAccount : '',
          companyId : '',
          title : '',
          accountTempStoreBc:'',
          accountTempStore:'',
          serviceSpecialist:'',
          leaderShipName:'',
          serviceCenter:'',
        },
        listEmpTaskPeriod:[],
        listEmpTaskPeriodAdd:[],
        listEmpTransfer:[],

        collapseInfo: [1, 2, 3, 4, 5, 6, 7], //展开栏
        columnsEmpTaskPeriod: [
           {title: '任务类型', key: 'taskCategory', align: 'center',
            render: (h, params) => {
              let taskCategory=this.$decode.hf_taskCategory(params.row.taskCategory);
              if(params.row.isChange==1){
                taskCategory= taskCategory+'(更正)'
              }
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', taskCategory),
              ]);
            }
          },
          {title: '基数', key: 'baseAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.baseAmount),
              ]);
            }
          },
          {title: '起缴年月', key: 'startMonth', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {title: '截至年月', key: 'endMonth', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          },
          {title: '缴费金额', key: 'amount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.amount),
              ]);
            }
          },
          {title: '缴费比例', key: 'ratio', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.ratio),
              ]);
            }
          },
        ],
        columnsEmpTaskPeriodAdd: [
           {title: '任务类型', key: 'taskCategory', align: 'center',
            render: (h, params) => {
              let taskCategory=this.$decode.hf_taskCategory(params.row.taskCategory);
              if(params.row.isChange==1){
                taskCategory=taskCategory+'(更正)'
              }
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', taskCategory),
              ]);
            }
          },
          {title: '基数', key: 'baseAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.baseAmount),
              ]);
            }
          },
          {title: '起缴年月', key: 'startMonth', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {title: '截至年月', key: 'endMonth', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          },
          {title: '缴费金额', key: 'amount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.amount),
              ]);
            }
          },
          {title: '缴费比例', key: 'ratio', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.ratio),
              ]);
            }
          },
        ],
        columnsTransfer: [
          {title: '公积金类型', key: 'hfType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.hfType(params.row.hfType)),
              ]);
            }
          },
          {title: '转入地', key: 'transferInUnit', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.transferInUnit),
              ]);
            }
          },
          {title: '转出地', key: 'transferOutUnit', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.transferOutUnit),
              ]);
            }
          },
          {title: '转移日期', key: 'transferDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.transferDate),
              ]);
            }
          },
          {title: '状态', key: 'taskStatus', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.empTaskStatus(params.row.taskStatus)),
              ]);
            }
          },
          {title: '操作日期', key: 'operateDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.operateDate),
              ]);
            }
          },
          // {title: '打印日期', key: 'printDate', align: 'center',
          //   render: (h, params) => {
          //     return h('div', {style: {textAlign: 'left'}}, [
          //       h('span', params.row.printDate),
          //     ]);
          //   }
          // },
          {title: '回单日期', key: 'backDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.feedbackDate),
              ]);
            }
          }
        ]
      }
    },
    async mounted() {
      let params = {empArchiveId:this.$route.query.empArchiveId,
                    companyId:this.$route.query.companyId,
                    employeeId:this.$route.query.employeeId
                    };
      api.employeeDetailInfoQuery(params).then(data=>{
          this.viewEmpArchive=data.data.viewEmpArchive
          if(data.data.viewEmpPeriod!=null)
              this.viewEmpPeriod=data.data.viewEmpPeriod
          if(data.data.viewEmpPeriodAdd!=null)
              this.viewEmpPeriodAdd = data.data.viewEmpPeriodAdd
          if(data.data.viewComAccount!=null)
              this.viewComAccount = data.data.viewComAccount
          this.listEmpTaskPeriod = data.data.listEmpTaskPeriod
          this.listEmpTaskPeriodAdd = data.data.listEmpTaskPeriodAdd
          this.listEmpTransfer = data.data.listEmpTransfer
      });
    },
    computed: {
//      ...mapState('employeeFundBasicInfo', {
//        data: state => state.data
//      })
    },
    methods: {
//      ...mapActions('employeeFundBasicInfo', [EventTypes.EMPLOYEEFUNDBASICINFO]),
      back() {
        this.$router.go(-1)
      },
      saveEmpAccount(){
        var reg = /(^[0-9]{9}$)/;

        if (!reg.test(this.viewEmpArchive.hfEmpAccount)) {
          this.$Message.error("【基本公积金账号】输入不正确，必须要求9位的数字。");
          return;
        }
        if (this.viewEmpArchive.empArchiveIdBc && this.viewEmpArchive.hfEmpAccountBc && !reg.test(this.viewEmpArchive.hfEmpAccountBc)) {
          this.$Message.error("【补充公积金账号】输入不正确，必须要求9位的数字。");
          return;
        }
          var formData={
            hfEmpAccount:'',
            hfEmpAccountBc:'',
            empArchiveIdBc:'',
            empArchiveId:'',
          };
          this.$Modal.confirm({
          title: "你确认保存信息吗？",
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            {//收集数据
              formData.hfEmpAccount = this.viewEmpArchive.hfEmpAccount
              formData.hfEmpAccountBc=this.viewEmpArchive.hfEmpAccountBc
              formData.empArchiveIdBc=this.viewEmpArchive.empArchiveIdBc
              formData.empArchiveId= this.viewEmpArchive.empArchiveId
              formData.employeeId =this.viewEmpArchive.employeeId
            }
            api.saveEmpAccount(formData).then(data => {
              data=data.data;
              if (data.code == 200) {
                this.$Message.success(data.message);
                // 返回任务列表页面
                history.go(-1);
              } else {
                this.$Message.error( data.message);
              }
            })
           }
        })
      }
    }
  }
</script>
