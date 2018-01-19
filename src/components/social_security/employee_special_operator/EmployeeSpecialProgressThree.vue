<template>
  <Form :label-width=150>
    <Steps :current="currentStep">
      <Step title="材料收集" ref="st1"></Step>
      <Step title="已受理"></Step>
      <Step title="送审中"></Step>
      <Step title="完成"></Step>
    </Steps>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-info :company="companyInfo"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :operatorType="'1'" :employee="employeeInfo"></employee-info>
        </div>
      </Panel>
      <Panel name="3">
        雇员社保特殊操作
        <div slot="content">
            <Form ref="socialSecuritySpecialOperator" :model="socialSecuritySpecialOperator" :rules="ruleValidate" :label-width=150>
                <Row class="mt20" type="flex" justify="start">
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="变更类型：" class="" prop="taskCategorySpecial">
                      <Select v-if="taskInitialStatus==1" v-model="socialSecuritySpecialOperator.taskCategorySpecial" style="width: 100%;" transfer 	> <!--@on-change="taskTypeChange" -->
                                <Option v-for="item in changeTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                      </Select>
                      <label v-else>{{getChangeValue(socialSecuritySpecialOperator.taskCategorySpecial)}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="任务状态：" prop="handleStatus">
                      <Select v-model="socialSecuritySpecialOperator.handleStatus" style="width: 100%;" transfer @on-change="taskTypeChange"> <!--@on-change="taskTypeChange" -->
                        <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                      </Select>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="办理方式：" class=""prop="handleWay">
                      <Select v-model="socialSecuritySpecialOperator.handleWay" style="width: 100%;" transfer>
                        <Option v-for="item in doMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                      </Select>
                    </Form-item>
                  </Col>

                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="受理日期：" class="" prop="startHandleDate">
                      <DatePicker v-if="handDateIsDateOrLabel" v-model="socialSecuritySpecialOperator.startHandleDate"  :disabled="handDateControl"  placement="top-start" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                      <label v-else>{{socialSecuritySpecialOperator.startHandleDate}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="送审日期：" class="" prop="sendCheckDate">
                      <DatePicker v-if="sendDateIsDateOrLabel" v-model="socialSecuritySpecialOperator.sendCheckDate" :disabled="sendDateControl" placement="top-start" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                      <label v-else>{{socialSecuritySpecialOperator.sendCheckDate}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="完成日期：" class="" prop="finishDate">
                      <DatePicker v-if="finishDateIsDateOrLabel" v-model="socialSecuritySpecialOperator.finishDate" :disabled="finishDateControl" placement="top-start" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                      <label v-else>{{socialSecuritySpecialOperator.finishDate}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                    <Form-item label="办理备注：" class="" prop="handleRemark">
                      <Input v-model="socialSecuritySpecialOperator.handleRemark" type="textarea" placeholder="请填写办理备注..." :rows="4"></Input>
                    </Form-item>
                  </Col>
                 <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                    <Form-item label="批退备注：" class="" prop="rejectionRemark">
                      <Input v-model="socialSecuritySpecialOperator.rejectionRemark" type="textarea" placeholder="请填写批退备注..." :rows="4"></Input>
                    </Form-item>
                  </Col>
                  </Row>
             </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="primary" @click="confirm">办理</Button>
        <Button type="error" @click="handleRefuseReason">批退</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../common_control/chat_history/Chat.vue'
  import CompanyInfo from '../components/CompanyInfo.vue'
  import employeeInfo from '../../common_control/EmployeeInfo.vue'
  import EventType from '../../../store/event_types'
  import api from '../../../api/social_security/employee_operator'
  import Utils from '../../../lib/utils'
  export default {
    components: {chat, CompanyInfo, employeeInfo},
    data() {


      //受审日期
       const validateAcceptanceDate=(rule, value, callback)=>{

            if(this.socialSecuritySpecialOperator.handleStatus=='1'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 this.socialSecuritySpecialOperator.acceptanceDate=''
                }
                //return callback(new Error('请选择受理时间.'));
               return callback(new Error(''));

              }else{
                callback();
              }
            }
       };
       //送审日期
       const validateSendCheckDate=(rule, value, callback)=>{

            let self= this
            if(self.socialSecuritySpecialOperator.handleStatus=='1'|| self.socialSecuritySpecialOperator.handleStatus=='2'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.socialSecuritySpecialOperator.sendCheckDate=''
                }
                //return callback(new Error('请选择送审时间.'));
                return callback(new Error(''));
              }else{
                callback();
              }
            }
       };
        //完成日期
       const validateFinishedDate=(rule, value, callback)=>{

            if(this.socialSecuritySpecialOperator.handleStatus=='1'|| this.socialSecuritySpecialOperator.handleStatus=='2'|| this.socialSecuritySpecialOperator.handleStatus=='3'){
               callback();
            }else{
              if(value==null || value==''){
                return callback(new Error('请选择完成时间.'));
              }else{
                callback();
              }
            }
       };


      return {
        collapseInfo: [1, 2, 3], //展开栏
        currentStep:0,
        empTaskId:this.$route.query.empTaskId,
        handDateControl:false,//受理日期 是否可编辑
         sendDateControl:false,//送审日期 是否可编辑
         finishDateControl:false,//完成日期  是否可编辑
         taskInitialStatus:'',//任务查询的最初状态
         handDateIsDateOrLabel:true,//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
         sendDateIsDateOrLabel:true,//送审日期
         finishDateIsDateOrLabel:true,//完成日期
         taskTypeList:[
            {value: '1',label: '初始(材料收缴)',disabled:false},
            {value: '2', label: '受理中',disabled:false},
            {value: '3', label: '送审中',disabled:false},
            {value: '4', label: '已完成',disabled:false},
          ],//任务状态类型
        //雇员特殊任务单的类型
             changeTypeList:[
                //{value:'0', label: '无'},
                {value:'1',label:'死亡'},
                {value:'2',label:'终止'},
                {value:'3',label:'修改个人信息'},
                {value:'4',label:'修改人员信息'},
                {value:'5',label:'退账'},
                {value:'6',label:'工龄认定'},
                {value:'7',label:'特殊工种认定'},
                {value:'8',label:'账户合并'},
                {value:'9',label:'遗属'},
                {value:'10',label:'退休'},
                {value:'11',label:'因病丧劳提前退休'},
                {value:'12',label:'特殊工种提前退休'},
                {value:'13',label:'退休高级专家增资'},
                {value:'14',label:'退休军转增资'},
                {value:'15',label:'外国人终止提取'},
                {value:'16',label:'外来人员医保卡领取'},
                {value:'17',label:'医保帐户提取'},
                {value:'18',label:'生育津贴领取'}
            ],
            doMethodList: [
            {value: '1', label: '网上申报'},
            {value: '2', label: '柜面办理'}
          ],
        employeeInfo:{},
        companyInfo: {
          customerNumber: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          serviceCenter: '大客户2',
          serviceManager: '金翔云'
        },
        socialSecuritySpecialOperator: {
          handleStatus:'',
          taskCategorySpecial: '',
          handleWay: '',
          startHandleDate: '',
          sendCheckDate: '',
          finishDate: '',
          handleRemark: '',
          rejectionRemark: ''
        },
         ruleValidate: {
                   handleStatus:[
                     {required:true, type: 'string',message: '该项不能为空!', trigger: 'change' }
                   ],
                   taskCategorySpecial:[
                     {required:true, type: 'string',message: '该项不能为空!', trigger: 'change' }
                   ],

                   handleWay:[
                     {required:true, type: 'string',message: '该项不能为空!', trigger: 'change' }
                   ],
                     startHandleDate: [
                       { type: 'date',validator:validateAcceptanceDate, trigger: 'change' }
                       ],
                     sendCheckDate: [
                       { type: 'date',validator:validateSendCheckDate, trigger: 'change' }
                       ],
                     finishDate: [
                       { type: 'date',validator:validateFinishedDate, trigger: 'change' }
                       ],
                       refuseReason:[
                          { type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
                       ],
                       handleReason:[
                         { type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
                       ]
                },
      }
    },
    mounted() {
      // this.$refs['st1'].onclick = function() {
      //     alert(123)
      // }
       this.accAndEmpDetailQuery();
    },
    computed: {

    },
    methods: {
      accAndEmpDetailQuery(){
        //处理参数
        api.specialTaskQuery({empTaskId:this.empTaskId}).then(data => {

          this.socialSecuritySpecialOperator = data.data;

          this.taskInitialStatus = data.data.handleStatus;
          this.currentStep = Number(this.taskInitialStatus)-1

          this.getStatus(this.taskInitialStatus)
        })
        //6表示特殊操作 查询雇员信息
        api.queryEmpArchiveByEmpTaskId({empTaskId:this.empTaskId,operatorType:'6'}).then((data) => {
          this.employeeInfo = data.data;
        })

        //6表示特殊操作 查询雇员信息
        api.queryComAccountByEmpTaskId({empTaskId:this.empTaskId,operatorType:'6'}).then((data) => {
          this.companyInfo = data.data;
        })
      },
      getStatus(handleStatus){

        let self= this
          switch(handleStatus) {
                case '1':
                      self.handDateControl = true;
                      self.sendDateControl=true;
                      self.finishDateControl=true;
                  break;
                case '2':
                  self.taskTypeList[0].disabled = true;
                      self.sendDateControl=true;
                      self.finishDateControl=true;
                        self.handDateIsDateOrLabel=false//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
                  break;
                case '3':
                    self.taskTypeList[0].disabled = true;
                    self.taskTypeList[1].disabled = true;
                    self.handDateControl = true;
                    self.finishDateControl=true;
                      self.handDateIsDateOrLabel=false//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
                      self.sendDateIsDateOrLabel=false//送审日期

                  break;
                case '4':
                    self.taskTypeList[0].disabled = true;
                    self.taskTypeList[1].disabled = true;
                    self.taskTypeList[2].disabled = true;
                    self.handDateControl = true;
                    self.sendDateControl=true;
                      self.handDateIsDateOrLabel=false//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
                      self.sendDateIsDateOrLabel=false//送审日期
                      self.finishDateIsDateOrLabel=false//完成日期
                  break;
                default:
                  break;
              }
      },
      //任务状态变更
      taskTypeChange(){

          let taskState = this.socialSecuritySpecialOperator.handleStatus
         //acceptanceDate sendCheckDate finishedDate
         let formObj = this.socialSecuritySpecialOperator
        if(taskState=='1'){
            this.handDateControl = true;
            this.sendDateControl=true;
            this.finishDateControl=true;
            this.$set(formObj,'startHandleDate',null)
             this.$set(formObj,'sendCheckDate',null)
            this.$set(formObj,'finishDate',null)
        }else if(taskState=='2'){
            this.handDateControl = false;
            this.sendDateControl=true;
            this.finishDateControl=true;
            this.$set(formObj,'sendCheckDate',null)
            this.$set(formObj,'finishDate',null)
        }else if(taskState=='3'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=true;
           this.$set(formObj,'finishDate',null)
        }else if(taskState=='4'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=false;
        }
      },
      confirm(){
        let beforeValid = false;
        this.$refs['socialSecuritySpecialOperator'].validate((valid) => {
            if (valid){
                beforeValid = true;
            }
        })
        if(!beforeValid)return;

        let self = this;
            self.$Modal.confirm({
                title: '',
                content: '确认办理吗?',
                //loading:true,
                onOk:function(){
                    let obj = self.socialSecuritySpecialOperator
                    let params ={
                      empTaskId:self.empTaskId,
                      handleStatus:obj.handleStatus,
                      changeType:obj.taskCategorySpecial,
                      handleWay:obj.handleWay,
                      startHandleDate:obj.startHandleDate!=null&&obj.startHandleDate!=""?Utils.formatDate(obj.startHandleDate,'YYYY-MM-DD'):null,
                      sendCheckDate:obj.sendCheckDate!=null&&obj.sendCheckDate!=""?Utils.formatDate(obj.sendCheckDate,'YYYY-MM-DD'):null,
                      finishDate:obj.finishDate!=null&&obj.finishDate!=""?Utils.formatDate(obj.finishDate,'YYYY-MM-DD'):null,
                      handleRemark:obj.handleRemark,
                      rejectionRemark:obj.rejectionRemark
                    }

                    api.empSpecialTaskHandle(params).then(data=>{
                        if(data){
                          self.$Notice.success({
                            title: '操作成功',
                            desc:'办理完毕!',
                            duration: 2
                            });
                        self.goBack();

                        }else{
                          self.$Notice.error({
                            title: '操作失败',
                            desc:'网络异常!',
                            duration: 2
                          });
                        }
                    })

                },
                 error:function(error){
                   self.$Message.error('办理失败!');
                   self.$Modal.remove();
               }
            });
      },
      goBack() {
        this.$router.push({name:'employeespecialoperatorview'});
      },
      getChangeValue(val){
        if(typeof(val)=='undefined' ||  val==null || val.trim()==''){
          return null
        }else{
          let index = Number(val)-1
        return this.changeTypeList[index].label;
        }

      },
      handleRefuseReason() {
        var ids = [];
          ids.push(this.empTaskId);
        var ajax = api.refuseReason({
          remark: this.socialSecuritySpecialOperator.rejectionRemark,
          ids: ids
        })
        this.$ajax.handle({
          vm: this,
          ajax: ajax,
          title: '任务批退',
          callback: (data) => {
            this.$router.push({name: 'employeespecialoperatorview'});
          }
        })
      },
    }
  }
</script>
