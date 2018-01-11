<template>
  <Form :label-width=120>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        公司信息
        <div slot="content">
          <company-info :companyInfo="companyInfo"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <Table class="mt20" border :columns="operatorMaterials.operatorMaterialListColumns" :data="operatorMaterialListData" ref="materialData"></Table>
        </div>
      </Panel>
      <Panel name="3">
        前道传递信息
        <div slot="content">
          <Form :label-width=200>
            <Row class="mt20" type="flex" justify="start">
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="客户社保截至日：">
                    <label>{{beforeSendInfo.customerSocialSecurityEndDate}}</label>
                    <!-- <Input v-model="beforeSendInfo.customerSocialSecurityEndDate" placeholder="每月18号"></Input> -->
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="付款方式：">
                     <label>{{getPayMethodValue()}}</label>
                  </Select>
                </Form-item>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="4">
        企业开户\转入操作
        <div slot="content">
          <Form :label-width=200>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="任务：">
                     <label>{{companyOpenAccountOperator.taskValue==1?'开户':companyOpenAccountOperator.taskValue==2?'转入':''}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="参保户登记码：">
                     <label>{{companyOpenAccountOperator.joinSafeguardRegister}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="牡丹卡号：">
                    <label>{{companyOpenAccountOperator.bankCardNumber}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金用公司名称：">
                    <label>{{companyOpenAccountOperator.pensionMoneyUseCompanyName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="社保中心(结算区县)：">
                    <label>{{companyOpenAccountOperator.socialSecurityCenterValue}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="付款行：">
                     <label>{{companyOpenAccountOperator.payBank}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="工行查询账号：">
                     <label>{{companyOpenAccountOperator.icbcSearchAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金独立开户用户名：">
                    <label>{{companyOpenAccountOperator.pensionMoneySingleUserName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="养老金独立开户密码：">
                    <label>{{companyOpenAccountOperator.pensionMoneySinglePassWord}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期余额：">
                    <label>{{companyOpenAccountOperator.originalSum}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="初期欠费：">
                    <label>{{companyOpenAccountOperator.originalArrears}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地：">
                    <label>{{getResourceValue()}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="来源地备注：">
                  <label>{{companyOpenAccountOperator.resourceNotes}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式：">
                      <label>{{getGiveMethodValue()}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="交予方式备注：">
                    <label>{{companyOpenAccountOperator.giveMethodNotes}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="给凭证时间：">
                     <label>{{companyOpenAccountOperator.giveProofDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="变更时间：">
                     <label>{{companyOpenAccountOperator.changeDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="收到日期：">
                      <label>{{companyOpenAccountOperator.recieveDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="转入日期：">
                    <label>{{companyOpenAccountOperator.moveInDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="所属行业：">
                     <label>{{companyOpenAccountOperator.belongToIndustries}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业工伤比例：">
                     <label>{{companyOpenAccountOperator.sufferedOnTheJobPercentage}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业工伤比例开始调整月份：">
                    <label>{{companyOpenAccountOperator.sufferedOnTheJobPercentageChangeStartMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="发出材料：">
                  <CheckboxGroup v-model="companyOpenAccountOperator.sendedMaterials">
                    <Checkbox label="正式通知书" :disabled="true">
                      <span>正式通知书</span>
                    </Checkbox>
                    <Checkbox label="预生成通知书" :disabled="true">
                      <span>预生成通知书</span>
                    </Checkbox>
                    <Checkbox label="收据" :disabled="true">
                      <span>收据</span>
                    </Checkbox>
                    <Checkbox label="银行对账单" :disabled="true">
                      <span>银行对账单</span>
                    </Checkbox>
                    <Checkbox label="汇总表" :disabled="true">
                      <span>汇总表</span>
                    </Checkbox>
                    <Checkbox label="实时表" :disabled="true">
                      <span>实时表</span>
                    </Checkbox>
                  </CheckboxGroup>
                </Form-item>
              </Col>
            </Row>
            <Row class="mt20" type="flex" justify="start">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="任务状态：">
                   <label>{{getTaskTypeValue()}}</label>
                  <!-- <Select v-model="companyOpenAccountOperator.taskTypeValue" style="width: 100%;" transfer :disabled="true">
                    <Option v-for="item in taskTypeList" :value="item.value" :key="item.value" :disabled="item.disabled">{{item.label}}</Option>
                  </Select> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="受理日期：">
                     <label>{{companyOpenAccountOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="送审日期：">
                     <label>{{companyOpenAccountOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="完成日期：">
                      <label>{{companyOpenAccountOperator.finishedDate}}</label>
                </Form-item>
              </Col>

              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="办理备注：">
                      <label>{{companyOpenAccountOperator.handleReason==''?'无':companyOpenAccountOperator.handleReason}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退备注：">
                     <label>{{companyOpenAccountOperator.refuseReason==''?'无':companyOpenAccountOperator.refuseReason}}</label>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:16}" class="tr">
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
    components: {companyInfo},
    data() {
      return {
        collapseInfo: [1, 2, 3,4], //展开栏
        comAccountId:'',//社保账户表ID
         tid: this.$route.query.tid,
         source:this.$route.query.source,
        companyInfo: {
          customerNumber: '',
          customerName: '',
          serviceCenter: '',
          serviceManager: ''
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
            {value: '0',label: '初始(材料收缴)'},
            {value: '1', label: '受理中'},
            {value: '2', label: '送审中'},
            {value: '3', label: '已完成'},
            {value: '4', label: '批退'}
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
        },
        operatorMaterialListData:[],
        operatorMaterials: {
          operatorMaterialListColumns: [
            {title: '材料名称', key: 'material', align: 'center', className: 'mw100',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h(params.row.isLink ? 'a' : 'span', {props: {},
                    on: {
                      click: () => {

                      }
                    }
                  }, params.row.material)
                ])
              }
            },
            {title: '材料提交时间', key: 'materialCommitDate', align: 'center', className: 'mw150',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.materialCommitDate),
                ]);
              }
            },
            {title: '材料类型', key: 'materialType', align: 'center', className: 'mw100',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.materialType)
                ])
              }
            },
            {title: '材料收到时间', key: 'materialReciveDate', align: 'center', className: 'mw150',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'center'}}, [
                  h('span', params.row.materialReciveDate),
                ]);
              }
            },
            {title: '状态', key: 'materialReciveDate', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', [
                  h('span',  params.row.state=='0'?'未签收':params.row.state=='1'?'已签收':params.row.state=='2'?'材料不齐全':'')
                  ]);
              }
            },
            {title: '备注说明', key: 'notes',align: 'center',className: 'mw300',
              render: (h, params) => {
                return h('div', [
                  h('span', params.row.notes)
                ]);
              }
            }
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
        window.history.go(-1)
       // this.$router.push({name: 'companyTaskList'});
      },
      //查询页面公司信息和前道传递信息
      queryPageInfo(){

        let isComplete = ''
        //代表已完成查看
        if(this.source=='0'){
          isComplete = '3'
        }else if(this.source=='1'){//代表批退页面过来的查看
          isComplete = '4'
        }

        let params = {
          comTaskId:this.tid,
          operatorType:'1',
           isComplete:isComplete//0代表查看已完成 4代表查看批退
        }
        let self = this
        CompanyTaskList.getCompanyInfoAndMaterial(params).then(result=>{

            //获得材料
         self.operatorMaterialListData = result.operatorMaterialListData;
      })

        CompanyTaskList.getComInfoAndPayWay(params).then(result=>{
         //获得公司信息
        self.companyInfo = result.companyInfo
        self.beforeSendInfo = result.beforeSendInfo
        self.companyOpenAccountOperator  =result.companyOpenAccountOperator
         })
      },
      //来源地
      getResourceValue(){
           let resource = this.companyOpenAccountOperator.resourceValue
            let resourceStr = ''
           for(let i of this.resourceList){
               if(i.value==resource){
                    resourceStr=i.label
                    break;
               }
           }
           return resourceStr
      },
      //交予方式
      getGiveMethodValue(){
            let getGiveMethod = this.companyOpenAccountOperator.giveMethodValue
            let getGiveMethodValueStr = ''
           for(let i of this.giveMethodList){
               if(i.value==getGiveMethod){
                    getGiveMethodValueStr=i.label
                    break;
               }
           }
           return getGiveMethodValueStr
      },
      //任务状态
      getTaskTypeValue(){
          let taskType = this.companyOpenAccountOperator.taskTypeValue
            let taskTypeStr = ''
           for(let i of this.taskTypeList){
               if(i.value==taskType){
                    taskTypeStr=i.label
                    break;
               }
           }
           return taskTypeStr
      },
      //支付方式
      getPayMethodValue(){
          let payMethod = this.beforeSendInfo.payMethodValue
            let payMethodStr = ''
           for(let i of this.payMethodList){
               if(i.value==payMethod){
                    payMethodStr=i.label
                    break;
               }
           }
           return payMethodStr
      }

    }
  }
</script>
