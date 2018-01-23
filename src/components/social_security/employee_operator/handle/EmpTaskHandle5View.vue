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
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="用工状态:">
                <label></label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="离职日期：">
                <label>{{socialSecurityPayOperator.outDate}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保截止年月：">
                <label>{{yyyyMM(socialSecurityPayOperator.endMonth)}}</label>
              </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        社保转出操作
        <div slot="content">
          <Form ref="socialSecurityPayOperator" :model="socialSecurityPayOperator" :rules="ruleValidate" :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理方式：" prop="handleWay">
                <Select v-model="socialSecurityPayOperator.handleWay" style="width: 100%;" transfer>
                  <Option value="1" label="网上申报"></Option>
                  <Option value="2" label="柜面办理"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="办理月份：" prop="handleMonth">
                <DatePicker v-model="socialSecurityPayOperator.handleMonth" type="month" placeholder="办理年月"
                            style="width: 100%;"
                            transfer></DatePicker>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="变更类型：" prop="taskCategory">
                <Select v-model="socialSecurityPayOperator.taskCategory" style="width: 100%;" transfer>
                  <Option v-for="item in taskCategoryType" :value="item.value" :key="item.value"
                          :label="item.label"></Option>
                </Select>
              </Form-item>
              </Col>
              <!-- 仅转出 -->
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="特殊变更类型：">
                <Select v-model="socialSecurityPayOperator.taskCategorySpecial" style="width: 100%;" transfer>
                  <Option v-for="item in specialChangeType" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col> -->
              <!-- 仅转出 -->
              <!-- 仅新增 -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="缴费截止月份：" prop="endMonth">
                <DatePicker v-model="socialSecurityPayOperator.endMonth"
                            type="month"
                            placement="bottom-end"
                            placeholder="选择日期"
                            style="width: 100%;" transfer></DatePicker>
              </Form-item>
              </Col>
            </Row>
            <Row class="mt20">
              <Col span="16">
              <Form-item label="办理备注：" prop="handleRemark">
                <Input v-model="socialSecurityPayOperator.handleRemark" placeholder="请输入..."></Input>
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
                <Input v-model="socialSecurityPayOperator.rejectionRemark" placeholder="请输入..."></Input>
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
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('1','next')" v-if="showButton">转下月处理</Button> 
      <Button type="primary" @click="instance('2')" v-if="showButton">办理</Button>
      <Button type="error" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('4')" v-if="showButton">批退</Button>
      <Button type="primary" v-show="socialSecurityPayOperator.taskStatus == '1'" @click="instance('1')" v-if="showButton">暂存</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import companyInfo from '../../components/CompanyInfo.vue'
  import employeeInfo from '../../components/EmployeeInfo.vue'

  import EventTypes from '../../../../store/event_types'
  import api from '../../../../api/social_security/employee_operator'

  export default {
    components: {companyInfo, employeeInfo},
    data() {
      //办理日期
      const validateHandleMonth =(rule, value, callback)=>{
            
            let self= this
            let handleMonth = self.socialSecurityPayOperator.handleMonth;
            if(handleMonth==null || typeof(handleMonth)=='undefined' || handleMonth==""){
                return callback(new Error('不能为空.'))
            }

            let now = new Date();
            let nowMonth = self.getYearMonth(now);
            let valueMonth = self.getYearMonth(handleMonth);

            if(valueMonth<nowMonth){
              return callback(new Error('不能小于当前月.'))
            }
              callback()

      }
      //截止月份
    const validateEndMonth=(rule, value, callback)=>{
            
            let self= this
            if(value==null || typeof(value)=='undefined' || value==""){
                return callback(new Error('不能为空.'))
            }
            let handleMonth = self.getYearMonth(self.socialSecurityPayOperator.handleMonth);
            //获得上个月的月份
            let lastMonth = self.getLastYearMonth(self.socialSecurityPayOperator.handleMonth);
       
            let valueMonth = self.getYearMonth(self.socialSecurityPayOperator.endMonth);
  
            if(Number(valueMonth)!=Number(handleMonth) && Number(valueMonth)!=Number(lastMonth)){
              return callback(new Error('只能等于办理月份或者在办理月份前一月.'))
            }
            callback()
    }
      return {
        empTaskId: '',
        operatorType: '',
        currentIndex: this.$route.params.index,
        sourceFrom: '',
        collapseInfo: [1, 2, 3, 4],
        employee: {},
        company: {},
        taskCategoryType: [
          {value: '5', label: '转出'},
          {value: '6', label: '封存'},
        ], //变更方式
        // specialChangeType: [
        //   {value: '', label: '无'},
        //   {value: 1, label: '退休'},
        //   {value: 2, label: '终止'}
        // ], //特殊变更类型：
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
          outDate:'',
          taskStatus: '',
          empTaskId: '',
          empArchiveId: '',
        },
        showButton: true,
        ruleValidate:{
                handleWay:[
                   { required: true, type: 'string', message: '请选择办理方式.', trigger: 'change' }
                 ],
                handleMonth: [
                   { required: true,type: 'date',validator:validateHandleMonth, trigger: 'change' }
                ],
                taskCategory:[
                  { required: true,type: 'string',message:'选择任务类型.', trigger: 'blur' }
                ],
                endMonth:[
                  { required: true,type: 'date',validator:validateEndMonth, trigger: 'change' }
                ]
          }

      }
    },
    mounted() {
      this.initData(this.$route.query)
    },
    computed: {
    },
    methods: {
      getYearMonth(date,type){
        debugger
        if(date==null || date=="")return "";
        let year = date.getFullYear(); 
        let month = date.getMonth()+1;
        if(month>=1 && month<=9){
              month='0'+month
        }
        if(type=='show'){
          return year+'-'+month;
        }else{
          return Number(year+''+month);
        }
        
      },
      getLastYearMonth(date){
        
        if(date==null || date=="")return "";
        let year = date.getFullYear(); 
        let month = date.getMonth();
        if(month>=1 && month<=9){
              month='0'+month
        }
        
        return Number(month)==0?(Number(year)-1)+'12':Number(year+''+month) 
      },
      initData(data) {
        this.empTaskId = data.empTaskId;
        this.operatorType = data.operatorType;
        this.sourceFrom = data.sourceFrom;
        this.socialSecurityPayOperator.empTaskId = this.empTaskId;
        var empTaskId = data.empTaskId;

        api.queryEmpTaskById({
          empTaskId: empTaskId,
          operatorType: 1,// 任务单费用段
        }).then(data => {
          this.showButton = data.data.taskStatus == '1' || data.data.taskStatus == '2';

          this.$utils.copy(data.data, this.socialSecurityPayOperator);
          let handleMonth = this.socialSecurityPayOperator.handleMonth;
          
          if(handleMonth==null ||handleMonth=='' || typeof(handleMonth)=='undefined'){
            let date = new Date();
            handleMonth=this.getYearMonth(date,'show');
            this.socialSecurityPayOperator.handleMonth=handleMonth;
          }
        });

        api.queryEmpArchiveByEmpTaskId({empTaskId: empTaskId,operatorType:data.operatorType}).then((data) => {
          this.employee = data.data;
        })
        api.queryComAccountByEmpTaskId({empTaskId: empTaskId,operatorType:data.operatorType}).then((data) => {
          this.company = data.data;
        })
       
      },
      goBack() {
        this.sourceFrom !== 'search' ? this.$router.push({name: 'employeeOperatorView'}) : this.$router.push({name: 'employeeSocialSecurityInfo'});
      },
      // yyyy-MM or date
      yyyyMM(date) {
        if (typeof(date) == 'string') {
          return date.replace('-', '');
        }
        return this.$utils.formatDate(date, 'YYYYMM')
      },
    
      instance(taskStatus, type) {
        var fromData = this.$utils.clear(this.socialSecurityPayOperator,'');

        // 办理状态：1、未处理 2 、处理中  3 已完成（已办） 4、批退 5、不需处理
        var content = "任务办理";
        if ('4' == taskStatus) {
          content = "批退办理";
        }else{
           let validResult = false;
          //校验表单
        this.$refs['socialSecurityPayOperator'].validate((valid) => {
            if (valid)validResult = true;
        })
          //校验是否通过
         if(!validResult)return;
        }
        this.$Modal.confirm({
          title: "确认办理吗？",
          content: content,
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            {// 处理日期
              fromData.handleMonth = this.yyyyMM(fromData.handleMonth)
              fromData.endMonth = this.yyyyMM(fromData.endMonth)
              fromData.handleRemarkDate = null;
              fromData.rejectionRemarkDate = null;
              fromData.taskStatus = taskStatus;
            }
            // 转下月处理
            // if(type && type == 'next'){
            //   var nextDay = parseInt(this.company.expireDate) + 1;
            //   var submitTime = new Date();
            //   submitTime.setDate(nextDay);
            //   fromData.submitTime = this.$utils.formatDate(submitTime, 'YYYY-MM-DD 00:00:00');
            // }
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
