<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户基本公积金账号：">
                <label>{{displayVO.basicHfComAccount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户补充公积金账号：">
                <label>{{displayVO.addedHfComAccount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户中心：">
                <label>{{displayVO.customerCenter}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="缴费区县：">
                <label>{{displayVO.paymentBankName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业公积金账户状态：">
                <label>{{displayVO.stateName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="末次汇缴月（基本）：">
                <label>{{displayVO.basicComHfMonth}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="末次汇缴月（补充）：">
                <label>{{displayVO.addedComHfMonth}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客服经理：">
                <label>{{displayVO.serviceManager}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户专员：">
                <label>{{displayVO.customerServicer}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="截单年月（基本）：">
                <label>{{displayVO.basicEndMonth}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="截单年月（补充）：">
                <label>{{displayVO.addedEndMonth}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="付款方式：">
                <label>{{displayVO.paymentWayName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公积金企业U盾：">
                <label>{{displayVO.ukeyStoreName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：">
                <label>{{displayVO.companyId}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：">
                <label>{{displayVO.companyName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业账户类型：">
                <label>{{displayVO.hfAccountTypeName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业公积金账号名称：">
                <label>{{displayVO.comAccountName}}
                  <span style="color: red">{{displayVO.comTaskStatusName}}</span>
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
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：">
                <label>{{displayVO.employeeId}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：">
                <label>{{displayVO.employeeName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="证件号码：">
                <label>{{displayVO.idNum}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="入职日期：">
                <label>{{displayVO.inDate}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="基本公积金账号：">
                <label>{{displayVO.basicHfEmpAccount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="基本公积金状态：">
                <label>{{displayVO.basicArchiveStatusName}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="fundColumns" :data="basicFundData"></Table>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="补充公积金账号：">
                <label>{{displayVO.addedHfEmpAccount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="补充公积金状态：">
                <label>{{displayVO.addedArchiveStatusName}}</label>
              </Form-item>
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
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="公积金基数：">
                {{displayVO.empBase}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="企业比例：">
                {{displayVO.ratioCom}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="个人比例：">
                {{displayVO.ratioEmp}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="补缴开始月份：">
                {{displayVO.startMonth}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="补缴截止月份：">
                {{displayVO.endMonth}}
              </FormItem>
              </Col>
            </Row>
            <!--<Row>-->
              <!--<Col :sm="{span: 24}">-->
              <!--<Table border :columns="taskReferenceInfoColumns" :data="taskReferenceInfoData"></Table>-->
              <!--</Col>-->
            <!--</Row>-->
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        操作
        <div slot="content">
          <Form :label-width=150>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公积金类型：">
                {{displayVO.hfTypeName}}
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务类型：">
                {{displayVO.taskCategoryName}}
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="操作提示：">
                <Select v-model="displayVO.operationRemind" style="width: 100%;" transfer :disabled="inputDisabled">
                  <Option value="" label="无"></Option>
                  <Option v-for="item in operationRemindList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="操作提示日期：">
                <DatePicker v-model="displayVO.operationRemindDate" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer :disabled="inputDisabled"></DatePicker>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户汇缴月份：">
                {{displayVO.hfMonth}}
              </Form-item>
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
          taskCategory: 6,
          taskCategoryName: '补缴',
          basicHfComAccount: '',
          addedHfComAccount: '',
          customerCenter: '',
          paymentBankName: '',
          ukeyStoreName: '',
          stateName: '',
          hfMonth: '',
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
          startMonth: '',
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
        operationRemindList: [],
        operationRemindDate: '',
        operatorListData: [],
        operatorListColumns: [
          {title: '补缴起始月份', key: 'startMonth', align: 'left',
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
                        this.operatorListDataCalculate(params.index, 0, val);
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
          {title: '补缴截至月份', key: 'endMonth', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('DatePicker', {
                    props: {value: params.row.endMonth, type: 'month', format: 'yyyyMM', placement: 'bottom-end', placeholder: '选择年月', style: 'width: 100%;', transfer: true},
                    on: {
                      'on-change': (val) => {
                        this.operatorListData[params.index].endMonth = val;
                        this.operatorListDataCalculate(params.index, 0, val);
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
//          {title: '客户汇缴月', key: 'hfMonth', align: 'left',
//            render: (h, params) => {
//              return h('div', [
//                h('Input', {
//                  props: {value: params.row.hfMonth},
//                  on: {
//                    'on-blur': (event) => {
//                      this.operatorListData[params.index].hfMonth = event.target.value
//                    }
//                  }
//                }, params.row.hfMonth)
//              ]);
//            }
//          },
          {title: '补缴基数', key: 'baseAmount', align: 'left',
            render: (h, params) => {
//              return h('div', [
//                h('Input', {
//                  props: {value: params.row.baseAmount},
//                  on: {
//                    'on-blur': (event) => {
//                      this.operatorListData[params.index].baseAmount = event.target.value;
//                      this.operatorListDataCalculate(params.index, 1, event.target.value);
//                    }
//                  }
//                }, params.row.baseAmount)
//              ]);
              return h('div', [
                h('span', params.row.baseAmount)
              ]);
            }
          },
          {title: '企业比例', key: 'ratioCom', align: 'left',
            render: (h, params) => {
//              return h('div', [
//                h('Input', {
//                  props: {value: params.row.ratioCom},
//                  on: {
//                    'on-blur': (event) => {
//                      this.operatorListData[params.index].ratioCom = event.target.value;
//                      this.operatorListDataCalculate(params.index, 2, event.target.value);
//                    }
//                  }
//                }, params.row.ratioCom)
//              ]);
              return h('div', [
                h('span', params.row.ratioCom)
              ]);
            }
          },
          {title: '个人比例', key: 'ratioEmp', align: 'left',
            render: (h, params) => {
//              return h('div', [
//                h('Input', {
//                  props: {value: params.row.ratioEmp},
//                  on: {
//                    'on-blur': (event) => {
//                      this.operatorListData[params.index].ratioEmp = event.target.value;
//                      this.operatorListDataCalculate(params.index, 3, event.target.value);
//                    }
//                  }
//                }, params.row.ratioEmp)
//              ]);
              return h('div', [
                h('span', params.row.ratioEmp)
              ]);
            }
          },
          {title: '每月金额', key: 'amount', align: 'left',
            render: (h, params) => {
              if (!this.inputDisabled) {
                return h('div', [
                  h('Input', {
                    props: {value: params.row.amount},
                    on: {
                      'on-blur': (event) => {
                        this.operatorListData[params.index].amount = event.target.value;
                        this.operatorListDataAmount(params.index, event.target.value);
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
          {title: '合计补缴金额', key: 'totalAmount', align: 'left'},
          {
            title: '补缴原因', key: 'repairReason', align: 'left',
            render: (h, params) => {
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
            }
          }
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
        taskCategoryDisable: false,
        taskCategoryList: [],
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
          startMonth: '',
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
          this.displayVO.taskCategoryName = '补缴';
          if (hfType == 1) {
            this.displayVO.hfMonth = this.displayVO.basicComHfMonth;
          } else {
            this.displayVO.hfMonth = this.displayVO.addedComHfMonth;
          }

          this.basicFundData = data.data.basicArchiveBasePeriods;
          this.addedFundData = data.data.addedArchiveBasePeriods;
          this.operatorListData = data.data.empTaskPeriods;
          this.operatorListData.forEach((element, index, arry) => {
            this.getTotalAmount(index);
          });
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
//          this.taskCategoryList = data.data.HFLocalTaskCategory;
          this.operationRemindList = data.data.OperationRemind;
          this.transferOutUnitList = data.data.FundOutUnit;
          this.repairReason = data.data.RepairReason;
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
        if (this.inputData.rejectionRemark && this.inputData.rejectionRemark.length > 200) {
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
        this.inputData.hfEmpAccount = this.displayVO.hfEmpAccount;
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
      operatorListDataCheck() {
        let baseAmountReg = /(^[1-9]([0-9]{1,10})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;
        let ratioReg = /(^(0){1}$)|(^[0-9].[0-9]([0-9]{1,3})?$)/;
        let amountReg = /(^[1-9]([0-9]{1,6})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;

        for (let i = 0; i < this.operatorListData.length; i++) {
          if (!this.operatorListData[i].startMonth || this.operatorListData[i].startMonth == '') {
            this.$Message.error("操作栏补缴起缴月份不能为空");
            return false;
          }
          if (!this.operatorListData[i].endMonth || this.operatorListData[i].endMonth == '') {
            this.$Message.error("操作栏补缴截止月份不能为空");
            return false;
          }
          if (this.operatorListData[i].endMonth < this.operatorListData[i].startMonth) {
            this.$Message.error("操作栏补缴截止月份不能小于补缴起缴月份");
            return false;
          }
          if (!this.displayVO.hfMonth || this.displayVO.hfMonth == '') {
            this.$Message.error("客户汇缴月不能为空");
            return false;
          }
          if (this.operatorListData[i].endMonth >= this.displayVO.hfMonth) {
            this.$Message.error("操作栏补缴截止月份必须小于客户汇缴月");
            return false;
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
          if (!this.operatorListData[i].repairReason || this.operatorListData[i].repairReason == '') {
            this.$Message.error("操作栏补缴原因不能为空");
            return false;
          }
        }
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
          this.getTotalAmount(index);
        }
      },
      getTotalAmount(index) {
        if (this.operatorListData[index].startMonth && this.operatorListData[index].startMonth != ''
          && this.operatorListData[index].endMonth && this.operatorListData[index].endMonth != ''
          && this.operatorListData[index].endMonth >= this.operatorListData[index].startMonth) {
          let months = this.getMonths(this.operatorListData[index].startMonth, this.operatorListData[index].endMonth);
          let totalAmount = (months+1)*this.operatorListData[index].amount;
          this.operatorListData[index].totalAmount = totalAmount.toFixed(2);
        }
      },
      operatorListDataAmount(index, val) {
        let amountReg = /(^[1-9]([0-9]{1,6})?(.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9].[0-9]([0-9])?$)/;
        if (!amountReg.test(val)) {
          this.$Message.error("操作栏金额输入格式有误");
          return false;
        }
        this.getTotalAmount(index);
      },
      getMonths(startYearMonth, endYearMonth) {
        let startYear = startYearMonth.substr(0,4);
        let endYear =  endYearMonth.substr(0,4);
        let startMonth = startYearMonth.substr(4,2);
        let endMonth = endYearMonth.substr(4,2);

        return (endYear-startYear)*12+(endMonth-startMonth);
      }
    }
  }
</script>
