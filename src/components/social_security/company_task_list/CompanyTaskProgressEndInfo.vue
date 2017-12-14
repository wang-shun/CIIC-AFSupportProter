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
          <Form :label-width=100>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：">
                  <Select v-model="endOperator.taskStatus" style="width: 100%;" transfer @on-change="taskTypeChange"	>
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：">
                  <DatePicker v-model="endOperator.acceptanceDate" placement="bottom-end" :disabled="handDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：">
                  <DatePicker v-model="endOperator.sendCheckDate" placement="bottom-end" :disabled="sendDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：">
                  <DatePicker v-model="endOperator.finishedDate" placement="bottom-end" :disabled="finishDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止日期：">
                  <DatePicker v-model="endOperator.endDate" placement="bottom-end" :disabled="endDateControl" placeholder="选择日期" style="width: 100%;"></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="办理备注：">
                    <Input v-model="endOperator.handleReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="批退备注：">
                    <Input v-model="endOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
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
      <Button type="error" @click="refuseTask">批退</Button>
      <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../commoncontrol/chathistory/chat.vue'
  import companySocialSecurityInfo from '../../commoncontrol/companysocialsecurityinfo.vue'
  import EventType from '../../../store/EventTypes'
  import {CompanyTaskList} from '../../../module/social_security/company_task_list'
  import Utils from '../../../lib/utils'
  export default {
    components: {chat, companySocialSecurityInfo},
    data() {
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
        endOperator: {
          taskStatus:'',
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          endDate: '',
          handleReason:'',
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
      }
    },
    mounted() {
      //this[EventType.COMPANYTASKPROGRESSSENDINFOTYPE]()
      this.queryPageInfo()
    },
    computed: {
      // ...mapState('companyTaskProgressSendInfo', {
      //   data: state => state.data
      // })
    },
    methods: {
      // ...mapActions('companyTaskProgressSendInfo', [EventType.COMPANYTASKPROGRESSSENDINFOTYPE]),
      goBack() {
        this.$router.push({name: 'companytasklist'})
      },
      //查询页面信息
      queryPageInfo(){
        let params = {
          companyTaskId:this.tid,
          operatorType:this.operatorType
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
                          break;
                        case '1':
                          self.taskTypeList[0].disabled = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true;
                               self.endDateControl = true;
                          break;
                        case '2':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.handDateControl = true;
                           self.finishDateControl=true;
                           self.endDateControl = true;
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
        }else if(taskState=='1'){
            this.handDateControl = false;
            this.sendDateControl=true;
            this.finishDateControl=true;
             this.endDateControl = true;
        }else if(taskState=='2'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=true;
             this.endDateControl = true;
        }else if(taskState=='3'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=false;
             this.endDateControl = false;
        }
      },
       //校验表单数据
      checkData(){
        //暂时只校验 任务单类型和时间的选择
         let formObj = this.endOperator
          let taskState = formObj.taskStatus
        if(taskState=='3'){
           if(formObj.acceptanceDate==null || formObj.acceptanceDate==''){
             this.$Message.error("请选择受审时间！")
             return false;
           }
           if(formObj.sendCheckDate==null || formObj.sendCheckDate==''){
              this.$Message.error("请选择送审时间！")
               return false;
           }
           if(formObj.finishedDate==null || formObj.finishedDate==''){
             this.$Message.error("请选择完成时间！")
              return false;
           }
           if(formObj.endDate==null || formObj.endDate==''){
             this.$Message.error("请选择终止时间！")
              return false;
           }
        }
        if(taskState=='2'){
           if(formObj.acceptanceDate==null || formObj.acceptanceDate==''){
             this.$Message.error("请选择受理时间！")
             return false;
           }
           if(formObj.sendCheckDate==null || formObj.sendCheckDate==''){
              this.$Message.error("请选择送审时间！")
               return false;
           }
        }
        if(taskState=='1'){
           if(formObj.acceptanceDate==null || formObj.acceptanceDate==''){
             this.$Message.error("请选择受审时间！")
             return false;
           }
        }
        return true;
      },
       //办理
      confirm(){
            //校验数据
            let res = this.checkData()
            if(!res){return;}
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
            companyTaskId: this.tid,
            taskStatus: taskStatus,
            startHandleDate: startHandleDate,
            sendCheckDate: sendCheckDate,
            finishDate: finishDate,
            endDate:endDate,
            handleRemark:formObj.handleReason
           }

           return ssComTaskDTO
      },
      //批退任务
      refuseTask(){
             let params = {
                    taskIdStr:this.tid,
                    refuseReason:this.companyOpenAccountOperator.refuseReason
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
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
