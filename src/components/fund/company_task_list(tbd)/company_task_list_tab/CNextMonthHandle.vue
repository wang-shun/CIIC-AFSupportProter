<template>
  <div class="smList"  style="height: 850px;">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业任务单
        <div slot="content">
          <Form ref="companyTaskInfo" :model="companyTaskInfo" :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenterValue">
                  <Select v-model="companyTaskInfo.serviceCenterValue" style="width: 100%;" disabled transfer>
                    <Option v-for="item in companyTaskInfo.serviceCenterList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="customerNumber">
                  <Input v-model="companyTaskInfo.customerNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="customerName">
                  <Input v-model="companyTaskInfo.customerName" @on-focus="companyTaskInfo.isShowCustomerName = true" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账户类型：" prop="accountTypeValue">
                  <Select v-model="companyTaskInfo.accountTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：" prop="regionValue">
                  <Select v-model="companyTaskInfo.regionValue" style="width: 100%;" transfer>
                    <Option v-for="(value,key) in this.baseDic.dic_settle_area" :value="value" :key="key">{{value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务单编号：" prop="taskNumber">
                  <Input v-model="companyTaskInfo.taskNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务单类型：" prop="taskTypeValue">
                  <Select v-model="companyTaskInfo.taskTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.taskTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务发起时间：" prop="taskStartTime">
                  <DatePicker v-model="companyTaskInfo.taskStartTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="处理状态：" prop="handleStateValue">
                  <Select v-model="companyTaskInfo.handleStateValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyTaskInfo.handleStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="" icon="ios-search">查询</Button>
                <Button type="warning" @click="resetSearchCondition('companyTaskInfo')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Form>
      <Row class="mt20">
        <Col :sm="{span:24}">
          <Button type="error" @click="isRefuseReason = true">批退</Button>
          <Button type="info" @click="">导出</Button>
        </Col>
      </Row>

      <Row class="mt20">
        <Col :sm="{span:24}">
          <Table border :columns="taskColumns" :data="data.taskData"></Table>
          <Page :total="4" :page-size="5" :page-size-opts="[5, 10]" show-sizer show-total  class="pageSize"></Page>
        </Col>
      </Row>

      <!-- 批退理由 -->
      <Modal
        v-model="isRefuseReason"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form>
          <p>
            <Form-item>
              <Input v-model="refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
            </Form-item>
          </p>
        </Form>
      </Modal>

      <!-- 客户名称 模态框 -->
      <Modal
        v-model="companyTaskInfo.isShowCustomerName"
        title="选择客户"
        @on-ok="ok"
        @on-cancel="cancel">
        <customer-modal :customerData="data.customerData"></customer-modal>
      </Modal>
    </Form>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../common_control/CustomerModal.vue'
  import EventType from '../../../../store/event_types'

  export default {
    components: {customerModal},
    data() {
      return{
        collapseInfo: [1], //展开栏
        companyTaskInfo: {
          serviceCenterValue: '',
          serviceCenterList: [],
          customerNumber: '',
          customerName: '',
          isShowCustomerName: false,
          accountTypeValue: '',
          accountTypeList: [
            {value: '1', label: '独立库'},
            {value: '2', label: '大库'},
            {value: '3', label: '外包'}
          ],
          regionValue: '',
         
          taskNumber: '',
          taskTypeValue: '',
          taskTypeList: [
            {value: '1', label: '新开转入'},
            {value: '2', label: '调整'},
            {value: '3', label: '补缴'},
            {value: '', label: '...'}
          ],
          taskStartTime: '',
          handleStateValue: '',
          handleStateList: [
            {value: '1', label: '已受理'},
            {value: '2', label: '已送审'},
            {value: '3', label: '已完成'}
          ],
        },

        isRefuseReason: false,
        refuseReason: '',

        taskColumns: [
          {title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      switch(params.row.type) {
                        case '开户':
                          this.$router.push({name: 'companyTaskProgressTwo', query: {operatorType: '1'}})
                          break;
                        case '转移':
                          this.$router.push({name: 'companyTaskProgressTwo', query: {operatorType: '2'}})
                          break;
                        case '变更':
                          this.$router.push({name: 'companyTaskProgressTwo', query: {operatorType: '3'}})
                          break;
                        case '终止':
                          this.$router.push({name: 'companyTaskProgressTwo', query: {operatorType: '4'}})
                          break;
                        default:
                          break;
                      }
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {title: '任务单编号', key: 'tid', width: 150, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.tid),
              ]);
            }
          },
          {title: '任务单类型', key: 'type', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.type),
              ]);
            }
          },
          {title: '客户编号', key: 'customerId', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.customerId),
              ]);
            }
          },
          {title: '企业客户', key: 'companyCustomer', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyCustomer),
              ]);
            }
          },
          {title: '完成截止日期', key: 'finishDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.finishDate),
              ]);
            }
          },
          {title: '发起供应商', key: 'sponsor', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.sponsor),
              ]);
            }
          },
          {title: '发起人', key: 'initiator', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.initiator),
              ]);
            }
          },
          {title: '发起时间', key: 'sponsorTime', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.sponsorTime),
              ]);
            }
          },
          {title: '备注', key: 'notes', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.notes),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.CNEXTMONTHHANDLETYPE]()
    },
    computed: {
      ...mapState('cNextMonthHandle',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('cNextMonthHandle',[EventType.CNEXTMONTHHANDLETYPE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      routerToCommcialOperator: function(name) {
        this.$router.push({
          name: 'employeeCommcialOperator',
          query: {operatorType: name}
        });
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
