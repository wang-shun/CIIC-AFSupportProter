<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <Form label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户基本公积金账号：">
                <label>{{companyFundAccount.hfComBasicAccount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户补充公积金账号：">
                <label>{{companyFundAccount.hfComAddedAccount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户中心：">
                <label>{{companyFundAccount.customerCenter}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="缴费区县：">
                <label>{{companyFundAccount.paymentBankName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业公积金账户状态：">
                <label>{{companyFundAccount.comAccountStatus}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="末次汇缴月（基本）：">
                <label>{{companyFundAccount.comHfMonthBasic}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="末次汇缴月（补充）：">
                <label>{{companyFundAccount.comHfMonthAdded}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客服经理：">
                <label>{{companyFundAccount.serviceManager}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户专员：">
                <label>{{companyFundAccount.customerServicer}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="截单年月（基本）：">
                <label>{{companyFundAccount.endMonthBasic}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="截单年月（补充）：">
                <label>{{companyFundAccount.endMonthAdded}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="付款方式：">
                <label>{{companyFundAccount.paymentWayName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公积金企业U盾：">
                <label>{{companyFundAccount.ukeyStoreName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：">
                <label>{{companyFundAccount.comanyId}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：">
                <label>{{companyFundAccount.companyName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业账户类型：">
                <label>{{companyFundAccount.hfAccountTypeName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业公积金账号名称：">
                <label>{{companyFundAccount.comAccountName}}
                  <span style="color: red">{{companyFundAccount.comTaskCategory}}</span>
                </label>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <Form label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：">
                <label>{{employeeFundAccountInfo.employeeId}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：">
                <label>{{employeeFundAccountInfo.employeeName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码：">
                <label>{{employeeFundAccountInfo.idNum}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="入职日期：">
                <label>{{employeeFundAccountInfo.checkInDate}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="基本公积金账号：">
                <label>{{employeeFundAccountInfo.hfEmpAccountBasic}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="基本公积金状态：">
                <label>{{employeeFundAccountInfo.archiveStatusBasic}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="fundColumns" :data="employeeFundAccountInfo.basicFundData"></Table>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="补充公积金账号：">
                <label>{{employeeFundAccountInfo.hfEmpAccountAdded}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="补充公积金状态：">
                <label>{{employeeFundAccountInfo.archiveStatusAdded}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="fundColumns" :data="employeeFundAccountInfo.addedFundData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <employee-fund-task-reference-add :referenceInfo="employeeFundTaskReferenceAdd" v-if="currentTaskType == 1 || currentTaskType == 2 || currentTaskType == 3 || currentTaskType == 5 || currentTaskType == 11"></employee-fund-task-reference-add>
          <!--<employee-fund-task-reference-change :referenceInfo="employeeFundTaskReferenceChange" v-else-if="currentTaskType == 1"></employee-fund-task-reference-change>-->
          <employee-fund-task-reference-sealing :referenceInfo="employeeFundTaskReferenceSealing" v-else-if="currentTaskType == 4 || currentTaskType == 7 || currentTaskType == 8 || currentTaskType == 12"></employee-fund-task-reference-sealing>
          <employee-fund-task-reference-repair :referenceInfo="employeeFundTaskReferenceRepair" v-else-if="currentTaskType == 6"></employee-fund-task-reference-repair>
          <!--<employee-fund-task-reference-transfer :chat="chatList" v-else></employee-fund-task-reference-transfer>-->
        </div>
      </Panel>
      <Panel name="4">
        操作
        <div slot="content">
          <employee-fund-operator-add :fundOperatorInfo="fundOperatorAdd" v-if="currentTaskType == 1 || currentTaskType == 2 || currentTaskType == 3 || currentTaskType == 5 || currentTaskType == 11"></employee-fund-operator-add>
          <!--<employee-fund-operator-change :fundOperatorInfo="fundOperatorChange" v-else-if="currentTaskType == 1"></employee-fund-operator-change>-->
          <employee-fund-operator-sealing :fundOperatorInfo="fundOperatorSealing" v-else-if="currentTaskType == 4 || currentTaskType == 7 || currentTaskType == 8 || currentTaskType == 12"></employee-fund-operator-sealing>
          <employee-fund-operator-repair :fundOperatorInfo="fundOperatorRepair" v-else-if="currentTaskType == 6"></employee-fund-operator-repair>
          <!--<employee-fund-operator-transfer :fundOperatorInfo="data.fundOperatorTransfer" v-else></employee-fund-operator-transfer>-->
        </div>
      </Panel>
      <Panel name="5">
        任务单备注
        <div slot="content">
          <Table border :columns="taskListNotesColumns" :data="taskListNotesChangeData"></Table>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary">已处理</Button>
        <Button type="primary" class="ml10">不需处理</Button>
        <Button type="primary" class="ml10">转下月处理</Button>
        <Button type="error" class="ml10">批退</Button>
        <Button type="primary" class="ml10" @click="isShowPrint = true" v-show="currentTaskType == 1 || currentTaskType == 2 || currentTaskType == 3 || currentTaskType == 5 || currentTaskType == 11">打印转移通知书</Button>
        <!--<Button type="primary" class="ml10" @click="isShowPrint = true" v-show="currentTaskType == 4">打印转移单</Button>-->
        <Button type="primary" class="ml10">保存</Button>
        <Button type="warning" class="ml10" @click="back">返回</Button>
      </Col>
    </Row>

    <!-- 打印转移通知书 模态框 -->
    <Modal
      v-model="isShowPrint"
      title="打印转移通知书"
      width="720">
      <Form label-width=100>
        <Row type="flex" justify="start">
          <Col :sm="{span: 12}">
            <Form-item label="转出单位">
              <Select v-model="outUnitValue" style="width: 100%;" transfer>
                <Option v-for="item in outUnitList" :value="item.key" :key="item.key">{{item.value}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="转出单位账号">
              <Input v-model="outUnitAccount" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="转入单位">
              <Input v-model="inUnit" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="转入单位账号">
              <Input v-model="inUnitAccount" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col :sm="{span: 12}">
            <Form-item label="转移日期">
              <Input v-model="transferDate" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Row>
          <Col :sm="{span: 24}">
            <Button type="primary" @click="isShowPrint = false">打印通知书</Button>
            <Button type="warning" @click="isShowPrint = false">取消</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventTypes from '../../../../store/event_types'
  import companyFundAccountInfo from '../../common/CompanyFundAccountInfo.vue'
  import employeeFundAccountInfo from '../../common/EmployeeFundAccountInfo.vue'
  import historyTaskList from '../../common/HistoryTaskList.vue'
  import employeeFundTaskReferenceAdd from '../../common/EmployeeFundTaskReferenceAdd.vue'
//  import employeeFundTaskReferenceChange from '../../common/EmployeeFundTaskReferenceChange.vue'
  import employeeFundTaskReferenceSealing from '../../common/EmployeeFundTaskReferenceSealing.vue'
  import employeeFundTaskReferenceRepair from '../../common/EmployeeFundTaskReferenceRepair.vue'
//  import employeeFundTaskReferenceTransfer from '../../common/EmployeeFundTaskReferenceTransfer.vue'
  import employeeFundOperatorAdd from '../../common/EmployeeFundOperatorAdd.vue'
//  import employeeFundOperatorChange from '../../common/EmployeeFundOperatorChange.vue'
  import employeeFundOperatorSealing from '../../common/EmployeeFundOperatorSealing.vue'
  import employeeFundOperatorRepair from '../../common/EmployeeFundOperatorRepair.vue'
//  import employeeFundOperatorTransfer from '../../common/EmployeeFundOperatorTransfer.vue'

  export default {
    components: {companyFundAccountInfo, employeeFundAccountInfo, historyTaskList, employeeFundTaskReferenceAdd, employeeFundTaskReferenceChange, employeeFundTaskReferenceSealing, employeeFundTaskReferenceRepair, employeeFundTaskReferenceTransfer, employeeFundOperatorAdd, employeeFundOperatorChange, employeeFundOperatorSealing, employeeFundOperatorRepair, employeeFundOperatorTransfer},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5], //展开栏
        isShowPrint: false,
        companyFundAccountInfo: {
          hfComBasicAccount: '',
          hfComAddedAccount: '',
          customerCenter: '',
          paymentBankName: '',
          comAccountStatus: '',
          comHfMonthBasic: '',
          comHfMonthAdded: '',
          serviceManager: '',
          customerServicer: '',
          endMonthBasic: '',
          endMonthAdded: '',
          paymentWayName: '',
          ukeyStore: '',
          comanyId: '',
          companyName: '',
          hfAccountTypeName: '',
          comAccountName: '',
          comTaskCategory: ''
        },
        employeeFundAccountInfo: {
          employeeId: '',
          employeeName: '',
          idNum: '',
          checkInDate: '',
          hfEmpAccountBasic: '',
          archiveStatusBasic: '',
          basicFundData: [],
          hfEmpAccountAdded: '',
          archiveStatusAdded: '',
          addedFundData: []
        },
        employeeFundTaskReferenceAdd: {
          changeTypeValue: 0,
          taskReferenceInfoData: [],
          taskCategory: '',
          taskCategoryList: []
        },
        employeeFundTaskReferenceSealing: {
          outDate: '2017-8-24',
          endPayDate: '201708'
        },
        employeeFundTaskReferenceRepair: {
          fundBase: '9000',
          fundPercent: '0.14',
          startRepairDate: '201702',
          endRepairDate: '201706'
        },
        fundOperatorAdd: {
          fundType: '基本公积金',
          fundAccount: '',
          isCreateSealingTicket: false,
          startPayDate: '201701',
          operatorTipValue: 0,
          operatorTipDate: '',
          operatorListData: [],
          doRemark: '',
          refuseRemark: ''
        },
        fundOperatorSealing: {
          fundType: '基本公积金',
          changeType: 1,
          endPayDate: '201708',
          customerPayDate: '201708',
          doRemark: '',
          refuseRemark: ''
        },
        fundOperatorRepair: {
          fundType: '基本公积金',
          taskType: '补缴',
          reasonValue: 0,
          operatorTipValue: 0,
          operatorTipDate: '',
          customerPayDate: '201707',
          operatorListData: [],
        },
        outUnitValue: 1,
        outUnitList: [
          {label: '原单位', value: 0},
          {label: '市公积金封存办(中心)', value: 1},
          {label: '中智大库', value: 2},
          {label: '中智外包', value: 3},
          {label: '独立户1', value: 4},
          {label: '独立户2', value: 5}
        ],
        outUnitAccount: '',
        inUnit: '',
        inUnitAccount: '',
        transferDate: '',
        taskListNotesColumns: [
          {title: '公积金类型', key: 'fundType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.fundType),
              ]);
            }
          },
          {title: '任务类型', key: 'taskType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskType),
              ]);
            }
          },
          {title: '办理/批退', key: 'handleOrRefuse', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleOrRefuse),
              ]);
            }
          },
          {title: '备注人', key: 'noteWriter', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.noteWriter),
              ]);
            }
          },
          {title: '备注人', key: 'noteDate', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.noteDate),
              ]);
            }
          },
          {title: '备注内容', key: 'noteContent', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.noteContent),
              ]);
            }
          }
        ],
        taskListNotesChangeData: []
      }
    },
    mounted() {
//      this[EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]()
    },
    computed: {
//      ...mapState('employeeFundHistoryDetail', {
//        data: state => state.data
//      }),
      currentTaskType() {
        console.log(this.$route.query.taskCategory)
        return this.$route.query.taskCategory;
      }
    },
    methods: {
//      ...mapActions('employeeFundHistoryDetail', [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]),
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
