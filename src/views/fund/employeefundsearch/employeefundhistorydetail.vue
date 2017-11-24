<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <company-fund-account-info :fundInfo="data.companyFundAccountInfo" :isShowPayMonth="false"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-fund-account-info :employeeFundInfo="data.employeeFundAccountInfo" :isShowFundStatus="true"></employee-fund-account-info>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <employee-fund-task-reference-add :referenceInfo="data.employeeFundTaskReferenceAdd" :disabled="true" v-if="taskType === '0'"></employee-fund-task-reference-add>
          <employee-fund-task-reference-change :referenceInfo="data.employeeFundTaskReferenceChange" :disabled="true" v-if="taskType === '1'"></employee-fund-task-reference-change>
        </div>
      </Panel>
      <Panel name="4">
        操作
        <div slot="content">
          <employee-fund-operator-add :fundOperatorInfo="data.fundOperatorAdd" :disabled="true"></employee-fund-operator-add>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary">已处理</Button>
        <Button type="primary" class="ml10">不需处理</Button>
        <Button type="primary" class="ml10">转下月处理</Button>
        <Button type="error" class="ml10">批退</Button>
        <Button type="primary" class="ml10" @click="isShowPrint = true">打印转移通知书</Button>
        <Button type="warning" class="ml10" @click="back">保存并返回</Button>
      </Col>
    </Row>

    <!-- 打印转移通知书 模态框 -->
    <Modal
      v-model="isShowPrint"
      title="打印转移通知书"
      width="720">
      <Form label-width=100>
        <Row>
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
  import EventTypes from '../../../store/EventTypes'
  import companyFundAccountInfo from '../common/companyfundaccountinfo.vue'
  import employeeFundAccountInfo from '../common/employeefundaccountinfo.vue'
  import historyTaskList from '../common/historytasklist.vue'
  import employeeFundTaskReferenceAdd from '../common/employeefundtaskreferenceadd.vue'
  import employeeFundTaskReferenceChange from '../common/employeefundtaskreferencechange.vue'
  import employeeFundOperatorAdd from '../common/employeefundoperatoradd.vue'

  export default {
    components: {companyFundAccountInfo, employeeFundAccountInfo, historyTaskList, employeeFundTaskReferenceAdd, employeeFundTaskReferenceChange, employeeFundOperatorAdd},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4], //展开栏
        taskType: this.$route.query.taskType,
        isShowPrint: false,
        outUnitValue: '',
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
        transferDate: ''
      }
    },
    mounted() {
      this[EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]()
    },
    computed: {
      ...mapState('employeeFundHistoryDetail', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundHistoryDetail', [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]),
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>
