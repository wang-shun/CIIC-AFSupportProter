<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户基本公积金账号：">
                <label>{{displayVO.basicHfComAccount}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户补充公积金账号：">
                <label>{{displayVO.addedHfComAccount}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户中心：">
                <label>{{displayVO.customerCenter}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="缴费区县：">
                <label>{{displayVO.paymentBankName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业公积金账户状态：">
                <label>{{displayVO.stateName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="末次汇缴月（基本）：">
                <label>{{displayVO.basicComHfMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="末次汇缴月（补充）：">
                <label>{{displayVO.addedComHfMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客服经理：">
                <label>{{displayVO.serviceManager}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户专员：">
                <label>{{displayVO.customerServicer}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="截单年月（基本）：">
                <label>{{displayVO.basicEndMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="截单年月（补充）：">
                <label>{{displayVO.addedEndMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="付款方式：">
                <label>{{displayVO.paymentWayName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公积金企业U盾：">
                <label>{{displayVO.ukeyStoreName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户编号：">
                <label>{{displayVO.companyId}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="客户名称：">
                <label>{{displayVO.companyName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业账户类型：">
                <label>{{displayVO.hfAccountTypeName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业公积金账号名称：">
                <label>{{displayVO.comAccountName}}
                  <span style="color: red">{{displayVO.comTaskStatusName}}</span>
                </label>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员编号：">
                <label>{{displayVO.employeeId}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="雇员姓名：">
                <label>{{displayVO.employeeName}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="证件号码：">
                <label>{{displayVO.idNum}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="入职日期：">
                <label>{{displayVO.inDate}}</label>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="基本公积金账号：">
                <label>{{displayVO.basicHfEmpAccount}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="基本公积金状态：">
                <label>{{displayVO.basicArchiveStatusName}}</label>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="fundColumns" :data="basicFundData"></Table>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="补充公积金账号：">
                <label>{{displayVO.addedHfEmpAccount}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="补充公积金状态：">
                <label>{{displayVO.addedArchiveStatusName}}</label>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="fundColumns" :data="addedFundData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <Form :label-width=150>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="taskReferenceInfoColumns" :data="taskReferenceInfoData"></Table>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        操作
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公积金类型：">
                {{displayVO.hfTypeName}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="任务类型：">
                <Select v-model="displayVO.taskCategory" style="width: 100%;" transfer :disabled="taskCategoryDisable">
                  <Option v-for="item in taskCategoryList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="基本/补充公积金账户：">
                <Input v-model="displayVO.hfEmpAccount" placeholder="请输入..." :disabled="inputDisabled"></Input>
              </FormItem>
              </Col>
              <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<FormItem label="">-->
                <!--<Checkbox v-model="isCreateSealingTicket">创建封存任务单</Checkbox>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">-->
              <!--<FormItem label="雇员起缴月份">-->
                <!--<DatePicker type="month" v-model="displayVO.startMonth" format="yyyyMM" placement="bottom-end" placeholder="选择年月" style="width: 100%;" transfer></DatePicker>-->
              <!--</FormItem>-->
              <!--</Col>-->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="操作提示：">
                <Select v-model="displayVO.operationRemind" style="width: 100%;" transfer :disabled="inputDisabled">
                  <Option value="" label="无"></Option>
                  <Option v-for="item in operationRemindList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="操作提示日期">
                <DatePicker v-model="displayVO.operationRemindDate" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer :disabled="inputDisabled"></DatePicker>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="operatorListColumns" :data="operatorListData"></Table>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span: 24}">
              <FormItem label="办理备注：">
                <Input v-model="displayVO.handleRemark" placeholder="请输入..." :disabled="inputDisabled"></Input>
              </FormItem>
              </Col>
              <Col :sm="{span: 24}">
              <FormItem label="批退备注：">
                <Input v-model="displayVO.rejectionRemark" placeholder="请输入..." :disabled="inputDisabled"></Input>
              </FormItem>
              </Col>
            </Row>
          </Form>
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
        <Button type="primary" @click="handleTask" v-if="showButton">已处理</Button>
        <Button type="primary" class="ml10" @click="notHandleTask" v-if="showButton">不需处理</Button>
        <Button type="primary" class="ml10" @click="handleTaskDelay" v-if="showButton">转下月处理</Button>
        <Button type="error" class="ml10" @click="handleTaskReject" v-if="showButton">批退</Button>
        <Button type="primary" class="ml10" @click="isShowPrint = true" v-if="showButton">打印转移通知书</Button>
        <Button type="primary" class="ml10" @click="saveTask" v-if="showButton">保存</Button>
        <Button type="primary" class="ml10" @click="handleTaskCancel" v-if="showCancel">撤销</Button>
        <Button type="warning" class="ml10" @click="back">返回</Button>
      </Col>
    </Row>

    <!-- 打印转移通知书 模态框 -->
    <Modal
      v-model="isShowPrint"
      title="打印转移通知书"
      width="720">
      <Form :label-width=100 ref="transferNotice" :model="transferNotice">
        <Row type="flex" justify="start">
          <Col :sm="{span: 12}">
            <FormItem label="转出单位">
              <AutoComplete v-model="transferNotice.transferOutUnit" :data="transferOutUnitList" :filter-method="filterMethod" style="width: 100%;" transfer>
              </AutoComplete>
            </FormItem>
          </Col>
          <Col :sm="{span: 12}">
            <FormItem label="转出单位账号">
              <Input v-model="transferNotice.transferOutUnitAccount" placeholder="请输入..."></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 12}">
            <FormItem label="转入单位">
              <Input v-model="transferNotice.transferInUnit" placeholder="请输入..."></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 12}">
            <FormItem label="转入单位账号">
              <Input v-model="transferNotice.transferInUnitAccount" placeholder="请输入..."></Input>
            </FormItem>
          </Col>
          <Col :sm="{span: 12}">
            <FormItem label="转移日期">
              <DatePicker v-model="transferNotice.transferDate" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
            </FormItem>
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
//  import {mapState, mapGetters, mapActions} from 'vuex'
//  import EventTypes from '../../../../store/event_types'
  import api from '../../../../api/house_fund/employee_task_handle/employee_task_handle'
  import dict from '../../../../api/dict_access/house_fund_dict'

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5], //展开栏
        showButton: true,
        showCancel: false,
        inputDisabled: false,
        isShowPrint: false,
        displayVO: {
          empTaskId: 0,
          taskCategory: 0,
          basicHfComAccount: '',
          addedHfComAccount: '',
          customerCenter: '',
          paymentBankName: '',
          ukeyStoreName: '',
          stateName: '',
          basicComHfMonth: '',
          addedComHfMonth: '',
          serviceManager: '',
          customerServicer: '',
          basicEndMonth: '',
          addedEndMonth: '',
          paymentWayName: '',
          companyId: '',
          companyName: '',
          hfAccountTypeName: '',
          comAccountId: '',
          comAccountName: '',
          basicComAccountClassId: '',
          addedComAccountClassId: '',
          comTaskStatusName: '',

          employeeId: '',
          employeeName: '',
          idNum: '',
          inDate: '',
          basicEmpArchiveId: '',
          basicHfEmpAccount: '',
          basicEmpTaskStatusName: '',
          basicEmpStartMonth: '',
          basicEmpEndMonth: '',
          basicEmpAmount: '',
          basicEmpBase: '',
          basicRatioCom: '',
          basicRatioEmp: '',
          addedHfEmpAccount: '',
          addedEmpTaskStatusName: '',
          addedEmpStartMonth: '',
          addedEmpEndMonth: '',
          addedEmpAmount: '',
          addedEmpBase: '',
          addedRatioCom: '',
          addedRatioEmp: '',

          hfTypeName: '',
          hfEmpAccount: '',
//          isCreateSealingTicket: false,
//          startMonth: '',
          handleRemark: '',
          rejectionRemark: '',

          operationRemind: '',
          operationRemindDate: '',
          canHandle: false
        },
        fundColumns: [
          {title: '起缴年月', key: 'startMonth', align: 'left'},
          {title: '截至年月', key: 'endMonth', align: 'left'},
          {title: '客户汇缴年月', key: 'hfMonth', align: 'left'},
          {title: '基数', key: 'baseAmount', align: 'left'},
          {title: '企业比例', key: 'ratioCom', align: 'left'},
          {title: '个人比例', key: 'ratioEmp', align: 'left'},
          {title: '金额', key: 'amount', align: 'left'}
        ],
        basicFundData: [],
        addedFundData: [],
        taskReferenceInfoColumns: [
          {title: '公积金基数', key: 'empBase', align: 'left'},
          {title: '企业比例', key: 'ratioCom', align: 'left'},
          {title: '个人比例', key: 'ratioEmp', align: 'left'},
          {title: '起缴月份', key: 'empStartMonth', align: 'left'},
          {title: '截至月份', key: 'empEndMonth', align: 'left'},
          {title: '金额', key: 'amount', align: 'left'}
        ],
        taskReferenceInfoData: [],
        taskCategoryDisable: false,
        taskCategoryList: [],

        operationRemindList: [],
        operationRemindDate: '',
        operatorListData: [],
        operatorListColumns: [
          {title: '起缴月份', key: 'startMonth', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('DatePicker', {
                    props: {
                      value: params.row.startMonth,
                      type: 'month',
                      format: 'yyyyMM',
                      placement: 'bottom-end',
                      placeholder: '选择年月',
                      style: 'width: 100%;',
                      transfer: true
                    },
                    on: {
                      'on-change': (val) => {
                        this.operatorListData[params.index].startMonth = val;
                      }
                    }
                  })
                ]);
              } else {
                return h('div', [
                  h('span', params.row.startMonth)
                ]);
              }
            }
          },
          {title: '截止月份', key: 'endMonth', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('DatePicker', {
                    props: {
                      value: params.row.endMonth,
                      type: 'month',
                      format: 'yyyyMM',
                      placement: 'bottom-end',
                      placeholder: '选择年月',
                      style: 'width: 100%;',
                      transfer: true
                    },
                    on: {
                      'on-change': (val) => {
                        this.operatorListData[params.index].endMonth = val;
                      }
                    }
                  })
                ]);
              } else {
                return h('div', [
                  h('span', params.row.endMonth)
                ]);
              }
            }
          },
          {title: '客户汇缴月', key: 'hfMonth', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('DatePicker', {
                    props: {
                      value: params.row.hfMonth,
                      type: 'month',
                      format: 'yyyyMM',
                      placement: 'bottom-end',
                      placeholder: '选择年月',
                      style: 'width: 100%;',
                      transfer: true
                    },
                    on: {
                      'on-change': (val) => {
                        this.operatorListData[params.index].hfMonth = val;
                      }
                    }
                  })
                ]);
              } else {
                return h('div', [
                  h('span', params.row.hfMonth)
                ]);
              }
            }
          },
          {title: '基数', key: 'baseAmount', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('Input', {
                    props: {value: params.row.baseAmount},
                    on: {
                      'on-blur': (event) => {
                        this.operatorListData[params.index].baseAmount = event.target.value
                      }
                    }
                  }, params.row.baseAmount)
                ]);
              } else {
                return h('div', [
                  h('span', params.row.baseAmount)
                ]);
              }
            }
          },
          {title: '企业比例', key: 'ratioCom', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('Input', {
                    props: {value: params.row.ratioCom},
                    on: {
                      'on-blur': (event) => {
                        this.operatorListData[params.index].ratioCom = event.target.value
                      }
                    }
                  }, params.row.ratioCom)
                ]);
              } else {
                return h('div', [
                  h('span', params.row.ratioCom)
                ]);
              }
            }
          },
          {title: '个人比例', key: 'ratioEmp', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('Input', {
                    props: {value: params.row.ratioEmp},
                    on: {
                      'on-blur': (event) => {
                        this.operatorListData[params.index].ratioEmp = event.target.value
                      }
                    }
                  }, params.row.ratioEmp)
                ]);
              } else {
                return h('div', [
                  h('span', params.row.ratioEmp)
                ]);
              }
            }
          },
          {title: '金额', key: 'amount', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('Input', {
                    props: {value: params.row.amount},
                    on: {
                      'on-blur': (event) => {
                        this.operatorListData[params.index].amount = event.target.value
                      }
                    }
                  }, params.row.amount)
                ]);
              } else {
                return h('div', [
                  h('span', params.row.amount)
                ]);
              }
            }
          },
        ],

        taskListNotesColumns: [
          {title: '公积金类型', key: 'hfTypeName', align: 'left'},
          {title: '任务类型', key: 'taskCategoryName', align: 'left'},
          {title: '办理/批退', key: 'handleStatusName', align: 'left'},
          {title: '备注人', key: 'submitterId', align: 'left'},
          {title: '备注时间', key: 'submitTime', align: 'left'},
          {title: '备注内容', key: 'submitterRemark', align: 'left'}
        ],
        taskListNotesChangeData: [],

        transferOutUnitList: [],
        transferNotice: {
          transferOutUnit: '',
          transferOutUnitAccount: '',
          transferInUnit: '',
          transferInUnitAccount: '',
          transferDate: '',
        },
        inputData: {
          empTaskId: 0,
          taskStatus: 1,
          taskCategory: 0,
          companyId: '',
          employeeId: '',
          comAccountId: '',
          basicComAccountClassId: '',
          addedComAccountClassId: '',
          belongEmpArchiveId: '',
          hfEmpAccount: '',
//          startMonth: '',
          operationRemind: '',
          operationRemindDate: '',
          operatorListData: [],
          handleRemark: '',
          rejectionRemark: ''
        },
      }
    },
    mounted() {
//      this[EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]()
      let empTaskId = localStorage.getItem('employeeFundCommonOperator.empTaskId');
      let hfType = localStorage.getItem('employeeFundCommonOperator.hfType');
      let taskCategory = localStorage.getItem('employeeFundCommonOperator.taskCategory');
      api.empTaskHandleDataQuery({
        empTaskId: empTaskId,
        hfType: hfType,
        taskStatus: 1
      }).then(data => {
        if (data.code == 200) {
          this.displayVO = data.data;
          this.taskReferenceInfoData.push({
            empBase: this.displayVO.empBase,
            ratioCom: this.displayVO.ratioCom,
            ratioEmp: this.displayVO.ratioEmp,
            empStartMonth: this.displayVO.startMonth,
            empEndMonth: this.displayVO.endMonth,
            amount: this.displayVO.amount
          });

          this.basicFundData = data.data.basicArchiveBasePeriods;
          this.addedFundData = data.data.addedArchiveBasePeriods;
          this.operatorListData = data.data.empTaskPeriods;
          this.taskListNotesChangeData = data.data.empTaskRemarks;

          this.showButton = this.displayVO.canHandle;

          if (!this.displayVO.taskStatus || this.displayVO.taskStatus == 1) {
            this.inputDisabled = false;
          } else {
            if (this.displayVO.taskStatus == 2) {
              this.showCancel = true;
            }
            this.inputDisabled = true;
            this.taskCategoryDisable = true;
            this.showButton = false;
          }
        } else {
          this.$Message.error(data.message);
        }
      });
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.taskCategoryList = data.data.HFLocalTaskCategory;
          this.operationRemindList = data.data.OperationRemind;
          this.transferOutUnitList = data.data.FundOutUnit;
          if (taskCategory > 2) {
            this.taskCategoryDisable = true;
          } else {
            this.taskCategoryDisable = false;
            this.taskCategoryList.splice(2, this.taskCategoryList.length - 2);
          }

//          if (taskCategory == 6) { // 补缴
//            this.operatorListColumns.push(
//              {title: '补缴原因', key: 'repairReason', align: 'left',
//                render: (h, params) => {
//                  return h('div', [
//                    h('Select', {props: {value: params.row.repairReason},
//                        on: {
//                          'on-change': (event) => {
//                            this.operatorListData[params.index].repairReason = event
//                          }
//                        }
//                      },
//                      [
//                        data.data.RepairReason.map((item) => h('Option', {props: {value: item.key}}, item.value))
//                      ]
//                    )
//                  ]);
//                }
//              }
//            )
//          }
        }
      })
    },
    computed: {
//      ...mapState('employeeFundHistoryDetail', {
//        data: state => state.data
//      }),
    },
    methods: {
//      ...mapActions('employeeFundHistoryDetail', [EventTypes.EMPLOYEEFUNDHISTORYDETAILTYPE]),
      back() {
        this.$router.go(-1)
      },
      handleTask() {
        this.setInputData();
        this.inputData.companyId = this.displayVO.companyId;
        this.inputData.employeeId = this.displayVO.employeeId;
        this.inputData.comAccountId = this.displayVO.comAccountId;
        this.inputData.basicComAccountClassId = this.displayVO.basicComAccountClassId;
        this.inputData.addedComAccountClassId = this.displayVO.addedComAccountClassId;
        this.inputData.belongEmpArchiveId = this.displayVO.basicEmpArchiveId;

        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.inputData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }

        api.empTaskHandle(params).then(data => {
          if (data.code == 200) {
            this.$Message.info("办理成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      notHandleTask() {
        api.empTaskNotHandle({
          empTaskId: this.displayVO.empTaskId
        }).then(data => {
          if (data.code == 200) {
            this.$Message.info("不需处理操作成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      handleTaskDelay() {
        api.empTaskHandleDelay({
          empTaskId: this.displayVO.empTaskId
        }).then(data => {
          if (data.code == 200) {
            this.$Message.info("转下月处理操作成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      handleTaskReject() {
        api.empTaskHandleReject({
          rejectionRemark: this.displayVO.rejectionRemark,
          selectedData: [this.displayVO.empTaskId]
        }).then(data => {
          if (data.code == 200) {
            this.$Message.info("批退成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      handleTaskCancel() {
        this.$Message.info("撤销成功");
        this.showCancel = false;
      },
      filterMethod(value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      setInputData() {
        this.inputData.empTaskId = this.displayVO.empTaskId;
        this.inputData.taskCategory = this.displayVO.taskCategory;
        this.inputData.hfEmpAccount = this.displayVO.hfEmpAccount;
//        if (this.displayVO.startMonth) {
//          this.inputData.startMonth = utils.formatDate(this.displayVO.startMonth,"YYYYMM");
//        }
        this.inputData.operationRemind = this.displayVO.operationRemind;
        this.inputData.operationRemindDate = this.displayVO.operationRemindDate;
        this.inputData.handleRemark = this.displayVO.handleRemark;
        this.inputData.rejectionRemark = this.displayVO.rejectionRemark;
        this.inputData.operatorListData = this.operatorListData;
      },
      saveTask () {
        this.setInputData();

        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.inputData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }

        api.empTaskHandleDataSave(params).then(data => {
          if (data.code == 200) {
            this.$Message.info("保存成功");
          } else {
            this.$Message.error(data.message);
          }
        })
      }
    }
  }
</script>
