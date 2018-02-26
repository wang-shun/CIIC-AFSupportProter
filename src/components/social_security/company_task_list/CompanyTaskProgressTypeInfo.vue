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
          <Form ref="beforeSendInfo" :model="beforeSendInfo" :rules="ruleValidate" :label-width=200>
            <Row class="mt20" type="flex" justify="start">
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="客户社保截至日：" prop="customerSocialSecurityEndDate">
                  <Input v-model="beforeSendInfo.customerSocialSecurityEndDate" placeholder="每月18号"></Input>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="付款方式：" prop="payMethodValue">
                  <Select v-model="beforeSendInfo.payMethodValue" style="width: 100%;" transfer>
                    <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="账单接收方：" prop="billReceiverValue">
                  <Select v-model="beforeSendInfo.billReceiverValue" style="width: 100%;" transfer>
                    <Option v-for="item in billReceiverList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
          <Form  ref="companyOpenAccountOperator" :model="companyOpenAccountOperator" :rules="ruleValidate" :label-width=200>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="任务：" prop="taskValue">
                  <Select v-model="companyOpenAccountOperator.taskValue" style="width: 100%;" transfer >
                    <Option v-for="item in taskList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="参保户登记码：" prop="joinSafeguardRegister">
                  <Input v-model="companyOpenAccountOperator.joinSafeguardRegister" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="牡丹卡号：" prop="bankCardNumber">
                  <Input v-model="companyOpenAccountOperator.bankCardNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金用公司名称：" prop="pensionMoneyUseCompanyName">
                  <Input v-model="companyOpenAccountOperator.pensionMoneyUseCompanyName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="社保中心(结算区县)：" prop="socialSecurityCenterValue">
                  	<AutoComplete
                      v-model="companyOpenAccountOperator.socialSecurityCenterValue"
                      placeholder="请选择">
                      <div class="demo-auto-complete-item">
                          <Option v-for="option in socialSecurityCenterList" :value="option.label" :key="option.label">
                              <span class="demo-auto-complete-title">{{ option.label }}</span>
                          </Option>
                      </div>
                  </AutoComplete>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="付款行：" prop="payBank">
                  <Input v-model="companyOpenAccountOperator.payBank" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="工行查询账号：" prop="icbcSearchAccount">
                  <Input v-model="companyOpenAccountOperator.icbcSearchAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金独立开户用户名：" prop="pensionMoneySingleUserName">
                  <Input v-model="companyOpenAccountOperator.pensionMoneySingleUserName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金独立开户密码：" prop="pensionMoneySinglePassWord">
                  <Input v-model="companyOpenAccountOperator.pensionMoneySinglePassWord" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期余额：" prop="originalSum">
                  <Input v-model="companyOpenAccountOperator.originalSum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期欠费："  prop="originalArrears">
                  <Input v-model="companyOpenAccountOperator.originalArrears" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地：" prop="resourceValue">
                  <Select v-model="companyOpenAccountOperator.resourceValue" style="width: 100%;" transfer>
                    <Option v-for="item in resourceList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地备注：" prop="resourceNotes">
                  <Input v-model="companyOpenAccountOperator.resourceNotes" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式：" prop="giveMethodValue">
                  <Select v-model="companyOpenAccountOperator.giveMethodValue" style="width: 100%;" transfer>
                    <Option v-for="item in giveMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式备注：" prop="giveMethodNotes">
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
                <Form-item label="所属行业："  prop="belongToIndustries">
                  <Input v-model="companyOpenAccountOperator.belongToIndustries" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业工伤比例："  prop="sufferedOnTheJobPercentage">
                  <Input v-model="companyOpenAccountOperator.sufferedOnTheJobPercentage" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业工伤比例开始调整月份：" prop="sufferedOnTheJobPercentageChangeStartMonth">
                  <DatePicker v-model="companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth" type="month" format="yyyyMM" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="发出材料：" prop="sendedMaterials">
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
                <Form-item label="任务状态：" prop="taskTypeValue">
                  <Select v-model="companyOpenAccountOperator.taskTypeValue" style="width: 100%;" transfer @on-change="taskTypeChange"	>
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="受理日期：" prop="acceptanceDate">
                  <DatePicker v-if="handDateIsDateOrLabel" v-model="companyOpenAccountOperator.acceptanceDate" placeholder="选择日期" :disabled="handDateControl"  style="width: 100%;" transfer></DatePicker>
                  <label v-else>{{companyOpenAccountOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="送审日期：" prop="sendCheckDate">
                  <DatePicker v-if="sendDateIsDateOrLabel" v-model="companyOpenAccountOperator.sendCheckDate" placement="bottom-end" placeholder="选择日期" :disabled="sendDateControl" style="width: 100%;" transfer></DatePicker>
                   <label v-else>{{companyOpenAccountOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="完成日期："  prop="finishedDate">
                  <DatePicker v-if="finishDateIsDateOrLabel" v-model="companyOpenAccountOperator.finishedDate" placement="bottom-end" placeholder="选择日期" :disabled="finishDateControl" style="width: 100%;" transfer></DatePicker>
                  <label v-else>{{companyOpenAccountOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="办理备注：" prop="handleReason">
                  <Input v-model="companyOpenAccountOperator.handleReason" type="textarea" :rows=4 placeholder="请填写办理原因..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退备注：" prop="refuseReason">
                  <Input v-model="companyOpenAccountOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="confirm">办理</Button>
                <Button type="primary" @click="revoke">撤销</Button>
                <Button type="error" @click="refuseTask">批退</Button>
                <Button type="warning" @click="goBack">返回</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>
  </Form>
</template>
<script>
  import chat from '../../common_control/chat_history/Chat.vue'
  import companyInfo from '../../common_control/CompanyInfo.vue'
  import {CompanyTaskList} from '../../../api/social_security/company_task_list/company_task_list'
  import Utils from '../../../lib/utils'
  export default {
    name:"employeecommcialprogress3",
    components: {chat, companyInfo},
    data() {
       const validateBankCardNumber = (rule, value, callback) => {
                if (!value.trim()) {
                   return callback(new Error('该项不能为空！'));
                }
                let rex = /^\d*$/
                  if(!rex.test(value)) {
                        callback(new Error('请输入纯数字.'));
                    }else if(value.trim()!=value){
                        callback(new Error('请输入纯数字.'));
                   } else {
                        if (value.length > 20) {
                        callback(new Error('长度不能超过20位.'));
                        } else {
                            callback();
                        }
                    }
            };
            //用户名和密码
       const validateUserNameAndPsw=(rule, value, callback)=>{

                if (!value.trim()) {
                  return callback(new Error('该项不能为空！'));
                }
                let regex=/^[0-9A-Za-z_]{1,50}$/ //数字、字母、下划线
                if (!regex.test(value)) {
                  return callback(new Error('只能包含数字,字母或下划线.'));
                }
                if(value.length>20){
                  return callback(new Error('长度不能超过20位.'));
                }


                 callback();
       };
       //初始余额和欠费
       const validateUserMoney=(rule, value, callback)=>{

               var rex = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
              if(value==null || value.trim()==""){
                callback();
                return;
              }
              if(!rex.test(value)){
                  callback(new Error('请输入正确的金钱格式.'));
                }else{
                    if(value.length > 20){
                        callback(new Error('长度不能超过20位.'));
                    }else{
                         callback();
                    }
               }
       };
      //工伤比例
       const validateSufferedOnTheJobPercentage=(rule, value, callback)=>{

               var rex = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
               if (value==null || value.trim()=="") {
                     callback(new Error('该项不能为空！'));
                }else if(!rex.test(value)){
                    callback(new Error('请输入正确的格式.'));
                }else{
                    if(value.length > 20){
                       callback(new Error('长度不能超过20位.'));
                    }else{
                         callback();
                    }
               }
       };
        //受审日期
       const validateAcceptanceDate=(rule, value, callback)=>{

            if(this.companyOpenAccountOperator.taskTypeValue=='0'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 this.companyOpenAccountOperator.acceptanceDate=''
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
            if(self.companyOpenAccountOperator.taskTypeValue=='0'|| self.companyOpenAccountOperator.taskTypeValue=='1'){
               callback();
            }else{
              if(value==null || value==''){
                if(value==null){
                 self.companyOpenAccountOperator.sendCheckDate=''
                }
                return callback(new Error('请选择送审时间.'));
              }else{
                callback();
              }
            }
       };
        //完成日期
       const validateFinishedDate=(rule, value, callback)=>{

            if(this.companyOpenAccountOperator.taskTypeValue=='0'|| this.companyOpenAccountOperator.taskTypeValue=='1'|| this.companyOpenAccountOperator.taskTypeValue=='2'){
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
        currentStep: 0,
        comAccountId:'',//社保账户表ID
         tid: this.$route.query.tid,
         handDateControl:false,//受理日期 是否可编辑 更换状态时判断
         sendDateControl:false,//送审日期 是否可编辑 更换状态时判断
         finishDateControl:false,//完成日期  是否可编辑 更换状态时判断

         handDateIsDateOrLabel:false,//受理日期 查询时判断是否可编辑 不可编辑为label 否则为date标签
         sendDateIsDateOrLabel:false,//送审日期
         finishDateIsDateOrLabel:false,//完成日期

        companyInfo: {
          customerNumber: '',
          customerName: '',
          serviceCenter: '',
          serviceManager: ''
        },
         payMethodList: [
            {value: '1', label: '我司代付款'},
            {value: '2', label: '客户自付'},
            {value: '3', label: '我司垫付'},
          ],
          billReceiverList:[
             {value: '1', label: '我司'},
             {value: '2', label: '客户公司'},
          ],
        beforeSendInfo: {
          customerSocialSecurityEndDate: '',
          payMethodValue: '',
          billReceiverValue:'',
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
            {value: '1', label: '徐汇'},
            {value: '2', label: '长宁'},
            {value: '3', label: '浦东'},
            {value: '4', label: '卢湾'},
            {value: '5', label: '静安'},
            {value: '6', label: '黄浦'},
            {value: '', label: '杨浦'},
            {value: '', label: '普陀'},
            {value: '', label: '宝山'},
            {value: '', label: '虹口'},
            {value: '', label: '闵行'},
            {value: '', label: '松江'},
            {value: '', label: '嘉定'},
            {value: '', label: '青浦'},
            {value: '', label: '奉贤'},
            {value: '', label: '崇明'},
            {value: '', label: '金山'},
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
          socialSecurityCenterValue: '',//社保中心
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
        },
        ruleValidate: {
                    customerSocialSecurityEndDate:[
                        { required: true, message: '请选择社保截止日期！', trigger: 'blur' }
                    ],
                    payMethodValue:[
                        { required: true, message: '请选择付款方式！', trigger: 'change' }
                    ],
                    billReceiverValue:[
                        { required: true, message: '请选择账单接收方！', trigger: 'change' }
                    ],
                    taskValue: [
                        { required: true, message: '请选择任务状态！', trigger: 'blur' }
                    ],
                    joinSafeguardRegister: [
                        { required: true, message: '该项不能为空!', trigger: 'blur' },
                        { max:20, message: '最多不超过20个.', trigger: 'blur' }
                    ],
                     bankCardNumber: [
                        { required: true,validator: validateBankCardNumber, trigger: 'blur' }

                    ],
                    pensionMoneyUseCompanyName: [
                        { required: true, message: '该项不能为空!', trigger: 'blur' },
                        { max:20, message: '最多不超过20个.', trigger: 'blur' }
                    ],
                    socialSecurityCenterValue: [
                        { required: true, message: '请选择社保中心!', trigger: 'blur' },
                         { required: true, message: '请选择社保中心!', trigger: 'change' }
                    ],
                    icbcSearchAccount: [
                        { required: true, message: '该项不能为空!', trigger: 'blur' },
                        { type:'string',max:20, message: '最多不超过20个.', trigger: 'blur' }
                    ],

                    payBank: [
                        { required: true, message: '该项不能为空!', trigger: 'blur' },
                        { type:'string', max:20, message: '最多不超过20个.', trigger: 'blur' }
                    ],
                    pensionMoneySingleUserName: [
                        { required: true, validator: validateUserNameAndPsw, trigger: 'blur' },

                    ],
                    pensionMoneySinglePassWord: [
                        { required: true, validator: validateUserNameAndPsw, trigger: 'blur' },

                    ],
                    originalSum:[
                      {validator: validateUserMoney, trigger: 'blur'}
                    ],
                    originalArrears:[
                      {validator: validateUserMoney, trigger: 'blur'}
                      ],
                      resourceValue: [
                        { required: true, message: '请选择来源地!', trigger: 'change' }
                    ],
                    resourceNotes: [
                        { type:'string', max:50, message: '最多不超过50个.', trigger: 'blur' }
                    ],
                     giveMethodValue: [
                        { required: true, message: '请选择交予方式!', trigger: 'change' }
                    ],
                     giveMethodNotes: [
                        {type:'string', max:100, message: '最多不超过100个.', trigger: 'blur' }
                    ],
                    belongToIndustries: [
                       { required: true, message: '该项不能为空!', trigger: 'blur' },
                        {type:'string', max:10, message: '最多不超过10位.', trigger: 'blur' }
                    ],
                    sufferedOnTheJobPercentage:[
                      {required:true,validator: validateSufferedOnTheJobPercentage, trigger: 'blur'}
                    ],
                    sufferedOnTheJobPercentageChangeStartMonth: [
                        { required: true, type: 'date', message: '请选择变更开始调整月份.', trigger: 'change' }
                    ],
                    taskTypeValue: [
                       { required: true, message: '该项不能为空!', trigger: 'blur' }
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
                },
      }
    },
    mounted() {
      this.queryPageInfo()
    },
    computed: {

    },
    methods: {
      goBack() {
        this.$router.push({name: 'companyTaskList'});
      },
      //办理
      confirm(){
        let beforeValid = false;

        this.$refs['beforeSendInfo'].validate((valid) => {
                    if (valid) {
                        beforeValid = true;
                    }
                })
        let companyOpenValid = false;
         this.$refs['companyOpenAccountOperator'].validate((valid) => {
                    if (valid) {
                        companyOpenValid = true;
                    }
                })
            if(!beforeValid || !companyOpenValid){
              return;
            }
            let self = this;
            self.$Modal.confirm({
                title: '',
                content: '确认办理吗?',
                //loading:true,
                onOk:function(){
                   let params = self.getParams()
                   CompanyTaskList.addOrUpdate(params).then(result=>{
                    if(result.result){
                       if(result.message=='正常'){
                          self.$Message.success('办理成功!');
                          self.goBack()
                       }else{
                         alert(result.message);
                       }
                        
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
        if(this.companyOpenAccountOperator.refuseReason=='' || typeof(this.companyOpenAccountOperator.refuseReason)=='undefined'){
          this.$Message.warning('请输入批退原因！')
          return
        }
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
        let params = {
          comTaskId:this.tid,
           isComplete:'0'//表示不为空 查询状态不为3的任务:
        }
        let self = this
        CompanyTaskList.getComInfoAndPayWay(params).then(result=>{
        self.comAccountId = result.comAccountId
        self.companyInfo = result.companyInfo
        self.beforeSendInfo = result.beforeSendInfo
        self.companyOpenAccountOperator  =result.companyOpenAccountOperator
        self.currentStep = Number(result.companyTaskStatus)
        switch(result.companyOpenAccountOperator.taskTypeValue) {
                        case '0':
                           self.handDateIsDateOrLabel = true;
                           self.sendDateIsDateOrLabel=true;
                           self.finishDateIsDateOrLabel=true;
                          break;
                        case '1':
                          self.taskTypeList[0].disabled = true;
                              self.sendDateIsDateOrLabel=true;
                           self.finishDateIsDateOrLabel=true;
                          break;
                        case '2':

                           self.taskTypeList[0].disabled = true;
                           self.taskTypeList[1].disabled = true;
                           self.finishDateIsDateOrLabel=true;

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
              companyId:this.companyInfo.customerNumber,
              ssAccount: this.companyOpenAccountOperator.joinSafeguardRegister,//参保户登记码
              bankAccount: this.companyOpenAccountOperator.bankCardNumber,
              comAccountName: this.companyOpenAccountOperator.pensionMoneyUseCompanyName,
              settlementArea: this.companyOpenAccountOperator.socialSecurityCenterValue,
              paymentBank: this.companyOpenAccountOperator.payBank,
              paymentWay: this.beforeSendInfo.payMethodValue,
              billReceiver:this.beforeSendInfo.billReceiverValue,
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
            paymentWay:this.beforeSendInfo.payMethodValue,
            billReceiver:this.beforeSendInfo.billReceiverValue
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
            comTaskId: this.tid,
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
        this.$router.push({name:'refresh',query:{operatorType:this.operatorType,tid:this.tid,name:'companyTaskProgressTypeInfo'}})
      }
    }
  }
</script>
