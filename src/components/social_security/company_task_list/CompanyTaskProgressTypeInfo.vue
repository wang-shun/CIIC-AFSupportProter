<template>
  <Form :label-width=120>
    <Steps :current="currentStep">
      <Step title="材料收集"></Step>
      <Step title="已受理"></Step>
      <Step title="送审中"></Step>
      <Step title="完成"></Step>
    </Steps>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        公司信息
        <div slot="content">
          <company-info :companyInfo="companyInfo"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        前道传递信息
        <div slot="content">
          <Form :label-width=200>
            <Row class="mt20" type="flex" justify="start">
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="客户社保截至日：">
                  <Input v-model="beforeSendInfo.customerSocialSecurityEndDate" placeholder="每月18号"></Input>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="付款方式：">
                  <Select v-model="beforeSendInfo.payMethodValue" style="width: 100%;" transfer>
                    <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="3">
        企业开户\转入操作
        <div slot="content">
          <Form :label-width=200>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="任务：">
                  <Select v-model="companyOpenAccountOperator.taskValue" style="width: 100%;" transfer >
                    <Option v-for="item in taskList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="参保户登记码：">
                  <Input v-model="companyOpenAccountOperator.joinSafeguardRegister" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="牡丹卡号：">
                  <Input v-model="companyOpenAccountOperator.bankCardNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金用公司名称：">
                  <Input v-model="companyOpenAccountOperator.pensionMoneyUseCompanyName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="社保中心(结算区县)：">
                  <Select v-model="companyOpenAccountOperator.socialSecurityCenterValue" style="width: 100%;" transfer>
                    <Option v-for="item in socialSecurityCenterList" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="付款行：">
                  <Input v-model="companyOpenAccountOperator.payBank" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="工行查询账号：">
                  <Input v-model="companyOpenAccountOperator.icbcSearchAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金独立开户用户名：">
                  <Input v-model="companyOpenAccountOperator.pensionMoneySingleUserName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金独立开户密码：">
                  <Input v-model="companyOpenAccountOperator.pensionMoneySinglePassWord" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期余额：">
                  <Input v-model="companyOpenAccountOperator.originalSum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期欠费：">
                  <Input v-model="companyOpenAccountOperator.originalArrears" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地：">
                  <Select v-model="companyOpenAccountOperator.resourceValue" style="width: 100%;" transfer>
                    <Option v-for="item in resourceList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地备注：">
                  <Input v-model="companyOpenAccountOperator.resourceNotes" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式：">
                  <Select v-model="companyOpenAccountOperator.giveMethodValue" style="width: 100%;" transfer>
                    <Option v-for="item in giveMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式备注：">
                  <Input v-model="companyOpenAccountOperator.giveMethodNotes" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="给凭证时间：">
                  <DatePicker v-model="companyOpenAccountOperator.giveProofDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="变更时间：">
                  <DatePicker v-model="companyOpenAccountOperator.changeDate" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="收到日期：">
                  <DatePicker v-model="companyOpenAccountOperator.recieveDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="转入日期：">
                  <DatePicker v-model="companyOpenAccountOperator.moveInDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="所属行业：">
                  <Input v-model="companyOpenAccountOperator.belongToIndustries" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业工伤比例：">
                  <Input v-model="companyOpenAccountOperator.sufferedOnTheJobPercentage" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业工伤比例开始调整月份：">
                  <DatePicker v-model="companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth" type="month" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="发出材料：">
                  <CheckboxGroup v-model="companyOpenAccountOperator.sendedMaterials">
                    <Checkbox label="正式通知书">
                      <span>正式通知书</span>
                    </Checkbox>
                    <Checkbox label="预生成通知书">
                      <span>预生成通知书</span>
                    </Checkbox>
                    <Checkbox label="收据">
                      <span>收据</span>
                    </Checkbox>
                    <Checkbox label="银行对账单">
                      <span>银行对账单</span>
                    </Checkbox>
                    <Checkbox label="汇总表">
                      <span>汇总表</span>
                    </Checkbox>
                    <Checkbox label="实时表">
                      <span>实时表</span>
                    </Checkbox>
                  </CheckboxGroup>
                </Form-item>
              </Col>
            </Row>
            <Row class="mt20" type="flex" justify="start">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="任务状态：">
                  <Select v-model="companyOpenAccountOperator.taskTypeValue" style="width: 100%;" transfer @on-change="taskTypeChange"	>
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="受理日期：">
                  <DatePicker v-model="companyOpenAccountOperator.acceptanceDate" placeholder="选择日期" :disabled="handDateControl"  style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="送审日期：">
                  <DatePicker v-model="companyOpenAccountOperator.sendCheckDate" placement="bottom-end" placeholder="选择日期" :disabled="sendDateControl" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="完成日期：">
                  <DatePicker v-model="companyOpenAccountOperator.finishedDate" placement="bottom-end" placeholder="选择日期" :disabled="finishDateControl" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="办理备注：">
                  <Input v-model="companyOpenAccountOperator.handleReason" type="textarea" :rows=4 placeholder="请填写办理原因..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退备注：">
                  <Input v-model="companyOpenAccountOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="confirm">办理</Button>
                <Button type="error" @click="refuseTask">批退</Button>
                <Button type="warning" @click="goBack">关闭/返回</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </Form>
