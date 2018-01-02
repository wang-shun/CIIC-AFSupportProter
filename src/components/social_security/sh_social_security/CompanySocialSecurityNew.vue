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
          <social-security-operator :operatorType='operatorType' :empTaskId="empTaskId"
                                    ref="ssOperator"></social-security-operator>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
      <Button type="primary" v-show="operatorType !== '2'" @click="instance('save')">暂存</Button>
      <Button type="primary" @click="instance('success')" v-if="operatorType !== '2'">办理</Button>
      <Button type="primary" @click="instance('success')" v-else>办理</Button>
      <Button type="error" @click="instance('error')">批退</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import companyInfo from '../components/CompanyInfo.vue'
  import employeeInfo from '../components/EmployeeInfo.vue'

  import taskRefrenceInfo from './taskRefrenceInfo.vue'
  import socialSecurityOperator from '../../commoncontrol/socialsecurityoperator.vue'
  import EventTypes from '../../../store/EventTypes'
  import api from '../../../api/social_security/employee_operator'

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
      instance(type) {
        let title = '';
        const content = '<p>点击确定后，将自动返回查询列表</p>';
        switch (type) {
          case 'info':
            title = '办理操作成功！'
            this.$Modal.info({
              title: title,
              content: content
            });

            break;
          case 'success':
            let self = this;
            title = '<p>确认操作成功！</p>'
            self.$Modal.success({
              title: title,
              content: content,
              okText: '确定',
              onOk: function () {
                //self.$Modal.remove();
                history.go(-1);
              },
              error: function (error) {
                self.$Message.error('停用失败!');
                self.$Modal.remove();
              }
            });
            break;
          case 'warning':
            title = '办理操作成功！'
            self.$Modal.warning({
              title: title,
              content: content
            });

            break;
          case 'error':
            this.$Message.success({
              content: '批退操作成功！',
              duration: 0.8
            });

            break;
          case 'save':
            /*
            title = '暂存操作成功！'
            this.$Message.success({
              content: '暂存操作成功!',
              duration: 0.8
            })
*/
            var data = this.ssOperator.getData();
            var fromData = data.form;

          {// 处理日期
            fromData.handleMonth = this.$utils.formatDate(fromData.handleMonth, 'YYYYMM')
            fromData.startMonth = this.$utils.formatDate(fromData.startMonth, 'YYYYMM')
            fromData.endMonth = this.$utils.formatDate(fromData.endMonth, 'YYYYMM')
            fromData.handleRemarkDate = null;
            fromData.rejectionRemarkDate = null;
          }
            fromData.empTaskPeriods = data.data;
            api.handleEmpTask(fromData)
            console.log(JSON.stringify(fromData));
            break;
        }
      }
    }
  }
</script>
