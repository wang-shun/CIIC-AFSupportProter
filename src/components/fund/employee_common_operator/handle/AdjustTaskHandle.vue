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
                {{displayVO.hfEmpAccount}}
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
        <Button type="primary" class="ml10" @click="saveTask" v-if="showButton">保存</Button>
        <!--<Button type="primary" class="ml10" @click="handleTaskCancel" v-if="showCancel">撤销</Button>-->
        <Button type="warning" class="ml10" @click="back">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import api from '../../../../api/house_fund/employee_task_handle/employee_task_handle'
  import dict from '../../../../api/dict_access/house_fund_dict'
  import axios from "axios";

  export default {
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5], //展开栏
        showButton: true,
        showCancel: false,
        inputDisabled: false,
        isShowPrint: false,
        loading: false,
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
        repairReason: [],
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
          {title: '汇缴类型', key: 'remitWayName', width: 90, align: 'left'},
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
              if (!this.inputDisabled && this.operatorListData[params.index].remitWay == 2) {
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
//              if (!this.inputDisabled) {
//                return h('div', [
//                  h('DatePicker', {
//                    props: {
//                      value: params.row.hfMonth,
//                      type: 'month',
//                      format: 'yyyyMM',
//                      placement: 'bottom-end',
//                      placeholder: '选择年月',
//                      style: 'width: 100%;',
//                      transfer: true
//                    },
//                    on: {
//                      'on-change': (val) => {
//                        this.operatorListData[params.index].hfMonth = val;
//                      }
//                    }
//                  })
//                ]);
//              } else {
                return h('div', [
                  h('span', params.row.hfMonth)
                ]);
//              }
            }
          },
          {title: '基数', key: 'baseAmount', align: 'left',
            render: (h, params) => {
//              if (!this.inputDisabled) {
//                return h('div', [
//                  h('Input', {
//                    props: {value: params.row.baseAmount},
//                    on: {
//                      'on-blur': (event) => {
//                        this.operatorListData[params.index].baseAmount = event.target.value;
//                        this.operatorListDataCalculate(params.index, 1, event.target.value);
//                      }
//                    }
//                  }, params.row.baseAmount)
//                ]);
//              } else {
                return h('div', [
                  h('span', params.row.baseAmount)
                ]);
//              }
            }
          },
          {title: '企业比例', key: 'ratioCom', align: 'left',
            render: (h, params) => {
//              if (!this.inputDisabled) {
//                return h('div', [
//                  h('Input', {
//                    props: {value: params.row.ratioCom},
//                    on: {
//                      'on-blur': (event) => {
//                        this.operatorListData[params.index].ratioCom = event.target.value;
//                        this.operatorListDataCalculate(params.index, 2, event.target.value);
//                      }
//                    }
//                  }, params.row.ratioCom)
//                ]);
//              } else {
                return h('div', [
                  h('span', params.row.ratioCom)
                ]);
//              }
            }
          },
          {title: '个人比例', key: 'ratioEmp', align: 'left',
            render: (h, params) => {
//              if (!this.inputDisabled) {
//                return h('div', [
//                  h('Input', {
//                    props: {value: params.row.ratioEmp},
//                    on: {
//                      'on-blur': (event) => {
//                        this.operatorListData[params.index].ratioEmp = event.target.value;
//                        this.operatorListDataCalculate(params.index, 3, event.target.value);
//                      }
//                    }
//                  }, params.row.ratioEmp)
//                ]);
//              } else {
                return h('div', [
                  h('span', params.row.ratioEmp)
                ]);
//              }
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
                        this.operatorListData[params.index].amount = event.target.value;
                        this.operatorListDataAmount(event.target.value);
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
          {
            title: '补缴原因', key: 'repairReason', align: 'left',
            render: (h, params) => {
              if (this.operatorListData[params.index].remitWay == 2) {
                return h('div', [
                  h('Select', {
                      props: {value: params.row.repairReason, disabled: this.inputDisabled},
                      on: {
                        'on-change': (event) => {
                          this.operatorListData[params.index].repairReason = event
                        }
                      }
                    },
                    [
                      this.repairReason.map((item) => h('Option', {props: {value: item.key}}, item.value))
                    ]
                  )
                ]);
              } else {
                return h('div', [
                  h('span', '')
                ]);
              }
            }
          },
          {title: '操作', width: 65, align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled && this.operatorListData.length == 1 && this.operatorListData[params.index].remitWay != 2) {
                return h('div', [
                  h('Button', {
                    props: {size: 'small', shape: 'circle', icon: 'plus'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        this.addOperatorListData()
                      }
                    }
                  })
                ]);
              } else if (!this.inputDisabled && this.operatorListData.length == 2 && this.operatorListData[params.index].remitWay == 2) {
                return h('div', [
                  h('Button', {
                    props: {size: 'small', shape: 'circle', icon: 'minus'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {
                        this.operatorListData.splice(1, 1)
                      }
                    }
                  })
                ]);
              } else {
                return h('div', [
                  h('span', '')
                ]);
              }
            }
          },
        ],

        taskListNotesColumns: [
          {title: '公积金类型', key: 'hfTypeName', align: 'left'},
          {title: '任务类型', key: 'taskCategoryName', align: 'left'},
          {title: '办理/批退', key: 'taskStatusName', align: 'left'},
          {title: '备注人', key: 'modifiedBy', align: 'left'},
          {title: '备注时间', key: 'modifiedTime', align: 'left'},
          {title: '备注内容', key: 'remark', align: 'left'}
        ],
        taskListNotesChangeData: [],

        transferOutUnitList: [],
        transferInUnitList: [],
        transferUnitDictList: [],
        transferOutUnitAccountList: [],
        transferInUnitAccountList: [],
        transferNotice: {
          transferOutUnit: '',
          transferOutUnitAccount: '',
          transferInUnit: '',
          transferInUnitAccount: '',
          transferDate: '',
          empTaskId: '',
          companyId: '',
          employeeId: '',
          hfType: '',
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
//          hfEmpAccount: '',
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
      let empTaskId = localStorage.getItem('employeeFundCommonOperator.empTaskId');
      let hfType = localStorage.getItem('employeeFundCommonOperator.hfType');
      let taskCategory = localStorage.getItem('employeeFundCommonOperator.taskCategory');
      let taskStatus = localStorage.getItem('employeeFundCommonOperator.taskStatus');
      api.empTaskHandleDataQuery({
        empTaskId: empTaskId,
        hfType: hfType,
        taskStatus: taskStatus
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
          this.inputDisabled = true;
          this.taskCategoryDisable = true;
          this.showButton = false;
        }
      });
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.taskCategoryList = data.data.HFLocalTaskCategory;
          this.operationRemindList = data.data.OperationRemind;
          this.transferUnitDictList = data.data.FundOutUnit;
          this.repairReason = data.data.RepairReason;
          this.transferUnitDictList.forEach((element, index, array) => {
            this.transferOutUnitList.push(element);
            this.transferInUnitList.push(element);
          })
          if (taskCategory > 2) {
            this.taskCategoryDisable = true;
          } else {
            this.taskCategoryDisable = false;
            this.taskCategoryList.splice(2, this.taskCategoryList.length - 2);
          }
        } else {
          this.$Message.error(data.message);
          this.inputDisabled = true;
          this.taskCategoryDisable = true;
          this.showButton = false;
        }
      })
    },
    computed: {
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      addOperatorListData() {
        let startMonth = this.displayVO.startMonth;
        let endMonth = api.minusMonths(this.operatorListData[0].startMonth, 1);
        if (startMonth > endMonth) {
          startMonth = '';
        }
        let hfMonth;
        if (this.displayVO.hfType == 1) {
          hfMonth = this.displayVO.basicComHfMonth;
        } else {
          hfMonth = this.displayVO.addedComHfMonth;
        }

        this.operatorListData.push({
          remitWay: 2,
          remitWayName: '补缴',
          startMonth: startMonth,
          endMonth: endMonth,
          hfMonth: hfMonth,
          baseAmount: this.operatorListData[0].baseAmount,
          ratioCom: this.operatorListData[0].ratioCom,
          ratioEmp: this.operatorListData[0].ratioEmp,
          amount: this.operatorListData[0].amount,
          repairReason: ''
        })
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

        if (!this.inputDataCheck()) {
          return false;
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
        if (!this.displayVO.rejectionRemark || this.displayVO.rejectionRemark == '') {
          this.$Message.error("批退备注不能为空");
          return false;
        }
        if (this.displayVO.rejectionRemark && this.displayVO.rejectionRemark.length > 200) {
          this.$Message.error("批退备注长度不能超过200");
          return false;
        }
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
        api.empTaskHandleCancel(
          [this.displayVO.empTaskId]
        ).then(data => {
          if (data.code == 200) {
            this.$Message.info("撤销成功");
            this.showButton = false;
            this.showCancel = false;
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      setInputData() {
        this.inputData.empTaskId = this.displayVO.empTaskId;
        this.inputData.taskCategory = this.displayVO.taskCategory;
//        this.inputData.hfEmpAccount = this.displayVO.hfEmpAccount;
//        if (this.displayVO.startMonth) {
//          this.inputData.startMonth = utils.formatDate(this.displayVO.startMonth,"YYYYMM");
//        }
        this.inputData.operationRemind = this.displayVO.operationRemind;
        if (this.displayVO.operationRemindDate) {
          this.inputData.operationRemindDate = this.$utils.formatDate(this.displayVO.operationRemindDate, "YYYY-MM-DD");
        }
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

        if (!this.inputDataCheck()) {
          return false;
        }

        api.empTaskHandleDataSave(params).then(data => {
          if (data.code == 200) {
            this.$Message.info("保存成功");
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      inputDataCheck() {
        if (this.displayVO.taskCategory != 1 &&(!this.displayVO.hfEmpAccount || this.displayVO.hfEmpAccount == '')) {
          this.$Message.error("公积金账户不能为空");
          return false;
        }
//        if (this.inputData.hfEmpAccount && this.inputData.hfEmpAccount.length > 20) {
//          this.$Message.error("公积金账户长度不能超过20");
//          return false;
//        }
//        if (this.displayVO.taskCategory == 1 && this.inputData.hfEmpAccount && this.inputData.hfEmpAccount != '') {
//          this.$Message.error("新增（新开）类型公积金账户不存在");
//          return false;
//        }
        if (this.inputData.handleRemark && this.inputData.handleRemark.length > 200) {
          this.$Message.error("办理备注长度不能超过200");
          return false;
        }
        if (this.inputData.rejectionRemark && this.inputData.rejectionRemark.length > 200) {
          this.$Message.error("批退备注长度不能超过200");
          return false;
        }
        return this.operatorListDataCheck();
      },
      operatorListDataCalculate(index, type, val) {
        let baseAmountReg = /(^[1-9]([0-9]{1,10})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;
        let ratioReg = /(^(0){1}$)|(^[0-9].[0-9]([0-9]{1,3})?$)/;
        if (type == 1 && val!='' && !baseAmountReg.test(val)) {
          this.$Message.error("操作栏基数输入格式有误");
          return false;
        }
        if (type == 2 && val!='' && !ratioReg.test(val)) {
          this.$Message.error("操作栏企业比例输入格式有误");
          return false;
        }
        if (type == 3 && val!='' && !ratioReg.test(val)) {
          this.$Message.error("操作栏个人比例输入格式有误");
          return false;
        }

        if (this.operatorListData[index].baseAmount && this.operatorListData[index].baseAmount != ''
          && this.operatorListData[index].ratioCom && this.operatorListData[index].ratioCom != ''
          && this.operatorListData[index].ratioEmp && this.operatorListData[index].ratioEmp != '') {
          let baseAmountFloat = parseFloat(this.operatorListData[index].baseAmount);
          let ratioComFloat = parseFloat(this.operatorListData[index].ratioCom);
          let ratioEmpFloat = parseFloat(this.operatorListData[index].ratioEmp);
          let amountFloat = baseAmountFloat*(ratioComFloat + ratioEmpFloat);
          this.operatorListData[index].amount = amountFloat.toFixed(2);
        }
      },
      operatorListDataAmount(val) {
        let amountReg = /(^[1-9]([0-9]{1,6})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;
        if (!amountReg.test(val)) {
          this.$Message.error("操作栏金额输入格式有误");
          return false;
        }
      },
      operatorListDataCheck() {
        let baseAmountReg = /(^[1-9]([0-9]{1,10})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;
        let ratioReg = /(^(0){1}$)|(^[0-9].[0-9]([0-9]{1,3})?$)/;
        let amountReg = /(^[1-9]([0-9]{1,6})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;
        let normalStartMonth;
        let repairEndMonth;

        for (let i = 0; i < this.operatorListData.length; i++) {
          if (!this.operatorListData[i].startMonth || this.operatorListData[i].startMonth == '') {
            this.$Message.error("操作栏起缴月份不能为空");
            return false;
          }
          if (this.operatorListData[i].remitWay != 2 && this.operatorListData[i].endMonth && this.operatorListData[i].endMonth != '') {
            this.$Message.error("操作栏非补缴状态费用段的截止月份必须为空");
            return false;
          }
          if (!this.operatorListData[i].hfMonth || this.operatorListData[i].hfMonth == '') {
            this.$Message.error("操作栏客户汇缴月不能为空");
            return false;
          }
          if (this.operatorListData[i].remitWay != 2 && this.operatorListData[i].startMonth != this.operatorListData[i].hfMonth) {
            this.$Message.error("操作栏非补缴状态费用段的起缴月份必须等于客户汇缴月");
            return false;
          }
          if (this.operatorListData[i].remitWay == 2 && (!this.operatorListData[i].endMonth || this.operatorListData[i].endMonth == '')) {
            this.$Message.error("操作栏补缴状态费用段的截止月份不能为空");
            return false;
          }
          if (this.operatorListData[i].remitWay == 2 && this.operatorListData[i].startMonth > this.operatorListData[i].endMonth) {
            this.$Message.error("操作栏补缴状态费用段的截止月份不能小于起缴月份");
            return false;
          }
          if (this.operatorListData[i].remitWay == 2 && this.operatorListData[i].endMonth != api.minusMonths(this.operatorListData[i].hfMonth, 1)) {
            this.$Message.error("操作栏补缴状态费用段的截止月份的次月必须等于客户汇缴月");
            return false;
          }
          if (this.displayVO.hfType == 1) {
            if (this.operatorListData[i].hfMonth < this.displayVO.basicComHfMonth) {
              this.$Message.error("操作栏客户汇缴月不能晚于末次汇缴月（基本）");
              return false;
            }
          } else {
            if (this.operatorListData[i].hfMonth < this.displayVO.addedComHfMonth) {
              this.$Message.error("操作栏客户汇缴月不能晚于末次汇缴月（补充）");
              return false;
            }
          }
          if (!this.operatorListData[i].baseAmount || this.operatorListData[i].baseAmount == '') {
            this.$Message.error("操作栏基数不能为空");
            return false;
          }
          if (!this.operatorListData[i].ratioCom || this.operatorListData[i].ratioCom == '') {
            this.$Message.error("操作栏企业比例不能为空");
            return false;
          }
          if (!this.operatorListData[i].ratioEmp || this.operatorListData[i].ratioEmp == '') {
            this.$Message.error("操作栏个人比例不能为空");
            return false;
          }
          if (!this.operatorListData[i].amount || this.operatorListData[i].amount == '') {
            this.$Message.error("操作栏金额不能为空");
            return false;
          }
          if (!baseAmountReg.test(this.operatorListData[i].baseAmount)) {
            this.$Message.error("操作栏基数输入格式有误");
            return false;
          }
          if (!ratioReg.test(this.operatorListData[i].ratioCom)) {
            this.$Message.error("操作栏企业比例输入格式有误");
            return false;
          }
          if (!ratioReg.test(this.operatorListData[i].ratioEmp)) {
            this.$Message.error("操作栏个人比例输入格式有误");
            return false;
          }
          if (!amountReg.test(this.operatorListData[i].amount)) {
            this.$Message.error("操作栏金额输入格式有误");
            return false;
          }
          if (this.operatorListData[i].remitWay == 2 && (!this.operatorListData[i].repairReason || this.operatorListData[i].repairReason == '')) {
            this.$Message.error("操作栏补缴状态费用段的补缴原因不能为空");
            return false;
          }
          if (this.operatorListData[i].remitWay != 2) {
            normalStartMonth = this.operatorListData[i].startMonth;
          } else {
            repairEndMonth = this.operatorListData[i].endMonth;
          }
//          if (!baseAmountReg.test(this.operatorListData[i].baseAmount)) {
//            this.$Message.error("操作栏基数输入格式有误");
//            return false;
//          }
//          if (!ratioReg.test(this.operatorListData[i].ratioCom)) {
//            this.$Message.error("操作栏企业比例输入格式有误");
//            return false;
//          }
//          if (!ratioReg.test(this.operatorListData[i].ratioEmp)) {
//            this.$Message.error("操作栏个人比例输入格式有误");
//            return false;
//          }
        }
        if (this.operatorListData.length > 1 && api.minusMonths(normalStartMonth, 1) != repairEndMonth) {
          this.$Message.error("操作栏费用段的缴纳时间段必须连续");
          return false;
        }
        return true;
      },
      transferNoticeCheck() {
        if (this.transferNotice.transferOutUnit && this.transferNotice.transferOutUnit.length > 20) {
          this.$Message.error("转出单位长度不能超过20");
          return false;
        }
        if (this.transferNotice.transferOutUnitAccount && this.transferNotice.transferOutUnitAccount.length > 20) {
          this.$Message.error("转出单位账号长度不能超过20");
          return false;
        }
        if (this.transferNotice.transferInUnit && this.transferNotice.transferInUnit.length > 20) {
          this.$Message.error("转入单位长度不能超过20");
          return false;
        }
        if (this.transferNotice.transferInUnitAccount && this.transferNotice.transferInUnitAccount.length > 20) {
          this.$Message.error("转入单位账号长度不能超过20");
          return false;
        }
        return true;
      },
      transEmpTaskQuery() {
        api.transEmpTaskQuery({
          companyId: this.displayVO.companyId,
          employeeId: this.displayVO.employeeId,
          hfType: this.displayVO.hfType,
        }).then(data => {
          if (data.code == 200) {
            if (!data.data || data.data.length == 0) {
              this.isShowPrint = true;
            } else {
              // TODO show print page
              console.log(data.data);
            }
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      ok () {
        this.transferNotice.empTaskId = this.displayVO.empTaskId;
        this.transferNotice.companyId = this.displayVO.companyId;
        this.transferNotice.employeeId = this.displayVO.employeeId;
        this.transferNotice.hfType = this.displayVO.hfType;
        if (this.transferNotice.transferDate) {
          this.transferNotice.transferDate = this.$utils.formatDate(this.transferNotice.transferDate, "YYYY-MM-DD");
        }
        if (!this.transferNoticeCheck()) {
          return false;
        }
        api.createTransEmpTask(
          this.transferNotice
        ).then(data => {
          if (data.code == 200) {
            this.transferOutUnitList.length = 0;
            this.transferInUnitList.length = 0;
            this.transferOutUnitAccountList.length = 0;
            this.transferInUnitAccountList.length = 0;
            this.transferNotice.transferOutUnit = '';
            this.transferNotice.transferOutUnitAccount = '';
            this.transferNotice.transferInUnit = '';
            this.transferNotice.transferInUnitAccount = '';
            this.transferNotice.transferDate = '';

            // TODO show print page
            this.isShowPrint = false;
            console.log(data.data);
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      cancel() {
        this.transferOutUnitList.length = 0;
        this.transferInUnitList.length = 0;
        this.transferOutUnitAccountList.length = 0;
        this.transferInUnitAccountList.length = 0;
        this.transferNotice.transferOutUnit = '';
        this.transferNotice.transferOutUnitAccount = '';
        this.transferNotice.transferInUnit = '';
        this.transferNotice.transferInUnitAccount = '';
        this.transferNotice.transferDate = '';
        this.isShowPrint = false;
      },
    },
  }
</script>
