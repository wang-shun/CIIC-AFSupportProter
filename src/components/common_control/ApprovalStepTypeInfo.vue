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
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户社保截至日：">
                  <Input v-model="beforeSendInfo.customerSocialSecurityEndDate" placeholder="每月18号"></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款方式：">
                  <Select v-model="beforeSendInfo.payMethodValue" style="width: 100%;" transfer>
                    <Option v-for="item in beforeSendInfo.payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
                  <Select v-model="companyOpenAccountOperator.taskValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyOpenAccountOperator.taskList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="参保户登记码：">
                  <Input v-model="companyOpenAccountOperator.joinSafeguardRegister" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="扣款账号：">
                  <Input v-model="companyOpenAccountOperator.bankCardNumber" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业社保账户名称：">
                  <Input v-model="companyOpenAccountOperator.pensionMoneyUseCompanyName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="结算区县：">
                  <Select v-model="companyOpenAccountOperator.socialSecurityCenterValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyOpenAccountOperator.socialSecurityCenterList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期余额：">
                  <Input v-model="companyOpenAccountOperator.originalSum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期欠费：">
                  <Input v-model="companyOpenAccountOperator.originalArrears" placeholder="请输入..."></Input>
                </Form-item>
              </Col>-->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地：">
                  <Select v-model="companyOpenAccountOperator.resourceValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyOpenAccountOperator.resourceList" :value="item.value" :key="item.value">{{item.label}}</Option>
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
                    <Option v-for="item in companyOpenAccountOperator.giveMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式备注：">
                  <Input v-model="companyOpenAccountOperator.giveMethodNotes" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="给凭证时间：">
                  <DatePicker v-model="companyOpenAccountOperator.giveProofDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>-->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="变更时间：">
                  <DatePicker v-model="companyOpenAccountOperator.changeDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
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
                  <DatePicker v-model="companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
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
                  <Select v-model="companyOpenAccountOperator.taskTypeValue" style="width: 100%;" transfer>
                    <Option v-for="item in companyOpenAccountOperator.taskTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="受理日期：">
                  <Input v-model="companyOpenAccountOperator.acceptanceDate" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="送审日期：">
                  <DatePicker v-model="companyOpenAccountOperator.sendCheckDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="完成日期：">
                  <DatePicker v-model="companyOpenAccountOperator.finishedDate" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="办理原因：">
                  <Input v-model="companyOpenAccountOperator.handleRemark" type="textarea" :rows=4 placeholder="请填写办理原因..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退原因：">
                  <Input v-model="companyOpenAccountOperator.refuseReason" type="textarea" :rows=4 placeholder="请填写批退原因..."></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" @click="confirm">办理</Button>
                <Button type="error" @click="goBack">批退</Button>
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
  import chat from './chat_history/Chat.vue'
  import companyInfo from './CompanyInfo.vue'
  export default {
    name:"employeecommcialprogress3",
    components: {chat, companyInfo},
    props: {
      prevPage: String
    },
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        currentStep: 2,
        companyInfo: {
          customerNumber: 'GS170001',
          customerName: '普思埃商业（上海）有限公司',
          serviceCenter: '大客户2',
          serviceManager: '金翔云'
        },
        beforeSendInfo: {
          customerSocialSecurityEndDate: '',
          payMethodValue: '',
          payMethodList: [
            {value: '1', label: '我司付款，账单到他司'},
            {value: '2', label: '自己付款，账单到我司'},
            {value: '3', label: '自己付款，账单到他司'},
            {value: '4', label: '我司付款，账单到我司'},
            {value: '5', label: '垫付'},
          ]
        },
        companyOpenAccountOperator: {
          taskValue: '',
          taskList: [
            {value: '1', label: '开户'},
            {value: '2', label: '转入'},
          ], //任务
          taskTypeValue:"",//值
          taskTypeList:[
            {value: '0', label: '初始（材料收缴）'},
            {value: '1', label: '受理中'},
            {value: '2', label: '送审中'},
            {value: '3', label: '已完成'},
          ],//任务状态类型
          joinSafeguardRegister: '', //参保户登记码
          bankCardNumber: '', //牡丹卡号
          pensionMoneyUseCompanyName: '', //养老金用公司名称
          socialSecurityCenterValue: '',
          socialSecurityCenterList: [
            {value: '1', label: ''}
          ], //社保中心
          payBank: '', //付款行
          icbcSearchAccount: '', //工行查询账号
          pensionMoneySingleUserName: '', //养老金独立开户用户名
          pensionMoneySinglePassWord: '', //养老金独立开户密码
          //originalSum: '', //初期余额
          //originalArrears: '', //初期欠费
          resourceValue: '',
          resourceList: [
            {value: '1', label: '新开'},
            {value: '2', label: 'AF转入(大库转入)'},
            {value: '3', label: '其他供应商转入'}
          ], //来源地
          resourceNotes: '', //来源地备注
          giveMethodValue: '',
          giveMethodList: [
            {value: '1', label: '交客服'},
            {value: '2', label: '传真'},
            {value: '3', label: '邮寄'}
          ], //交予方式
          giveMethodNotes: '', //交予方式备注
          //giveProofDate: '', //交予凭证时间
          changeDate: '', //变更时间
          recieveDate: '', //收到日期
          moveInDate: '', //转入日期
          belongToIndustries: '', //所属行业
          sufferedOnTheJobPercentage: '', //企业工伤比例
          sufferedOnTheJobPercentageChangeStartMonth: '', //企业工伤比例开始调整月份
          sendedMaterials: [], //发出材料
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          handleRemark:'',//办理原因
          refuseReason: '' //批退原因
        }
      }
    },
    mounted() {

    },
    computed: {

    },
    methods: {
      goBack() {
        this.$router.push({name: this.prevPage});
      },
      confirm(){
        let self = this;
        const title='操作成功！';
        const content = '<p>点击确定后，将自动返回查询列表</p>';
            self.$Modal.success({
                title: title,
                content: content,
                okText: '确定',
                onOk:function(){

                    self.goBack()
                },
                 error:function(error){
                   self.$Message.error('停用失败!');
                   self.$Modal.remove();
               }
            });
      }
    }
  }
</script>
