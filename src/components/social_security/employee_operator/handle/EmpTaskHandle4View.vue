<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-info :company="company"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :operatorType='operatorType' :employee="employee"></employee-info>
        </div>
      </Panel>
      <Panel name="3">
        任务单参考信息
        <div slot="content">
          <task-refrence-info :operatorType='operatorType' :taskNewInfo="data.taskNewInfo"
                              :taskNewInfoData="data.taskNewInfoData" :taskChangeInfo="data.taskChangeInfo"
                              :taskOutInfo="data.taskOutInfo"></task-refrence-info>
        </div>
      </Panel>
      <Panel name="4">
        <span v-if="operatorType === '0'">社保汇缴操作</span><span v-else-if="operatorType === '1'">社保调整操作</span><span v-else>社保转出操作</span>
        <div slot="content">
          <social-security-operator
            :operatorType='operatorType'
            :empTaskId="empTaskId"
            ref="ssOperator"></social-security-operator>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Button type="primary" @click="instance('1','next')">转下月处理</Button>
      <Button type="primary" @click="instance('5')">不需处理</Button>
      <Button type="primary" @click="instance('3')">办理</Button>
      <Button type="error" @click="instance('4')">批退</Button>
      <Button type="primary" v-show="operatorType !== '2'" @click="instance('1')">暂存</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import companyInfo from '../../components/CompanyInfo'
  import employeeInfo from '../../components/EmployeeInfo'

  import taskRefrenceInfo from '../../sh_social_security/taskRefrenceInfo'
  import socialSecurityOperator from '../../../commoncontrol/socialsecurityoperator'
  import EventTypes from '../../../../store/EventTypes'
  import api from '../../../../api/social_security/employee_operator'

  export default {
    components: {companyInfo, employeeInfo, taskRefrenceInfo, socialSecurityOperator},
    data() {
      return {
        empTaskId: '',
        currentIndex: this.$route.params.index,
        operatorType: '',
        sourceFrom: '',
        collapseInfo: [1, 2, 3, 4],
        employee: {},
        company: {},

        ssOperator: {},
      }
    },
    mounted() {
      this.ssOperator = this.$refs['ssOperator'];
      this.initData(this.$route.query)
      this[EventTypes.COMPANYSOCIALSECURITYNEWTYPE]()
    },
    computed: {
      ...mapState('companySocialSecurityNew', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('companySocialSecurityNew', [EventTypes.COMPANYSOCIALSECURITYNEWTYPE]),
      initData(data) {
        this.ssOperator.initData({
          empTaskId: data.empTaskId,
          operatorType: data.operatorType,
        })
        this.empTaskId = data.empTaskId;
        this.operatorType = data.operatorType;
        this.sourceFrom = data.sourceFrom;


        api.queryEmpArchiveByEmpTaskId({empTaskId: this.empTaskId}).then((data) => {
          this.employee = data.data;
        })
        api.queryComAccountByEmpTaskId({empTaskId: this.empTaskId}).then((data) => {
          this.company = data.data;
        })
      },
      goBack() {
        this.sourceFrom !== 'search' ? this.$router.push({name: 'employeeoperatorview'}) : this.$router.push({name: 'employeesocialsecurityinfo'});
      },
      yyyyMM(date){
        return this.$utils.formatDate(date, 'YYYYMM')
      },
      instance(taskStatus, type) {
        var data = this.ssOperator.getData();
        var fromData = data.form;

        // 办理状态：1、未处理 2 、处理中  3 已完成（已办） 4、批退 5、不需处理
        var content = "任务办理";
        if ('4' == taskStatus) {
          content = "批退办理";
        }
        this.$Modal.confirm({
          title: "确认办理吗？",
          content: content,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            {// 处理日期
              fromData.handleMonth = this.yyyyMM(fromData.handleMonth)
              fromData.startMonth = this.yyyyMM(fromData.startMonth)
              fromData.endMonth = this.yyyyMM(fromData.endMonth)
              fromData.handleRemarkDate = null;
              fromData.rejectionRemarkDate = null;
              fromData.taskStatus = taskStatus;
            }

            fromData.empTaskPeriods = data.data;
            api.handleEmpTask(fromData).then(data => {
              if (data.code == 200) {
                this.$Message.success(content + "成功");
                // 返回任务列表页面
                history.go(-1);
              } else {
                this.$Message.error(content + "失败！" + data.message);
              }
            })
          }
        });

      }
    }
  }
</script>
