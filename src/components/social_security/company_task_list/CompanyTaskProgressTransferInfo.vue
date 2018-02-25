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
        企业转移操作
        <div slot="content">
          <Form ref="transferOperator" :model="transferOperator" :rules="ruleValidate" :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保中心(结算区县)：" class="" prop="regionValue">
                  <AutoComplete
                      v-model="transferOperator.regionValue"
                      placeholder="请选择">
                      <div class="demo-auto-complete-item">
                          <Option v-for="option in regionList" :value="option.label" :key="option.label">
                              <span class="demo-auto-complete-title">{{ option.label }}</span>
                          </Option>
                      </div>
                  </AutoComplete>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：" prop="taskStatus">
                  <Select v-model="transferOperator.taskStatus" style="width: 100%;" transfer @on-change="taskTypeChange"	>
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：" prop="acceptanceDate" class="">
                  <DatePicker v-if="handDateIsDateOrLabel" v-model="transferOperator.acceptanceDate" placement="bottom-end" :disabled="handDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                <label v-else>{{transferOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：" class="" prop="sendCheckDate">
                  <DatePicker v-if="sendDateIsDateOrLabel" v-model="transferOperator.sendCheckDate" placement="bottom-end" :disabled="sendDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                 <label v-else>{{transferOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：" class="" prop="finishedDate">
                  <DatePicker v-if="finishDateIsDateOrLabel" v-model="transferOperator.finishedDate" placement="bottom-end" :disabled="finishDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                    <label v-else>{{transferOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移日期：" class="" prop="transferDate">
                  <DatePicker v-if="transferDateIsDateOrLabel" v-model="transferOperator.transferDate" placement="bottom-end" :disabled="transferDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                   <label v-else>{{transferOperator.transferDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="办理备注：" prop="handleReason">
                    <Input v-model="transferOperator.handleReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
                  </Form-item>
                </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退备注：" class="" prop="refuseReason">
                  <Input v-model="transferOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
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
  import EventType from "../../../store/event_types"
  import {CompanyTaskList} from '../../../api/social_security/company_task_list/company_task_list'
  import Utils from '../../../lib/utils'
  export default {
    components: {chat, companySocialSecurityInfo},
    data() {
       //受审日期
       const validateAcceptanceDate=(rule, value, callback)=>{

            let self= this
            if(self.transferOperator.taskStatus=='0'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.transferOperator.acceptanceDate=''
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
            if(self.transferOperator.taskStatus=='0'|| self.transferOperator.taskStatus=='1'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.transferOperator.sendCheckDate=''
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
            if(self.transferOperator.taskStatus=='0'|| self.transferOperator.taskStatus=='1'|| self.transferOperator.taskStatus=='2'){
               callback();
            }else{
              if(value==null || value==''){
                return callback(new Error('请选择完成时间.'));
              }else{
                callback();
              }
            }
       };

      const validateTransferDate=(rule, value, callback)=>{
            let self= this
            if(self.transferOperator.taskStatus=='0'|| self.transferOperator.taskStatus=='1'|| self.transferOperator.taskStatus=='2'){
               callback();
            }else{
              if(value==null || value==''){
                return callback(new Error('请选择转移时间.'));
              }else{
                callback();
              }
            }
       };
      return {
        operatorType: this.$route.query.operatorType,
         tid:this.$route.query.tid,
        collapseInfo: [1, 2, 3], //展开栏
        comAccountId:'',//社保账户表ID
        currentStep: 2,
        companyInfo:{},
        handDateControl:false,//受理日期 是否可编辑
         sendDateControl:false,//送审日期 是否可编辑
         finishDateControl:false,//完成日期  是否可编辑
         transferDateControl:false,//转移日期 是否可编辑

         handDateIsDateOrLabel:false,//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
         sendDateIsDateOrLabel:false,//送审日期
         finishDateIsDateOrLabel:false,//完成日期
         transferDateIsDateOrLabel:false,
           regionList: [
            {value: '1', label: '徐汇'},
            {value: '2', label: '长宁'},
            {value: '3', label: '浦东'},
            {value: '4', label: '卢湾'},
            {value: '5', label: '静安'},
            {value: '6', label: '黄浦'}
          ],
          taskTypeList:[
            {value: '0',label: '初始(材料收缴)',disabled:false},
            {value: '1', label: '受理中',disabled:false},
            {value: '2', label: '送审中',disabled:false},
            {value: '3', label: '已完成',disabled:false},
          ],//任务状态类型
           historyRemark:{
          submitName:'',
          submitTime:'',
          submitRemark:''
         },
        transferOperator: {
          taskStatus:'',
          acceptanceDate: '',
          sendCheckDate: '',
          finishedDate: '',
          refuseReason: '',
          handleReason:'',
          regionValue: '',
          transferDate: ''
        },
        ruleValidate:{
          regionValue:[
               { required: true, type: 'string', message: '请选择结算区县.', trigger: 'change' },
               { required: true, type: 'string', message: '请选择结算区县.', trigger: 'blur' }
          ],
          taskStatus:[
               { required: true, type: 'string', message: '请选择任务状态.', trigger: 'change' }
          ],
          acceptanceDate: [
                 { type: 'date',validator:validateAcceptanceDate, trigger: 'change' }
          ],
          sendCheckDate: [
                 { type: 'date',validator:validateSendCheckDate, trigger: 'change' }
          ],
          finishedDate: [
                 { type: 'date',validator:validateFinishedDate, trigger: 'change' }
           ],
           transferDate:[
                  { type: 'date',validator:validateTransferDate, trigger: 'change' }
           ],
          refuseReason:[
                  { type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
           ],
          handleReason:[
                  { type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
          ],


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
      queryPageInfo(){

        let params = {
          comTaskId:this.$route.query.tid,
          operatorType:this.operatorType,
          isComplete:'0'//表示不为空 查询状态不为3的任务:
        }
        let self = this
        CompanyTaskList.getEndPageInfo(params,'transfer').then(result=>{
        self.comAccountId = result.comAccountId
        self.companyInfo = result.companyInfo
        self.historyRemark = result.historyRemark;

        self.transferOperator = result.transferOperator;
        self.currentStep  =result.transferOperator.taskStatus==null?0:Number(result.transferOperator.taskStatus)
        switch(result.transferOperator.taskStatus) {
                        case '0':
                          self.handDateIsDateOrLabel = true;
                          self.sendDateIsDateOrLabel = true;
                          self.finishDateIsDateOrLabel = true;
                          self.transferDateIsDateOrLabel = true;
                          break;
                        case '1':
                          self.taskTypeList[0].disabled = true;
                          self.sendDateIsDateOrLabel = true;
                          self.finishDateIsDateOrLabel = true;
                          self.transferDateIsDateOrLabel = true;
                          break;
                        case '2':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.finishDateIsDateOrLabel=true;
                           self.transferDateIsDateOrLabel = true;
                          break;
                        case '3':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.taskTypeList[2].disabled = true;
                          break;
                        default:
                          break;
                      }
      })

      },
      taskTypeChange(){
        let taskState = this.transferOperator.taskStatus
         let formObj = this.transferOperator
        //初始状态 时间都不可点
        if(taskState=='0'){
            this.handDateControl = true;
            this.sendDateControl=true;
            this.finishDateControl=true;
            this.transferDateControl = true;
            formObj.acceptanceDate = null;
            formObj.sendCheckDate = null;
            formObj.finishedDate =null;
             formObj.transferDate =null;
        }else if(taskState=='1'){
            this.handDateControl = false;
            this.sendDateControl=true;
            this.finishDateControl=true;
             this.transferDateControl = true;
        }else if(taskState=='2'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=true;
             this.transferDateControl = true;
        }else if(taskState=='3'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=false;
             this.transferDateControl = false;
        }
      },
      //办理
      confirm(){
        let validResult = false;
        this.$refs['transferOperator'].validate((valid) => {
                    if (valid) {
                        validResult = true;
                    }
                })
         if(!validResult){
              return;
            }
            let self = this;
            self.$Modal.confirm({
                title: '',
                content: '确认办理吗?',
                //loading:true,
                onOk:function(){
                   let params = self.getParams()

                   CompanyTaskList.updateOrTransferTask(params).then(result=>{
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
          let formObj = this.transferOperator
          let taskStatus = formObj.taskStatus
          let startHandleDate = null
          let sendCheckDate = null
          let finishDate = null
          let transferDate = null
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
            transferDate = Utils.formatDate(formObj.transferDate,'YYYY-MM-DD')
          }
          let ssComTaskDTO = {
            comAccountId:this.comAccountId,
            comTaskId: this.tid,
            taskStatus: taskStatus,
            startHandleDate: startHandleDate,
            sendCheckDate: sendCheckDate,
            finishDate: finishDate,
            transferDate:transferDate,
            handleRemark:formObj.handleReason,
            settlementArea:formObj.regionValue
           }
           return ssComTaskDTO
      },
       //批退任务
      refuseTask(){
         if(this.transferOperator.refuseReason=='' || typeof(this.transferOperator.refuseReason)=='undefined'){
          this.$Message.warning('请输入批退原因！')
          return
        }
             let params = {
                    taskIdStr:this.tid,
                    refuseReason:this.transferOperator.refuseReason
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
        this.$router.push({name:'refresh',query:{operatorType:this.operatorType,tid:this.tid,name:'companyTaskProgressTransferInfo'}})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
