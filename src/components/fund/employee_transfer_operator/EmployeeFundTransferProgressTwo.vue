<template>
  <Form :label-width=150>
 
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业账户信息
        <div slot="content">
         <Form :label-width='150'>
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
          <Form :label-width='150'>
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
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        转移操作
        <div slot="content">
          <Form label-width='150'>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：">
                  {{fundOperator.hfType}}
                </Form-item>
              </Col>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务：">
                  {{fundOperator.taskCategory}}
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位：">
                  <Select v-model="fundOperator.transferOutUnit" style="width: 100%;" transfer>
                    <!-- <Option v-for="item in transferOutList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转出单位账号：">
                  <Input v-model="fundOperator.transferOutUnitAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位：">
                  <Select v-model="fundOperator.transferInUnit" style="width: 100%;" transfer>
                    <!-- <Option v-for="item in transferInList" :value="item.value" :key="item.value">{{item.label}}</Option> -->
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入单位账号：">
                  <Input v-model="fundOperator.transferInUnitAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移日期：">
                  <DatePicker v-model="fundOperator.transferDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="回单日期：">
                  <DatePicker v-model="fundOperator.feedbackDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="操作日期：">
                  {{fundOperator.operateDate}}
                </Form-item>
              </Col>
              <!-- <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="打印日期：">
                  {{fundOperator.printDate}}
                </Form-item>
              </Col> -->
            </Row>
            <Row>
              <Col :sm="{span: 16}">
                <Form-item label="办理备注：">
                  <Input v-model="fundOperator.handleRemark" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
         </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="primary" @click="">保存</Button>
        <Button type="info" @click="">打印转移单</Button>
        <Button type="default">不需处理</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'
  import api from '../../../api/house_fund/employee_task/employee_transfer'
  export default {
    data() {
      return {
        currentStep: 2,
        collapseInfo: [1, 2, 3, 4], //展开栏
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
        fundOperator:{
          hfType:'',  
          taskCategory:'',
          transferInUnit:'',
          transferInUnitAccount:'',
          transferOutUnit:'',
          transferOutUnitAccount:'',
          transferDate:'',
          feedbackDate:'',
          operateDate:'',
          handleRemark:'',
        },
      }
    },
    mounted() {
      let params = {employeeId:this.$route.query.employeeId,
                    companyId:this.$route.query.companyId,
                    hfType:this.$route.query.hfType,
                    };
      api.queryComEmpTransferForm(params).then(data => {
        if (data.code == 200) {
          this.displayVO = data.data;
          
          this.operatorListData = data.data.empTaskPeriods;
          this.taskListNotesChangeData = data.data.empTaskRemarks;
          if (!this.displayVO.taskStatus || this.displayVO.taskStatus == 1) {
            this.inputDisabled = false;
          } else {
             
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
    },
    computed: {
      ...mapState('employeeFundTransferProgressTwo', {
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundTransferProgressTwo', [EventType.EMPLOYEEFUNDTRANSFERPROGRESSTWO]),
      nextStep() {
        this.$router.push({name: 'employeeFundSpecialProgressThree'});
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
