<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业公积金账户信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
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
                <label>{{displayVO.serviceCenter}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客服经理：">
                <label>{{displayVO.leaderShipName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户专员：">
                <label>{{displayVO.createdDisplayName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="末次汇缴月（基本）：">
                <label>{{displayVO.empBasLastMonth}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="末次汇缴月（补充）：">
                <label>{{displayVO.empAddLastMonth}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="缴费区县：">
                <label>{{displayVO.paymentBankName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="每月关账日：">
                <label>{{displayVO.closeDay}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="付款方式：">
                <label>{{displayVO.paymentWayName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业公积金账户状态：">
                <label>{{displayVO.stateName}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="公积金企业U盾：">
                <label>{{displayVO.ukeyStoreName}}</label>
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
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        雇员公积金账户信息
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
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="离职日期：">
                {{(displayVO.outDate)?this.$utils.formatDate(displayVO.outDate, "YYYY-MM-DD"):""}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="缴纳至：">
                <label>{{displayVO.empBasEndMonth}}</label>
              </FormItem>
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
              <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转入实际年月：">
                <label>{{displayVO.empBasStartMonth}}</label>
              </FormItem>
              </Col> -->
              <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转入汇缴月：">
                <label>{{displayVO.empBasHandleMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转出实际年月：">
                <label>{{displayVO.empBasEndMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转出汇缴月：">
                <label>{{displayVO.empBasStopHandleMonth}}</label>
              </FormItem>
              </Col> -->
            </Row>
            <Row>
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
            <!-- <Row>
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
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="缴纳至：">
                <label>{{displayVO.empAddEndMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转入实际年月：">
                <label>{{displayVO.empAddStartMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转入汇缴月：">
                <label>{{displayVO.empAddHandleMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转出实际年月：">
                <label>{{displayVO.empAddEndMonth}}</label>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="转出汇缴月：">
                <label>{{displayVO.empAddStopHandleMonth}}</label>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}">
              <Table border :columns="fundColumns" :data="addedFundData"></Table>
              </Col>
            </Row> -->
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <Form :label-width=150>
            <Row type="flex" justify="start">
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="离职日期：">
                {{(displayVO.outDate)?this.$utils.formatDate(displayVO.outDate, "YYYY-MM-DD"):""}}
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="汇缴截止月份：">
                {{displayVO.endMonth}}
              </FormItem>
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
              <FormItem label="办理类型：">
                <Select v-model="displayVO.taskCategory" style="width: 100%;" transfer :disabled="taskCategoryDisable">
                  <Option v-for="item in taskCategoryList" :value="item.key" :key="item.key">{{item.value}}</Option>
                </Select>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <FormItem label="汇缴截止月份">
                <DatePicker type="month" v-model="inputData.endMonth" format="yyyyMM" placement="bottom-end" placeholder="选择年月" style="width: 100%;" transfer :disabled="inputDisabled"></DatePicker>
              </FormItem>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户汇缴月份：">
                <DatePicker type="month" v-model="inputData.hfMonth" format="yyyyMM" placement="bottom-end" placeholder="选择年月" style="width: 100%;" transfer :disabled="inputDisabled"></DatePicker>
              </Form-item>
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
        历史任务单
        <div slot="content">
          <origin-emp-task-info></origin-emp-task-info>
        </div>
      </Panel>
      <!--<Panel name="5">-->
        <!--任务单备注-->
        <!--<div slot="content">-->
          <!--<Table border :columns="taskListNotesColumns" :data="taskListNotesChangeData"></Table>-->
        <!--</div>-->
      <!--</Panel>-->
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="primary" @click="handleTask" v-if="showButton" :loading="isLoading">已处理</Button>
        <Button type="primary" class="ml10" @click="notHandleTask" v-if="showButton" :loading="isLoading">不需处理</Button>
        <Button type="primary" class="ml10" @click="handleTaskDelay" v-if="showButton && false" :loading="isLoading">转下月处理</Button>
        <!--<Button type="error" class="ml10" @click="handleTaskReject" v-if="showButton">批退</Button>-->
        <Button type="primary" class="ml10" @click="saveTask" v-if="showButton" :loading="isLoading">保存</Button>
        <!--<Button type="primary" class="ml10" @click="handleTaskCancel" v-if="showCancel">撤销</Button>-->
        <Button type="warning" class="ml10" @click="back">返回</Button>
      </Col>
    </Row>

  </div>
</template>
<script>
import {localStorage, sessionStorage} from '../../../../assets/api/storage'
  import api from '../../../../api/house_fund/employee_task_handle/employee_task_handle'
  import dict from '../../../../api/dict_access/house_fund_dict'
  import originEmpTaskInfo from './OriginEmpTaskInfo.vue'

  export default {
    components: {originEmpTaskInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4, 5], //展开栏
        showButton: true,
        showCancel: false,
        inputDisabled: false,
        isShowPrint: false,
        isLoading: false,
        displayVO: {
          empTaskId: 0,
          taskCategory: 0,
//          taskCategoryName: '补缴',
          basicHfComAccount: '',
          addedHfComAccount: '',
          serviceCenter: '',
          paymentBankName: '',
          ukeyStoreName: '',
          stateName: '',
          hfMonth: '',
          basicComHfMonth: '',
          addedComHfMonth: '',
          leaderShipName: '',
          createdDisplayName: '',
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
          basicArchiveStatusName: '',
          basicEmpTaskStatusName: '',
          basicEmpStartMonth: '',
          basicEmpEndMonth: '',
          basicEmpAmount: '',
          basicEmpBase: '',
          basicRatioCom: '',
          basicRatioEmp: '',
          addedHfEmpAccount: '',
          addedArchiveStatusName: '',
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
          endMonth: '',
          handleRemark: '',
          rejectionRemark: '',

//          operationRemind: '',
//          operationRemindDate: '',
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
        taskListNotesColumns: [
          {
            title: '任务单ID', key: 'empTaskId', align: 'center', width: 100,
            render: (h, params) => {
              return h('a', {
                style: {textAlign: 'right'},
                on:{
                  click:()=>{
                    this.routerMethod(params)
                  }
                }
              }, params.row.empTaskId);
            }
          },
          {title: '公积金类型', key: 'hfTypeName', align: 'left'},
          {title: '任务类型', key: 'taskCategoryName', align: 'left'},
          {title: '办理/批退', key: 'taskStatusName', align: 'left'},
          {title: '备注人', key: 'modifiedDisplayName', align: 'left'},
          {title: '备注时间', key: 'modifiedTimeFormat', align: 'left'},
          {title: '备注内容', key: 'remark', align: 'left'}
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
          endMonth: '',
          hfMonth: '',
//          startMonth: '',
//          operationRemind: '',
//          operationRemindDate: '',
          operatorListData: [],
          handleRemark: '',
          rejectionRemark: ''
        },
      }
    },
    mounted() {
      let empTaskId = localStorage.getItem('employeeFundCommonOperator.empTaskId');
      let hfType = parseInt(localStorage.getItem('employeeFundCommonOperator.hfType'));
      let taskCategory = parseInt(localStorage.getItem('employeeFundCommonOperator.taskCategory'));
      let taskStatus = parseInt(localStorage.getItem('employeeFundCommonOperator.taskStatus'));
      api.empTaskHandleDataQuery({
        empTaskId: empTaskId,
        hfType: hfType,
        taskStatus: taskStatus
      }).then(data => {
        if (data.code == 200) {
          this.displayVO = data.data;
          if (!data.data.empTaskPeriods || data.data.empTaskPeriods.length === 0) {
            if (hfType == 1) {
              this.displayVO.hfMonth = this.displayVO.basicComHfMonth;
            } else {
              this.displayVO.hfMonth = this.displayVO.addedComHfMonth;
            }
          } else {
            this.displayVO.hfMonth = data.data.empTaskPeriods[0].hfMonth;
          }
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
          if (this.operatorListData && this.operatorListData.length == 1) {
            this.inputData.endMonth = this.operatorListData[0].endMonth;
            this.inputData.hfMonth = this.operatorListData[0].hfMonth;
          }
          if (!this.inputData.endMonth || this.inputData.endMonth == '') {
            this.inputData.endMonth = this.displayVO.endMonth;
          }
          if (!this.inputData.hfMonth || this.inputData.hfMonth == '') {
            this.inputData.hfMonth = this.displayVO.hfMonth;
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
//          this.operationRemindList = data.data.OperationRemind;
//          this.transferOutUnitList = data.data.FundOutUnit;
          if (taskCategory >= 12 || taskCategory == 4 || taskCategory == 5) {
            this.taskCategoryDisable = false;

            if (taskCategory >= 12) {
              this.taskCategoryList.splice(this.taskCategoryList.length - 1, 1);
              this.taskCategoryList.splice(0, 11);
            } else {
              this.taskCategoryList.splice(5, this.taskCategoryList.length - 5);
              this.taskCategoryList.splice(0, 3);
            }
          } else {
            this.taskCategoryDisable = true;
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
//        this.$router.go(-1)
        this.$router.push({name: 'employeeFundCommonOperator'});
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
        this.isLoading = true;
        api.empTaskHandle(params).then(data => {
          if (data.code == 200) {
            this.$Message.info("办理成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
          this.isLoading = false;
        })
      },
      notHandleTask() {
        this.isLoading = true;
        api.empTaskNotHandle({
          empTaskId: this.displayVO.empTaskId
        }).then(data => {
          if (data.code == 200) {
            this.$Message.info("不需处理操作成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
          this.isLoading = false;
        })
      },
      handleTaskDelay() {
        this.isLoading = true;
        api.empTaskHandleDelay({
          empTaskId: this.displayVO.empTaskId
        }).then(data => {
          if (data.code == 200) {
            this.$Message.info("转下月处理操作成功");
            this.showButton = false;
          } else {
            this.$Message.error(data.message);
          }
          this.isLoading = false;
        })
      },
      handleTaskReject() {
        if (!this.displayVO.rejectionRemark || this.displayVO.rejectionRemark.trim() == '') {
          this.$Message.error("批退备注不能为空");
          return false;
        }
        this.displayVO.rejectionRemark = this.displayVO.rejectionRemark.trim();
        if (this.displayVO.rejectionRemark.length > 200) {
          this.$Message.error("批退备注长度不能超过200");
          return false;
        }
        this.isLoading = true;
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
          this.isLoading = false;
        })
      },
      handleTaskCancel() {
        this.isLoading = true;
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
          this.isLoading = false;
        })
      },
      filterMethod(value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      setInputData() {
        this.inputData.empTaskId = this.displayVO.empTaskId;
        this.inputData.taskCategory = this.displayVO.taskCategory;
//        this.inputData.operationRemind = this.displayVO.operationRemind;
//        if (this.displayVO.operationRemindDate) {
//          this.inputData.operationRemindDate = utils.formatDate(this.displayVO.operationRemindDate,"YYYY-MM-DD");
//        }
        this.inputData.handleRemark = this.displayVO.handleRemark;
        this.inputData.rejectionRemark = this.displayVO.rejectionRemark;
        if (this.inputData.endMonth) {
          this.inputData.endMonth = this.$utils.formatDate(this.inputData.endMonth, "YYYYMM");
        }
        if (this.inputData.hfMonth) {
          this.inputData.hfMonth = this.$utils.formatDate(this.inputData.hfMonth, "YYYYMM");
        }
//        this.inputData.hfMonth = this.displayVO.hfMonth;
//        this.inputData.operatorListData = this.operatorListData;
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
        this.isLoading = true;
        api.empTaskHandleDataSave(params).then(data => {
          if (data.code == 200) {
            this.$Message.info("保存成功");
          } else {
            this.$Message.error(data.message);
          }
          this.isLoading = false;
        })
      },
      inputDataCheck() {
        if (!this.inputData.endMonth || this.inputData.endMonth == '') {
          this.$Message.error("汇缴截止月份不能为空");
          return false;
        }
        if (this.inputData.endMonth && this.inputData.endMonth != api.minusMonths(this.inputData.hfMonth, 1)) {
          this.$Message.error("客户汇缴月必须为汇缴截止缴费月的下一月");
          return false;
        }
        if (this.inputData.handleRemark && this.inputData.handleRemark.length > 200) {
          this.$Message.error("办理备注长度不能超过200");
          return false;
        }
        if (this.inputData.rejectionRemark && this.inputData.rejectionRemark.length > 200) {
          this.$Message.error("批退备注长度不能超过200");
          return false;
        }
        return true;
      },
      routerMethod(params) {
        let currentTaskCategory = localStorage.getItem('employeeFundCommonOperator.taskCategory');
        localStorage.setItem('employeeFundCommonOperator.empTaskId', params.row.empTaskId);
        localStorage.setItem('employeeFundCommonOperator.hfType', params.row.hfType);
        localStorage.setItem('employeeFundCommonOperator.taskCategory', params.row.taskCategory);
        localStorage.setItem('employeeFundCommonOperator.processCategory', params.row.processCategory);
        localStorage.setItem('employeeFundCommonOperator.taskStatus', params.row.taskStatus);
        if (currentTaskCategory === params.row.taskCategory) {
          location.reload()
        } else {
          switch (params.row.taskCategory) {
            case '1':
            case '2':
            case '3':
            case '9':
            case '10':
            case '11':
            case '99':
              this.$router.push({name: 'employeeFundCommonOperatorInTaskHandle'});
              break;
            case '4':
            case '5':
            case '12':
            case '13':
              this.$router.push({name: 'employeeFundCommonOperatorOutTaskHandle'});
              break;
            case '6':
              this.$router.push({name: 'employeeFundCommonOperatorRepairTaskHandle'});
              break;
            case '7':
              this.$router.push({name: 'employeeFundCommonOperatorAdjustTaskHandle'});
              break;
            default:
              break;
          }
        }
      }
    }
  }
</script>
