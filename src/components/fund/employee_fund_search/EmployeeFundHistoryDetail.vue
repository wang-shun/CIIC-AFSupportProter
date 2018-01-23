<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :companyFundAccountInfo="data.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-fund-account-info :employeeFundInfo="data.employeeFundAccountInfo"></employee-fund-account-info>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <employee-fund-task-reference-add :referenceInfo="data.employeeFundTaskReferenceAdd" v-if="currentTaskType == 0"></employee-fund-task-reference-add>
          <employee-fund-task-reference-change :referenceInfo="data.employeeFundTaskReferenceChange" v-else-if="currentTaskType == 1"></employee-fund-task-reference-change>
          <employee-fund-task-reference-sealing :referenceInfo="data.employeeFundTaskReferenceSealing" v-else-if="currentTaskType == 2"></employee-fund-task-reference-sealing>
          <employee-fund-task-reference-repair :referenceInfo="data.employeeFundTaskReferenceRepair" v-else-if="currentTaskType == 3"></employee-fund-task-reference-repair>
          <employee-fund-task-reference-transfer :chat="data.chatList" v-else></employee-fund-task-reference-transfer>
        </div>
      </Panel>
      <Panel name="4">
        操作
        <div slot="content">
          <employee-fund-operator-add :fundOperatorInfo="data.fundOperatorAdd" v-if="currentTaskType == 0"></employee-fund-operator-add>
          <employee-fund-operator-change :fundOperatorInfo="data.fundOperatorChange" v-else-if="currentTaskType == 1"></employee-fund-operator-change>
          <employee-fund-operator-sealing :fundOperatorInfo="data.fundOperatorSealing" v-else-if="currentTaskType == 2"></employee-fund-operator-sealing>
          <employee-fund-operator-repair :fundOperatorInfo="data.fundOperatorRepair" v-else-if="currentTaskType == 3"></employee-fund-operator-repair>
          <employee-fund-operator-transfer :fundOperatorInfo="data.fundOperatorTransfer" v-else></employee-fund-operator-transfer>
        </div>
      </Panel>
      <Panel name="5" v-if="currentTaskType == 1 || currentTaskType == 2 || currentTaskType == 3">
        任务单备注
        <div slot="content">
          <Table border :columns="taskListNotesColumns" :data="data.taskListNotesChangeData"></Table>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" v-show="currentTaskType != 4">已处理</Button>
        <Button type="primary" class="ml10" v-show="currentTaskType == 4">不需处理</Button>
        <Button type="primary" class="ml10" v-show="currentTaskType != 4">转下月处理</Button>
        <Button type="error" class="ml10" v-show="currentTaskType != 4">批退</Button>
        <Button type="primary" class="ml10" @click="isShowPrint = true" v-show="currentTaskType == 0">打印转移通知书</Button>
        <Button type="primary" class="ml10" @click="isShowPrint = true" v-show="currentTaskType == 4">打印转移单</Button>
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
                <Option v-for="item in outUnitList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
  import EventTypes from '../../../store/event_types'
  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import employeeFundAccountInfo from '../common/EmployeeFundAccountInfo.vue'
  import historyTaskList from '../common/HistoryTaskList.vue'
  import employeeFundTaskReferenceAdd from '../common/EmployeeFundTaskReferenceAdd.vue'
  import employeeFundTaskReferenceChange from '../common/EmployeeFundTaskReferenceChange.vue'
  import employeeFundTaskReferenceSealing from '../common/EmployeeFundTaskReferenceSealing.vue'
  import employeeFundTaskReferenceRepair from '../common/EmployeeFundTaskReferenceRepair.vue'
  import employeeFundTaskReferenceTransfer from '../common/EmployeeFundTaskReferenceTransfer.vue'
  import employeeFundOperatorAdd from '../common/EmployeeFundOperatorAdd.vue'
  import employeeFundOperatorChange from '../common/EmployeeFundOperatorChange.vue'
  import employeeFundOperatorSealing from '../common/EmployeeFundOperatorSealing.vue'
  import employeeFundOperatorRepair from '../common/EmployeeFundOperatorRepair.vue'
  import employeeFundOperatorTransfer from '../common/EmployeeFundOperatorTransfer.vue'

  export default {
    components: {companyFundAccountInfo, employeeFundAccountInfo, historyTaskList, employeeFundTaskReferenceAdd, employeeFundTaskReferenceChange, employeeFundTaskReferenceSealing, employeeFundTaskReferenceRepair, employeeFundTaskReferenceTransfer, employeeFundOperatorAdd, employeeFundOperatorChange, employeeFundOperatorSealing, employeeFundOperatorRepair, employeeFundOperatorTransfer},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5], //展开栏
        isShowPrint: false,
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
        ]
      }
    },
    mounted() {
      this[EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]()
    },
    computed: {
      ...mapState('employeeFundHistoryDetail', {
        data: state => state.data
      }),
      currentTaskType() {
        console.log(this.$route.query.taskType)
        return this.$route.query.taskType;
      }
    },
    methods: {
      ...mapActions('employeeFundHistoryDetail', [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]),
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
