<template>
  <Form :label-width=150>
    <Steps :current="currentStep">
      <Step title="材料收集"></Step>
      <Step title="已受理"></Step>
      <Step title="送审中"></Step>
      <Step title="完成"></Step>
    </Steps>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-social-security-info :company="companyInfo"></company-social-security-info>
        </div>
      </Panel>
      <Panel name="2">
        前道传递信息
        <div slot="content">
          <Form :label-width=100>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="发起人：" class="">
                  <label>{{historyRemark.submitName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="发起时间：" class="">
                  <label>{{historyRemark.submitTime}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="发起备注：" class="">
                  <label>{{historyRemark.submitRemark}}</label>
                </Form-item>
              </Col>
            </Row>
         </Form>
        </div>
      </Panel>
      <Panel name="3">
        企业终止操作
        <div slot="content">
          <Form ref="endOperator" :model="endOperator" :rules="ruleValidate" :label-width="100">
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：" prop="taskStatus">
                  <Select v-model="endOperator.taskStatus" style="width: 100%;" transfer @on-change="taskTypeChange"	>
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：" prop="acceptanceDate">
                  <DatePicker v-if="handDateIsDateOrLabel" v-model="endOperator.acceptanceDate" placement="bottom-end" :disabled="handDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                  <label v-else>{{endOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：" prop="sendCheckDate">
                  <DatePicker v-if="sendDateIsDateOrLabel" v-model="endOperator.sendCheckDate" placement="bottom-end" :disabled="sendDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                  <label v-else>{{endOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：" prop="finishedDate">
                  <DatePicker v-if="finishDateIsDateOrLabel" v-model="endOperator.finishedDate" placement="bottom-end" :disabled="finishDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                    <label v-else>{{endOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止日期：" prop="endDate">
                  <DatePicker v-if="endDateIsDateOrLabel" v-model="endOperator.endDate" placement="bottom-end" :disabled="endDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                  <label v-else>{{endOperator.endDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item prop="handleRemark" label="办理备注：">
                    <Input v-model="endOperator.handleRemark" type="textarea" placeholder="请填写办理备注..." :rows="4"></Input>
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item prop="refuseReason" label="批退备注：" >
                    <Input v-model="endOperator.refuseReason" type="textarea"  placeholder="请填写批退备注..." :rows="4"></Input>
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
       <Button type="primary" @click="revoke">撤销</Button>
      <Button type="error" @click="refuseTask">批退</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../common_control/chat_history/Chat.vue'
  import companySocialSecurityInfo from '../../common_control/CompanySocialSecurityInfo.vue'
  import EventType from '../../../store/event_types'
  import {CompanyTaskList} from '../../../api/social_security/company_task_list/company_task_list'
  import Utils from '../../../lib/utils'
  export default {
    components: {chat, companySocialSecurityInfo},
    data() {
      //受审日期
       const validateAcceptanceDate=(rule, value, callback)=>{

            let self= this
            if(self.endOperator.taskStatus=='0'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.endOperator.acceptanceDate=''
                }
               return callback(new Error('请选择受理时间.'));
              }else{
                callback();
              }
            }
       };
       //送审日期
       const validateSendCheckDate=(rule, value, callback)=>{
            let self= this
            if(self.endOperator.taskStatus=='0'|| self.endOperator.taskStatus=='1'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.endOperator.sendCheckDate=''
                }
                return callback(new Error('请选择送审时间.'));
              }else{
                callback();
              }
            }
       };
        //完成日期
       const validateFinishedDate=(rule, value, callback)=>{
            let self= this
            if(self.endOperator.taskStatus=='0'|| self.endOperator.taskStatus=='1'|| self.endOperator.taskStatus=='2'){
               callback();
            }else{
              if(value==null || value==''){
                return callback(new Error('请选择完成时间.'));
              }else{
                callback();
              }
            }
       };

      const validateEndDate=(rule, value, callback)=>{

            let self= this
            if(self.endOperator.taskStatus=='0'|| self.endOperator.taskStatus=='1'|| self.endOperator.taskStatus=='2'){
               callback();
            }else{
              if(value==null || value==''){
                return callback(new Error('请选择终止时间.'));
              }else{
                callback();
              }
            }
       };

      return {
         operatorType: this.$route.query.operatorType,
         tid:this.$route.query.tid,
         comAccountId:'',//社保账户表ID
        collapseInfo: [1, 2, 3], //展开栏
        currentStep: 2,
        companyInfo:{},
        handDateControl:false,//受理日期 是否可编辑
         sendDateControl:false,//送审日期 是否可编辑
         finishDateControl:false,//完成日期  是否可编辑
         endDateControl:false,//终止日期 是否可编辑

         handDateIsDateOrLabel:false,//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
         sendDateIsDateOrLabel:false,//送审日期
         finishDateIsDateOrLabel:false,//完成日期
         endDateIsDateOrLabel:false,
        endOperator: {
          taskStatus:'',
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          endDate: '',
          handleRemark:'',
          refuseReason: ''
        },
         historyRemark:{
          submitName:'',
          submitTime:'',
          submitRemark:''
         },
         taskTypeList:[
            {value: '0',label: '初始(材料收缴)',disabled:false},
            {value: '1', label: '受理中',disabled:false},
            {value: '2', label: '送审中',disabled:false},
            {value: '3', label: '已完成',disabled:false},
          ],//任务状态类型
          ruleValidate:{
                taskStatus:[
                   { required: true, type: 'string', message: '请选择任务状态.', trigger: 'change' }
                 ],
                acceptanceDate:[
                   { type: 'date',validator:validateAcceptanceDate, trigger: 'change' }
                ],
                sendCheckDate:[
                   { type: 'date',validator:validateSendCheckDate, trigger: 'change' }
                ],
                finishedDate: [
                   { type: 'date',validator:validateFinishedDate, trigger: 'change' }
                ],
                endDate:[
                   { type: 'date',validator:validateEndDate, trigger: 'change' }
                ],
                 refuseReason:[
                  {type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
                 ],
                 handleRemark:[
                  { type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
                ]
          }

      }
    },
    mounted() {
      this.queryPageInfo()
    },
    computed: {

    },
    methods: {
      goBack() {
        this.$router.push({name: 'companyTaskList'})
      },
      //查询页面信息
      queryPageInfo(){
        let params = {
          comTaskId:this.tid,
          operatorType:this.operatorType,
          isComplete:'0'//表示不为空 查询状态不为3的任务:
        }
        let self = this
        CompanyTaskList.getEndPageInfo(params,'end').then(result=>{
        self.comAccountId = result.comAccountId
        self.companyInfo = result.companyInfo
        self.historyRemark = result.historyRemark;

        self.endOperator = result.endOperator;

        self.currentStep  =result.endOperator.taskStatus==null?0:Number(result.endOperator.taskStatus)
        switch(result.endOperator.taskStatus) {
                        case '0':
                              self.handDateControl = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true;
                              self.endDateControl = true;
                              self.handDateIsDateOrLabel=true//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
                              self.sendDateIsDateOrLabel=true//送审日期
                              self.finishDateIsDateOrLabel=true//完成日期
                              self.endDateIsDateOrLabel=true
                          break;
                        case '1':
                              self.taskTypeList[0].disabled = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true;
                              self.endDateControl = true;
                              self.sendDateIsDateOrLabel=true//送审日期
                              self.finishDateIsDateOrLabel=true//完成日期
                              self.endDateIsDateOrLabel=true
                          break;
                        case '2':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.handDateControl = true;
                           self.finishDateControl=true;
                           self.endDateControl = true;
                           self.finishDateIsDateOrLabel=true//完成日期
                           self.endDateIsDateOrLabel=true
                          break;
                        case '3':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.taskTypeList[2].disabled = true;
                           self.handDateControl = true;
                           self.sendDateControl=true;
                          break;
                        default:
                          break;
                      }
      })

      },
      taskTypeChange(){

          let taskState = this.endOperator.taskStatus
         //acceptanceDate sendCheckDate finishedDate
         let formObj = this.endOperator
        if(taskState=='0'){
            this.handDateControl = true;
            this.sendDateControl=true;
            this.finishDateControl=true;
            this.endDateControl = true;
            this.endOperator.acceptanceDate=null //受理日期
            this.endOperator.sendCheckDate=null //送审日期
            this.endOperator.finishedDate=null//完成日期
            this.endOperator.endDate = null
        }else if(taskState=='1'){
            this.handDateControl = false;
            this.sendDateControl=true;
            this.finishDateControl=true;
             this.endDateControl = true;
             this.endOperator.sendCheckDate=null //送审日期
            this.endOperator.finishedDate=null//完成日期
            this.endOperator.endDate = null
        }else if(taskState=='2'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=true;
             this.endDateControl = true;
              this.endOperator.finishedDate=null//完成日期
            this.endOperator.endDate = null
        }else if(taskState=='3'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=false;
             this.endDateControl = false;

        }
      },
       //办理
      confirm(){

      let validResult = false;
      //校验表单
        this.$refs['endOperator'].validate((valid) => {
            if (valid)validResult = true;
        })
          //校验是否通过
         if(!validResult)return;
            let self = this;
            self.$Modal.confirm({
                title: '',
                content: '确认办理吗?',
                //loading:true,
                onOk:function(){
                   let params = self.getParams()

                   CompanyTaskList.updateOrEndingTask(params).then(result=>{
                    if(result){
                       self.$Message.success('办理成功!');
                       self.goBack()
                    }else{
                     self.$Message.error('办理失败!');
                    }
                   }).catch(error=>{
                     self.$Message.error('办理异常!');
                     console.log(error)
                   })
                },
                 error:function(error){
                   self.$Modal.remove();
               }
            });
      },
      getParams(){
        //通过任务单的状态 添加受理或者送审或者完成时间
          let formObj = this.endOperator
          let taskStatus = formObj.taskStatus
          let startHandleDate = null
          let sendCheckDate = null
          let finishDate = null
          let endDate = null
          //判断状态
          if(taskStatus=='1'){
            startHandleDate = Utils.formatDate(formObj.acceptanceDate,'YYYY-MM-DD')
          }else if(taskStatus=='2'){
            startHandleDate = Utils.formatDate(formObj.acceptanceDate,'YYYY-MM-DD')
            sendCheckDate = Utils.formatDate(formObj.sendCheckDate,'YYYY-MM-DD')
          }else if(taskStatus=='3'){
            startHandleDate = Utils.formatDate(formObj.acceptanceDate,'YYYY-MM-DD')
            sendCheckDate = Utils.formatDate(formObj.sendCheckDate,'YYYY-MM-DD')
            finishDate = Utils.formatDate(formObj.finishedDate,'YYYY-MM-DD')
            endDate = Utils.formatDate(formObj.endDate,'YYYY-MM-DD')
          }
          let ssComTaskDTO = {
            comAccountId:this.comAccountId,
            comTaskId: this.tid,
            taskStatus: taskStatus,
            startHandleDate: startHandleDate,
            sendCheckDate: sendCheckDate,
            finishDate: finishDate,
            endDate:endDate,
            handleRemark:formObj.handleRemark
           }
           return ssComTaskDTO
      },
      //批退任务
      refuseTask(){
        if(this.endOperator.refuseReason=='' || typeof(this.endOperator.refuseReason)=='undefined'){
          this.$Message.warning('请输入批退原因！')
          return
        }
             let params = {
                    taskIdStr:this.tid,
                    refuseReason:this.endOperator.refuseReason
                      }
            let self = this
            self.$Modal.confirm({
                title: '',
                content: '确认批退吗?',
                //loading:true,
                onOk:function(){
                  CompanyTaskList.refusingTask(params).then(result=>{
                    if(result){
                      self.$Message.success("批退成功！")
                      setTimeout(self.goBack(),500)
                    }else{
                        self.$Message.success("处理失败！")
                    }
                  })
                },
                 error:function(error){
                   self.$Message.error('办理失败!');
                   self.$Modal.remove();
               }
            });
      },
      //撤销任务单 状态(将任务单状态往回走一步)
      revoke(){


        if(this.currentStep=='0'){
          this.$Notice.warning({
                    title: '操作失败',
                    desc: '该任务单已经是初始状态.',
                    duration: 3
                });
                return;
        }
        let params = {
                comTaskId:this.tid,
                taskStatus:this.currentStep
            }
            let self = this
            self.$Modal.confirm({
                title: '',
                content: '确认撤销吗?',
                //loading:true,
                onOk:function(){
                    CompanyTaskList.taskRevocation(params).then(result=>{
                      if(result){
                         self.$Message.success("撤退成功！")
                          self.refresh()
                      }else{
                       self.$Message.error("操作失败！")
                      }
                    }).catch(error=>{
                      self.$Message.error(error)
                    })
                },
                 error:function(error){
                   self.$Message.error('操作失败!');
                   self.$Modal.remove();
               }
            });

      },
      refresh(){
        //CompanyTaskProgressChangeInfo
        this.$router.push({name:'refresh',query:{operatorType:this.operatorType,tid:this.tid,name:'companyTaskProgressEndInfo'}})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
