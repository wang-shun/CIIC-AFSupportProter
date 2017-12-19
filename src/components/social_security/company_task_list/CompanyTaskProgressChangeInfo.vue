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
        企业变更操作
        <div slot="content">
          <Form ref="changeOperator" :model="changeOperator"  :rules="ruleValidate" :label-width=150>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更内容：" prop="changeContentValue">
                  <Select v-model="changeOperator.changeContentValue" style="width: 100%;" transfer @on-change="changeContentType" v-if="currentStep=='0'">
                    <Option v-for="item in changeContentList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                  <label v-else>{{currentStep=='1'?'行业比例':currentStep=='2'?'付款方式':currentStep=='3'?'公司名称':''}}</label>
                </Form-item>
              </Col>
              <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：" prop="taskStatus">
                  <Select v-model="changeOperator.taskStatus" style="width: 100%;" transfer @on-change="taskTypeChange"	>
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              </Row>
              <Row v-if="payMethodShow || companyNameShow" class="mt20" type="flex" justify="start">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="payMethodShow">
                <Form-item label="付款方式：" prop="payMethodValue">
                  <Select v-model="changeOperator.payMethodValue" style="width: 100%;" transfer >
                    <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="companyNameShow">
                <Form-item label="养老金用公司名称：" prop="pensionMoneyUseCompanyName">
                  <Input v-model="changeOperator.pensionMoneyUseCompanyName" placeholder="请输入..."></Input>
                </Form-item>
              </Col> 
              </Row>
              <Row class="mt20" type="flex" justify="start">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="industryRatioShow">
                <Form-item label="所属行业：" prop="belongsIndustry">
                  <Input v-model="changeOperator.belongsIndustry"  placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="industryRatioShow">
                <Form-item label="企业工伤比例：" prop="companyWorkInjuryPercentage">
                  <Input v-model="changeOperator.companyWorkInjuryPercentage"  placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="industryRatioShow">
                <Form-item label="变更开始月份：" prop="changeStartMonth">
                  <DatePicker v-model="changeOperator.changeStartMonth" type="month" format="yyyyMM" placement="bottom-end" placeholder="选择日期"  style="width: 100%; "></DatePicker>
                </Form-item>
              </Col>     
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：" prop="acceptanceDate">
                  <DatePicker v-if="handDateIsDateOrLabel" v-model="changeOperator.acceptanceDate" :disabled="handDateControl" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                  <label v-else>{{changeOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：" prop="sendCheckDate" >
                  <DatePicker v-if="sendDateIsDateOrLabel" v-model="changeOperator.sendCheckDate" :disabled="sendDateControl" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                   <label v-else>{{changeOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：" prop="finishedDate">
                  <DatePicker v-if="finishDateIsDateOrLabel"  v-model="changeOperator.finishedDate" :disabled="finishDateControl" placement="bottom-end" placeholder="选择日期" style="width: 100%;"></DatePicker>
                   <label v-else>{{changeOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="办理备注：" prop="handleReason">
                    <Input v-model="changeOperator.handleReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="批退备注：" prop="refuseReason">
                    <Input v-model="changeOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
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
          
        //所属行业
        const validateBelongsIndustry=(rule, value, callback)=>{
          
          let self= this;
          let changeval = self.changeOperator.changeContentValue;
            if(changeval=='1'){
              if(value==null || value.trim()==''){
                return callback(new Error('该项不能为空！'))
              }else if(value.length>10){
                return callback(new Error('不能超过十位.'))
              }else if(value.trim()!=value){
                return callback(new Error('格式不正确.'))
              }else{
                callback()
              }
            }else{
              callback()
            }
       };
       //工伤比例
      const validateComWorkInjuryPercentage=(rule, value, callback)=>{
        
          let self= this;
          let changeval = self.changeOperator.changeContentValue;
            if(changeval=='1'){
                if (value==null || value.trim()=='') {
                    return callback(new Error('该项不能为空！'));
                } 
               var rex = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                if(!rex.test(value)) {
                    callback(new Error('请输入正确的金钱格式.'));
                }else{
                    if (value.length > 20) {
                          callback(new Error('长度不能超过20个.'));
                    } else {
                         callback();
                    }
               }
            }else{
              callback()
            }
       };
       //开始月份
      const validateChangeStartMonth=(rule, value, callback)=>{
          let self= this;
          let changeval = self.changeOperator.changeContentValue;
            if(changeval=='1'){
              if (value==null || value==""){
                    return callback(new Error('该项不能为空！'));
                }else{
                   return callback();
                }
            }else{
              callback();
            }
       };
      const validatePayMethodValue=(rule, value, callback)=>{
        
          let self= this;
          let changeval = self.changeOperator.changeContentValue;
            if(changeval=='2'){
              if (value==null || value==""){
                    return callback(new Error('请选择付款方式！'));
                }else{
                    return callback()
                }
            }else{
              callback();
            }
      }
      //企业名称变更名
      const validatePensionMoneyComName=(rule, value, callback)=>{
        
          let self= this;
          let changeval = self.changeOperator.changeContentValue;
            if(changeval=='3'){
              if (value==null || value.trim()==""){
                    return callback(new Error('该项不能为空！'));
                }else if(value.length>20){
                   return callback(new Error('最多不超过20个.'));
                }else{
                  callback()
                }

            }else{
              callback();
            }
      }

       //受审日期
       const validateAcceptanceDate=(rule, value, callback)=>{
            
            if(this.changeOperator.taskStatus=='0'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 this.changeOperator.acceptanceDate=''
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
            if(self.changeOperator.taskStatus=='0'|| self.changeOperator.taskStatus=='1'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.$set(self.changeOperator,'sendCheckDate','')
                }
                return callback(new Error('请选择送审时间.'));
              }else{
                callback();
              }
            }
       };
        //完成日期 
       const validateFinishedDate=(rule, value, callback)=>{
            
            if(this.changeOperator.taskStatus=='0'|| this.changeOperator.taskStatus=='1'|| this.changeOperator.taskStatus=='2'){
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
        currentStep: 2,
        industryRatioShow:true, 
        payMethodShow:false,//控制付款方式input
        companyNameShow:false,//控制养老金公司名称 input
        operatorType: this.$route.query.operatorType,
         tid:this.$route.query.tid,
         comAccountId:'',//社保账户表ID
          handDateControl:false,//受理日期 是否可编辑 
         sendDateControl:false,//送审日期 是否可编辑
         finishDateControl:false,//完成日期  是否可编辑
         getTaskInitialStatus:'0',
         handDateIsDateOrLabel:true,//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
         sendDateIsDateOrLabel:true,//送审日期 
         finishDateIsDateOrLabel:true,//完成日期  
         companyInfo:{},
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
         payMethodList: [
            {value: '1', label: '我司付款，账单到他司'},
            {value: '2', label: '自己付款，账单到我司'},
            {value: '3', label: '自己付款，账单到他司'},
            {value: '4', label: '我司付款，账单到我司'},
            {value: '5', label: '垫付'},
          ],
          changeContentList: [
            {value: '1', label: '行业比例'},
            {value: '2', label: '付款方式'},
            //{value: '3', label: '企业法人'},
            {value: '3', label: '公司名称'}
          ],
        changeOperator: {
          taskStatus:'',
          changeContentValue: '1',
          payMethodValue:'',//付款方式
          pensionMoneyUseCompanyName:'',//养老金公司名称
          belongsIndustry: '',//所属行业
          companyWorkInjuryPercentage: '',//企业工伤比例
          changeStartMonth: '',//变更开始月份
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          handleReason:'',
          refuseReason: ''
        },
        ruleValidate:{
          changeContentValue:[
            { required: true, message: '请选择变更内容!', trigger: 'change' },
          ],
          taskStatus:[
            { required: true, message: '请选择任务单状态!', trigger: 'change' },
          ],
          belongsIndustry: [
                        { required: true, validator:validateBelongsIndustry, trigger: 'blur' }
                    ],
          companyWorkInjuryPercentage:[
                          { required: true, validator:validateComWorkInjuryPercentage, trigger: 'blur' },
          ],
          changeStartMonth: [
                          { required: true, type: 'date', validator: validateChangeStartMonth, trigger: 'change' }
                    ],
          payMethodValue:[
                    { required: true, type: 'string', validator:validatePayMethodValue, trigger: 'blur' }
          ],
          pensionMoneyUseCompanyName:[
                    { required: true, type: 'string', validator:validatePensionMoneyComName, trigger: 'blur' }
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
          refuseReason:[
                          { type:'string', max:200, message: '最多不超过200个.', trigger: 'blur' }
                       ],
          handleReason:[
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
        this.$router.push({name: 'companytasklist'})
      },
      //查询页面信息
      queryPageInfo(){
        let params = {
          companyTaskId:this.tid,
          operatorType:this.operatorType,
          isComplete:'0'//表示不为空 查询状态不为3的任务:
        }
        let self = this
        CompanyTaskList.getEndPageInfo(params,'change').then(result=>{
        self.comAccountId = result.comAccountId
        self.companyInfo = result.companyInfo
        self.historyRemark = result.historyRemark;
        self.changeOperator = result.changeOperator;
        self.currentStep  =result.changeOperator.taskStatus==null?0:Number(result.changeOperator.taskStatus)
        switch(result.changeOperator.taskStatus) {
                        case '0':
                              self.handDateControl = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true; 
                          break;
                        case '1':
                          self.taskTypeList[0].disabled = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true;
                               self.handDateIsDateOrLabel=false//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
                          break;
                        case '2':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.handDateControl = true;
                           self.finishDateControl=true;
                             self.handDateIsDateOrLabel=false//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
                              self.sendDateIsDateOrLabel=false//送审日期 
                           
                          break;
                        case '3':
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
                      this.changeContentType();
      })

      },
      //变更内容的选择
      changeContentType(){
        let state = this.changeOperator.changeContentValue
        if(state=='1'){
          this.industryRatioShow =true
          this.payMethodShow = false//控制付款方式input
          this.companyNameShow = false//控制养老金公司名称 input
        }else if(state=='2'){
          this.industryRatioShow =false
          this.payMethodShow = true//控制付款方式input
          this.companyNameShow = false//控制养老金公司名称 input
        }else if(state=='3'){
          this.industryRatioShow =false
          this.payMethodShow = false//控制付款方式input
          this.companyNameShow = true//控制养老金公司名称 input
        }
      },
      //任务状态变更
      taskTypeChange(){
          let taskState = this.changeOperator.taskStatus

         //acceptanceDate sendCheckDate finishedDate
         let formObj = this.changeOperator
        if(taskState=='0'){
            this.handDateControl = true;
            this.sendDateControl=true;
            this.finishDateControl=true;
            this.$set(this.changeOperator,'acceptanceDate',null)
             this.$set(this.changeOperator,'sendCheckDate',null)
            this.$set(this.changeOperator,'finishedDate',null)
        }else if(taskState=='1'){
            this.handDateControl = false;
            this.sendDateControl=true;
            this.finishDateControl=true;
            this.$set(this.changeOperator,'sendCheckDate',null)
            this.$set(this.changeOperator,'finishedDate',null)
        }else if(taskState=='2'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=true;
           this.$set(this.changeOperator,'finishedDate',null)
        }else if(taskState=='3'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=false;
        }
      },
      
      //办理
      confirm(){
        let beforeValid = false;
        
        this.$refs['changeOperator'].validate((valid) => {
                    if (valid) {
                        beforeValid = true;
                    }
                })

        if(!beforeValid){
              return;
            }
            let self = this;
            self.$Modal.confirm({
                title: '',
                content: '确认办理吗?',
                //loading:true,
                onOk:function(){
                   let params = self.getParams()
                   
                   CompanyTaskList.updateOrChangeTask(params).then(result=>{
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
      //校验表单数据
      checkData(){
        //暂时只校验 任务单类型和时间的选择
         let formObj = this.changeOperator
          let taskState = formObj.taskStatus
          let result = this.checkChangeCentextIsNotNull()
          
          if(!result)return false
        if(taskState=='3'){
           if(this.isNull(formObj.acceptanceDate)){
             this.$Message.error("请选择受理时间！")
             return false;
           }
           if(this.isNull(formObj.sendCheckDate)){
              this.$Message.error("请选择送审时间！")
               return false;
           }
           if(this.isNull(formObj.finishedDate)){
             this.$Message.error("请选择完成时间！")
              return false;
           }
        }
        if(taskState=='2'){
           if(this.isNull(formObj.acceptanceDate)){
             this.$Message.error("请选择受理时间！")
             return false;
           }
           if(this.isNull(formObj.sendCheckDate)){
              this.$Message.error("请选择送审时间！")
               return false;
           }
        }
        if(taskState=='1'){
           if(this.isNull(formObj.acceptanceDate)){
             this.$Message.error("请选择受审时间！")
             return false;
           }
        }
        return true;
      },
      //检查变更内容是否为空
      checkChangeCentextIsNotNull(){
        let changeOperator =  this.changeOperator;
        let changeContentValue = changeOperator.changeContentValue
        //changeOperator.changeContentValue
        if(changeContentValue=='1'){
            if(this.isNull(changeOperator.belongsIndustry)){
                this.$Message.error('请输入所属行业！')
                return false
            }
            if(this.isNull(changeOperator.companyWorkInjuryPercentage)){
                this.$Message.error('请输入企业工伤比例！')
                return false
            }
            if(this.isNull(changeOperator.changeStartMonth)){
                this.$Message.error('请选择变更开始月份！')
                return false
            }
        }else if(changeContentValue=='2'){
          if(this.isNull(changeOperator.payMethodValue)){
                this.$Message.error('请选择付款方式！')
                return false
            }
        }else if(changeContentValue=='3'){
          if(this.isNull(changeOperator.pensionMoneyUseCompanyName)){
                this.$Message.error('请输入养老金公司名称！')
                return false
            }
        }
       return true
      },
      //判断是否为空的通用方法
      isNull(str){
        if(typeof(str)=="object"){
          return str==null
        }else{
           return (str==null || str.trim()=='')
        }
       
      },
      getParams(){
        //通过任务单的状态 添加受理或者送审或者完成时间
          let formObj = this.changeOperator
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
          }
         let changeContext =  this.getChangeContext()
          let ssComTaskDTO = {
            comAccountId:this.comAccountId,
            companyTaskId: this.tid,
            taskStatus: taskStatus,
            startHandleDate: startHandleDate,
            sendCheckDate: sendCheckDate,
            finishDate: finishDate,
            endDate:endDate,
            handleRemark:formObj.handleReason,
            ...changeContext
           }

           return ssComTaskDTO
      },
      //组装变更内容的JSON 
      getChangeContext(){
        let changeOperator =  this.changeOperator;
        let changeContentValue = changeOperator.changeContentValue
        let changeContext ={}
        changeContext.changeContentValue = changeContentValue;
        
        if(changeContentValue=='1'){ //行业变更
            changeContext.belongsIndustry = changeOperator.belongsIndustry
            changeContext.companyWorkInjuryPercentage = changeOperator.companyWorkInjuryPercentage
            changeContext.startMonth = Utils.formatDate(changeOperator.changeStartMonth,'YYYY-MM-01')

        }else if(changeContentValue=='2'){//付款方式变更
            changeContext.paymentWay = changeOperator.payMethodValue
           
        }else if(changeContentValue=='3'){//公司名称变更
          changeContext.comAccountName = changeOperator.pensionMoneyUseCompanyName
        }
        
        return changeContext
      },
       //批退任务
      refuseTask(){
             let params = {
                    taskIdStr:this.tid,
                    refuseReason:this.changeOperator.refuseReason
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