</template>
<script>
  import chat from '../../../components/commoncontrol/chathistory/chat.vue'
  import companyInfo from '../../../components/commoncontrol/companyinfo.vue'
  import {CompanyTaskList} from '../../../module/social_security/company_task_list'
  import Utils from '../../../lib/utils'
  export default {
    name:"employeecommcialprogress3",
    components: {chat, companyInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        currentStep: 0,
        comAccountId:'',//社保账户表ID
         tid: this.$route.query.tid,
         handDateControl:false,//受理日期 是否可编辑 
         sendDateControl:false,//送审日期 是否可编辑
         finishDateControl:false,//完成日期  是否可编辑
        companyInfo: {
          customerNumber: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          serviceCenter: '大客户2',
          serviceManager: '金翔云'
        },
         payMethodList: [
            {value: '1', label: '我司付款，账单到他司'},
            {value: '2', label: '自己付款，账单到我司'},
            {value: '3', label: '自己付款，账单到他司'},
            {value: '4', label: '我司付款，账单到我司'},
            {value: '5', label: '垫付'},
          ],
        beforeSendInfo: {
          customerSocialSecurityEndDate: '',
          payMethodValue: ''
        },
        resourceList: [
            {value: '1', label: '新开'},
            {value: '2', label: 'AF转入(大库转入)'},
            {value: '3', label: '其他供应商转入'}
          ], //来源地
          taskList: [
            {value: '1', label: '开户'},
            {value: '2', label: '转入'},
          ], //任务
           socialSecurityCenterList: [
            {value: '1', label: '徐汇区'},
            {value: '2', label: '长宁区'},
            {value: '3', label: '浦东区'},
            {value: '4', label: '卢湾区'},
            {value: '5', label: '静安区'},
            {value: '6', label: '黄浦区'}
          ], //社保中心
           giveMethodList: [
            {value: '1', label: '交客服'},
            {value: '2', label: '传真'},
            {value: '3', label: '邮寄'}
          ], //交予方式
          taskTypeList:[
            {value: '0',label: '初始(材料收缴)',disabled:false},
            {value: '1', label: '受理中',disabled:false},
            {value: '2', label: '送审中',disabled:false},
            {value: '3', label: '已完成',disabled:false},
          ],//任务状态类型


        companyOpenAccountOperator: {
          taskValue: '',//任务类型
          joinSafeguardRegister: '', //参保户登记码
          bankCardNumber: '', //牡丹卡号
          pensionMoneyUseCompanyName: '', //养老金用公司名称
          socialSecurityCenterValue: '',
          payBank: '', //付款行
          icbcSearchAccount: '', //工行查询账号
          pensionMoneySingleUserName: '', //养老金独立开户用户名
          pensionMoneySinglePassWord: '', //养老金独立开户密码
          originalSum: '', //初期余额
          originalArrears: '', //初期欠费
          resourceValue: '',
          resourceNotes: '', //来源地备注
          giveMethodValue: '',
          giveMethodNotes: '', //交予方式备注
          giveProofDate: '', //交予凭证时间
          changeDate: '', //变更时间
          recieveDate: '', //收到日期
          moveInDate: '', //转入日期
          sufferedOnTheJobPercentageId:'',//工伤历史变更表的 iD
          belongToIndustries: '', //所属行业
          sufferedOnTheJobPercentage: '', //企业工伤比例
          sufferedOnTheJobPercentageChangeStartMonth: '', //企业工伤比例开始调整月份
          sendedMaterials: [], //发出材料
          taskTypeValue:"",//任务状态值
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          handleReason:'',//办理原因
          refuseReason: '' //批退原因
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
        this.$router.push({name: 'companytasklist'});
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
                   CompanyTaskList.addOrUpdate(params).then(result=>{
                    if(result){
                       self.$Message.success('办理成功!');
                       self.goBack()
                    }else{
                      self.$Message.error('办理失败!');
                    }
                    
                   }).catch(error=>{
                     console.log(error)
                   })
                   
                },
                 error:function(error){
                   self.$Message.error('办理失败!');
                   self.$Modal.remove();
               }
            });
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
      //查询页面公司信息和前道传递信息
      queryPageInfo(){
        let params = {companyTaskId:this.tid}
        let self = this
        CompanyTaskList.getComInfoAndPayWay(params).then(result=>{
        self.comAccountId = result.comAccountId
        self.companyInfo = result.companyInfo
        self.beforeSendInfo = result.beforeSendInfo
        self.companyOpenAccountOperator  =result.companyOpenAccountOperator
        self.currentStep = Number(result.companyTaskStatus)
        switch(result.companyOpenAccountOperator.taskTypeValue) {
                        case '0':
                        
                              self.handDateControl = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true;
                          break;
                        case '1':
                          self.taskTypeList[0].disabled = true;
                              self.sendDateControl=true;
                              self.finishDateControl=true;
                          break;
                        case '2':
                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.handDateControl = true;
                           self.finishDateControl=true;
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
      //获得办理参数
      getParams(){
         let ssAccountRatio= {
            ssAccountRatioId: this.companyOpenAccountOperator.sufferedOnTheJobPercentageId,
            industryCategory: this.companyOpenAccountOperator.belongToIndustries,
            comRatio: this.companyOpenAccountOperator.sufferedOnTheJobPercentage,
            startMonth: this.companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth==null || this.companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth==''?'':Utils.formatDate(this.companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth,'YYYY-MM')
            }
        let ssComAccountDTO={
              comAccountId: this.comAccountId,
              ssAccount: this.companyOpenAccountOperator.joinSafeguardRegister,//参保户登记码
              bankAccount: this.companyOpenAccountOperator.bankCardNumber,
              comAccountName: this.companyOpenAccountOperator.pensionMoneyUseCompanyName,
              settlementArea: this.companyOpenAccountOperator.socialSecurityCenterValue,
              paymentBank: this.companyOpenAccountOperator.payBank,
              paymentWay: this.beforeSendInfo.payMethodValue,
              ssUsername: this.companyOpenAccountOperator.pensionMoneySingleUserName,
              ssPwd: this.companyOpenAccountOperator.pensionMoneySinglePassWord,
              initialBalance: this.companyOpenAccountOperator.originalSum,
              initialDebt: this.companyOpenAccountOperator.originalArrears,
              originPlace: this.companyOpenAccountOperator.resourceValue,
              originPlaceRemark:  this.companyOpenAccountOperator.resourceNotes,
              queryAccount: this.companyOpenAccountOperator.icbcSearchAccount,
              deliverWay: this.companyOpenAccountOperator.giveMethodValue,
              deliverWayRemark: this.companyOpenAccountOperator.giveMethodNotes,
              provideCertificateTime: this.companyOpenAccountOperator.giveProofDate==null || this.companyOpenAccountOperator.giveProofDate==''?'':Utils.formatDate(this.companyOpenAccountOperator.giveProofDate,'YYYY-MM-DD'),
              changeTime: this.companyOpenAccountOperator.changeDate==null ||this.companyOpenAccountOperator.changeDate=='' ?'':Utils.formatDate(this.companyOpenAccountOperator.changeDate,'YYYY-MM-DD HH:mm'),
              receiveDate: this.companyOpenAccountOperator.recieveDate==null || this.companyOpenAccountOperator.recieveDate==''?'':Utils.formatDate(this.companyOpenAccountOperator.recieveDate,'YYYY-MM-DD'),
              intoDate: this.companyOpenAccountOperator.moveInDate==null || this.companyOpenAccountOperator.moveInDate==''?'':Utils.formatDate(this.companyOpenAccountOperator.moveInDate,'YYYY-MM-DD'),
              dispatchMaterial: JSON.stringify(this.companyOpenAccountOperator.sendedMaterials),
              expireDate:this.beforeSendInfo.customerSocialSecurityEndDate
          }
          //到期时间和支付方式  前道传过来的数据
          let taskFormContent = {
            expireDate:this.beforeSendInfo.customerSocialSecurityEndDate,
            paymentWay:this.beforeSendInfo.payMethodValue
          }

          //通过任务单的状态 添加受理或者送审或者完成时间
          let taskStatus = this.companyOpenAccountOperator.taskTypeValue
          let startHandleDate = null
          let sendCheckDate = null
          let finishDate = null
          if(taskStatus=='1'){
            startHandleDate = Utils.formatDate(this.companyOpenAccountOperator.acceptanceDate,'YYYY-MM-DD')
          }else if(taskStatus=='2'){
            startHandleDate = Utils.formatDate(this.companyOpenAccountOperator.acceptanceDate,'YYYY-MM-DD')
            sendCheckDate = Utils.formatDate(this.companyOpenAccountOperator.sendCheckDate,'YYYY-MM-DD')
          }else if(taskStatus=='3'){
            startHandleDate = Utils.formatDate(this.companyOpenAccountOperator.acceptanceDate,'YYYY-MM-DD')
            sendCheckDate = Utils.formatDate(this.companyOpenAccountOperator.sendCheckDate,'YYYY-MM-DD')
            finishDate = Utils.formatDate(this.companyOpenAccountOperator.finishedDate,'YYYY-MM-DD')
          }
          //判断状态
          let ssComTaskDTO = {
            companyTaskId: this.tid,
            taskCategory: this.companyOpenAccountOperator.taskValue,
            taskFormContent: JSON.stringify(taskFormContent),
            taskStatus: taskStatus,
            startHandleDate: startHandleDate,
            sendCheckDate: sendCheckDate,
            finishDate: finishDate,
            handleRemark: this.companyOpenAccountOperator.handleReason,
            rejectionRemark: this.companyOpenAccountOperator.refuseReason,
           }
          return {...ssComTaskDTO,...ssComAccountDTO,...ssAccountRatio}
      },
      //校验表单数据
      checkData(){
        //暂时只校验 任务单类型和时间的选择
        let taskState = this.companyOpenAccountOperator.taskTypeValue
         let formObj = this.companyOpenAccountOperator
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
        }
        if(taskState=='2'){
           if(formObj.acceptanceDate==null || formObj.acceptanceDate==''){
             this.$Message.error("请选择受审时间！")
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
      //任务类型发生变化
      taskTypeChange(){
        let taskState = this.companyOpenAccountOperator.taskTypeValue
         //acceptanceDate sendCheckDate finishedDate
         let formObj = this.companyOpenAccountOperator
        if(taskState=='0'){
            this.handDateControl = true;
            this.sendDateControl=true;
            this.finishDateControl=true;
            formObj.acceptanceDate = null;
            formObj.sendCheckDate = null;
            formObj.finishedDate =null;
        }else if(taskState=='1'){
            this.handDateControl = false;
            this.sendDateControl=true;
            this.finishDateControl=true;
             formObj.sendCheckDate = null;
             formObj.finishedDate =null;
        }else if(taskState=='2'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=true;
             formObj.finishedDate =null;
        }else if(taskState=='3'){
            this.handDateControl = false;
            this.sendDateControl=false;
            this.finishDateControl=false;
        }
      }
    }
  }
</script>
