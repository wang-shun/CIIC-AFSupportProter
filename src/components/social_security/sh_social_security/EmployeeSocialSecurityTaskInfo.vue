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
          <Form :label-width=150 v-model="socialSecurityPayOperator" ref="handleWay">
            <Row class="mt20" type="flex" justify="start">
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="办理方式：" prop="handleWay">
                <label>{{socialSecurityPayOperator.handleWay=='1'?'网上申报':socialSecurityPayOperator.handleWay=='2'?'柜面办理':''}}</label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="办理月份：" prop="handleMonth">
                <label>{{socialSecurityPayOperator.handleMonth}}</label>
            </Form-item>
            </Col>
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
            <Form-item label="变更类型：" prop="taskCategory">
                <label>{{getChangeType(socialSecurityPayOperator.taskCategory)}}</label>
            </Form-item>
            </Col>
            <!-- 仅新增 -->
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0'">
            <Form-item label="社保序号：" prop="empSsSerial">
                <Input v-model="socialSecurityPayOperator.empSsSerial" placeholder="请输入..."></Input>
            </Form-item>
            </Col>
            <!-- 仅转出 -->
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '2'">
            <Form-item label="特殊变更类型：" prop="taskCategorySpecial">
                <Select v-model="socialSecurityPayOperator.taskCategorySpecial" style="width: 100%;" transfer>
                <Option v-for="item in specialChangeType" :value="item.value" :key="item.value">
                    {{item.label}}
                </Option>
                </Select>
            </Form-item>
            </Col>
            <!-- 仅新增 -->
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0'">
            <Form-item label="起缴月份：" prop="startMonth">
                <DatePicker v-model="socialSecurityPayOperator.startMonth" type="month" placeholder="选择年月" style="width: 100%;"
                            transfer></DatePicker>
            </Form-item>
            </Col>
            <!-- 仅转出 -->
            <!-- 仅新增 -->
            <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="operatorType === '0' || operatorType === '2'">
            <Form-item label="截至月份：" prop="endMonth">
                <DatePicker v-model="socialSecurityPayOperator.endMonth" type="month" placement="bottom-end" placeholder="选择日期"
                            style="width: 100%;" transfer></DatePicker>
            </Form-item>
            </Col>
            </Row>
            <Row class="mt20">
            <Col :sm="{span:24}" v-if="operatorType !== '2'">
            <Table border width="100%" :columns="operatorListColumns"
                    :data="operatorListData"></Table>
            </Col>
            </Row>
            <Row class="mt20">
            <Col span="16">
            <Form-item label="办理备注：" prop="handleRemark">
                <label>{{socialSecurityPayOperator.handleRemark}}</label>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item label="备注人：">
                 <label>{{socialSecurityPayOperator.handleRemarkMan}}</label>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item label="备注时间：">
                 <label>{{socialSecurityPayOperator.handleRemarkDate}}</label>
            </Form-item>
            </Col>
            <Col span="16">
            <Form-item label="批退备注：" prop="rejectionRemark">
                <label>{{socialSecurityPayOperator.rejectionRemark}}</label>
                
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item label="备注人：">
                <label>{{socialSecurityPayOperator.rejectionRemarkMan}}</label>
            </Form-item>
            </Col>
            <Col span="4">
            <Form-item label="备注时间：">
                <label>{{socialSecurityPayOperator.rejectionRemarkDate}}</label>
            </Form-item>
            </Col>
            </Row>
        </Form>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
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
        empArchiveId:this.$route.query.empArchiveId,
        currentIndex: this.$route.params.index,
        operatorType: '',
        sourceFrom: '',
        collapseInfo: [1, 2, 3, 4],
        employee: {},
        company: {},

        ssOperator: {},
         taskCategoryType: [
          {value: '1', label: '新进'},
          {value: '2', label: '转入'},
          {value: '3', label: '新进转出'},
          {value: '4', label: '转入转出'},
        ], //变更方式
        specialChangeType: [
          {value: 1, label: '退休'},
          {value: 2, label: '终止'}
        ], //特殊变更类型：

        operatorListColumns: [
          {
            title: '', key: 'remitWay', align: 'center', width: 100,
            render: (h, params) => {
                
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.remitWay=='1'?'正常':params.row.remitWay=='2'?'补缴':''),
              ]);
            }
          },
          {
            title: '起缴月份',
            key: 'startMonth',
            align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}},[
                  h('span', params.row.startMonth)
                  ]);
            }
          },
          {title: '截止月份', key: 'endMonth',align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          },
          {title: '基数',key: 'baseAmount',align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                  h('span',params.row.baseAmount)
                  ]);
            }
          }
        ],
        operatorListData: [
          {remitWay: '', startMonth: '', endMonth: '', baseAmount: ''}
        ],
        socialSecurityPayOperator: {
          handleWay: '1',
          handleMonth: '',
          taskCategory: '1',
          empSsSerial: '',
          startMonth: '',
          endMonth: '',
          rejectionRemark: '',
          handleRemark: '',
          handleRemarkMan: '',
          handleRemarkDate: '',
          rejectionRemark: '',
          rejectionRemarkMan: '',
          rejectionRemarkDate: '',

          taskStatus: '',
          empTaskId: '',
        }
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
        this.empTaskId = data.empTaskId;
        this.operatorType = data.operatorType;
        this.sourceFrom = data.sourceFrom;

        this.socialSecurityPayOperator.empTaskId = data.empTaskId;
        api.queryEmpTaskById({
          empTaskId:  data.empTaskId,
          operatorType: 1,// 任务单费用段
        }).then(data => {
          if (data.data.empTaskPeriods.length > 0) {
            this.operatorListData = data.data.empTaskPeriods;
          }
          this.$utils.copy(data.data, this.socialSecurityPayOperator);
        });

        api.queryEmpArchiveByEmpTaskId({empTaskId: this.empTaskId,operatorType:'6'}).then((data) => {
          this.employee = data.data;
        })
        api.queryComAccountByEmpTaskId({empTaskId: this.empTaskId,operatorType:'6'}).then((data) => {
          this.company = data.data;
        })
      },
      goBack() {
        this.sourceFrom !== 'search' ? this.$router.push({name: 'employeeoperatorview'}) : this.$router.push({name: 'employeesocialsecurityinfo',query:{empArchiveId:this.empArchiveId}});
      },
      getChangeType(val){
          if(val==null || typeof(val)=='undefined'){
              return ''
          }
          return this.$decode.taskCategory(val)
      }

    }
  }
</script>
