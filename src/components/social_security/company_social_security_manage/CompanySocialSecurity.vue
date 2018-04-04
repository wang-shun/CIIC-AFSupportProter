<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        企业社保账号信息
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="参保户登记码：" class="">
                  <label>{{companySocialSecurityInfo.ssAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="牡丹卡号：" class="">
                  <label>{{companySocialSecurityInfo.bankAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="养老金用公司名称：" class="">
                  <label>{{companySocialSecurityInfo.comAccountName}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：" class="">
                  <label>{{companySocialSecurityInfo.settlementArea}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款行：" class="">
                  <label>{{companySocialSecurityInfo.paymentBank}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="付款方式：" class="">
                  <label>{{this.$decode.payMethod(companySocialSecurityInfo.paymentWay)}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="账单接收方：" class="">
                  <label>{{this.$decode.billReceiver(companySocialSecurityInfo.billReceiver)}}</label>
                </Form-item>
              </Col>
              
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="工行查询账号：" class="">
                  <label>{{companySocialSecurityInfo.queryAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户社保截至日：" class="">
                  <label>{{companySocialSecurityInfo.expireDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="养老金独立开户用户名：" class="">
                  <label>{{companySocialSecurityInfo.ssUsername}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="养老金独立开户密码：" class="">
                  <label>{{companySocialSecurityInfo.ssPwd}}</label>
                </Form-item>
              </Col>
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="初期余额：" class="">
                  <label>{{companySocialSecurityInfo.initialBalance}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="初期欠费：" class="">
                  <label>{{companySocialSecurityInfo.initialDebt}}</label>
                </Form-item>
              </Col>-->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="来源地：" class="">
                  <label>{{companySocialSecurityInfo.originPlace=='1'?'新开':companySocialSecurityInfo.originPlace=='2'?'AF转入':companySocialSecurityInfo.originPlace=='3'?'其他供应商转入':''}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="来源地备注：" class="">
                  <label>{{companySocialSecurityInfo.originPlaceRemark}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="交予方式：" class="">
                  <label>{{companySocialSecurityInfo.deliverWay=='1'?'交客服':companySocialSecurityInfo.deliverWay=='2'?'传真':companySocialSecurityInfo.deliverWay=='3'?'邮寄':''}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="交予方式备注：" class="">
                  <label>{{companySocialSecurityInfo.deliverWayRemark}}</label>
                </Form-item>
              </Col>
              <!--<Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="给凭证时间：" class="">
                  <label>{{companySocialSecurityInfo.provideCertificateTime}}</label>
                </Form-item>
              </Col>-->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更时间：" class="">
                  <label>{{companySocialSecurityInfo.changeTime}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="收到日期：" class="">
                  <label>{{companySocialSecurityInfo.receiveDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转入日期：" class="">
                  <label>{{companySocialSecurityInfo.intoDate}}</label>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止日期：" class="">
                  <label>{{companySocialSecurityInfo.endDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="发出材料：" prop="dispatchMaterial">
                  <CheckboxGroup v-model="companySocialSecurityInfo.dispatchMaterial">
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
          </Form>
        </div>
      </Panel>

      <Panel name="2">
        子公司信息
        <div slot="content">
          <Table border :columns="childCompanyColumns" :data="childCompanyData"></Table>
        </div>
      </Panel>

      <Panel name="3">
        历史任务单
        <div slot="content">
          <Table border :columns="historyTaskColumns" :data="historyTaskData"></Table>
        </div>
      </Panel>

      <Panel name="4">
        工伤比例变更历史
        <div slot="content">
          <Table border :columns="workInjuryColumns" :data="workInjuryData"></Table>
        </div>
      </Panel>
    </Collapse>
    <Row class="mt20">
      <Col :sm="{span:24}" class="tr">
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
    </Row>

    <!-- 对话备注 模态框 -->
    <Modal
      v-model="isShowNotes"
      @on-ok="ok"
      @on-cancel="cancel">
      <ul>
        <li v-for="chatItem in chatList">

            <div class="content">
              <p class="info">
                <span>{{chatItem.name}}</span>
                <span class="date">{{chatItem.date}}</span>
              </p>
              <p class="text">{{chatItem.content}}</p>
            </div>
        </li>
      </ul>
      <!-- <chat :chatList="chatList"></chat> -->
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../common_control/chat_history/Chat.vue'
  import EventType from '../../../store/event_types'
  import api from '../../../api/social_security/company_social_security_manage/company_social_security_manage'
  export default {
    components: {chat},
    data() {
      return {
        collapseInfo: [1, 2, 3, 4], //展开栏
        comAccountId:this.$route.query.comAccountId,
        childCompanyData:[],
        historyTaskData:[],
        workInjuryData:[],
        chatList:[],
        companySocialSecurityInfo: {
          ssAccount: '',//参保登记码
          bankAccount: '',//牡丹卡号
          comAccountName: '',//养老金用公司名称：
          settlementArea: '',//结算区县
          paymentBank: '',//付款行
          paymentWay: '',//支付方式
          billReceiver:'',//账单接收方
          queryAccount: '',//工行查询账号
          expireDate: '',//社保截止日
          ssUsername: '',//养老金用户名
          ssPwd: '',//养老金密码
          // initialBalance: '',//初期余额
          // initialDebt: '',//初期欠费
          originPlace: '',//来源地
          originPlaceRemark: '',//来源地备注
          deliverWay: '',//交予方式
          deliverWayRemark: '',//交予方式备注
          //provideCertificateTime: '',//给凭证时间
          changeTime: '',//变更时间
          receiveDate: '',//收到日期
          intoDate: '',//转入日期
          dispatchMaterial: [],//发出材料
          endDate: ''
        }, //企业社保账号信息

        childCompanyColumns: [
          {title: '客户编号', key: 'companyId', align: 'center', className: 'mw120',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '公司名称', key: 'title', align: 'center', className: 'mw240',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '服务中心', key: 'serviceCenter', align: 'center', className: 'mw240',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {title: '客户经理', key: 'serviceTeam', align: 'center', className: 'mw240',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.serviceTeam),
              ]);
            }
          }
        ],

        historyTaskColumns: [
          {title: '任务单编号', key: 'comTaskId', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('a', {
                  on: {
                    click: () => {
                     let taskType = params.row.taskCategory
                     let taskStatus = params.row.taskStatus
                     let pageInfo = ""
                     let source = ""
                     if(taskType=='1')pageInfo='openAccountInfo'
                     else if(taskType=='2')pageInfo='transferInfo'
                      else if(taskType=='3')pageInfo='changeInfo'
                       else if(taskType=='4')pageInfo='endInfo'

                      if(taskStatus=='3')source='0'
                       else if(taskStatus=='4')source='1'
                      this.$router.push({
                        name: pageInfo,
                        query: {operatorType:params.row.taskCategory,source:source,tid:params.row.comTaskId}
                      });
                    }
                  }
                }, params.row.comTaskId)
              ]);
            }
          },
          {title: '任务类型', key: 'taskCategory', align: 'center', className: 'mw100',
            render: (h, params) => {
              //1:开户：2：转移 3：变更 4：终止
              let taskType = ''
              let result= params.row.taskCategory
              if(result=='1')taskType = '开户'
              else if(result=='2')taskType = '转移'
              else if(result=='3')taskType = '变更'
              else if(result=='4')taskType = '终止'
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', taskType),
              ]);
            }
          },
          {title: '操作人', key: 'modifiedBy', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.modifiedBy),
              ]);
            }
          },
          {title: '操作时间', key: 'modifiedTime', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.modifiedTime),
              ]);
            }
          },
          {title: '办理状态', key: 'taskStatus', align: 'center', className: 'mw100',
          //0、初始（材料收缴） 1、受理中  2、送审中  3 、已完成  4、批退
            render: (h, params) => {
              let taskType = ''
              let result= params.row.taskStatus
              if(result=='0')taskType = '初始(材料收缴)'
               else if(result=='1')taskType = '受理中'
              else if(result=='2')taskType = '送审中'
              else if(result=='3')taskType = '已完成'
              else if(result=='4')taskType = '批退'
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', taskType),
              ]);
            }
          },
          {title: '备注信息', key: 'notes', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('Button',{
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {

                      this.chatList =  [
                        {
                          name:params.row.submitterName,
                          date: params.row.submitTime,
                          content: params.row.submitRemark
                        }
                      ]

                      this.isShowNotes = true

                    }
                  }
                }, '查看'),
              ]);
            }
          }
        ],

        workInjuryColumns: [
          {title: '行业类别', key: 'industryCategory', align: 'center', className: 'mw250',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.industryCategory),
              ]);
            }
          },
          {title: '企业工伤比例', key: 'comRatio', align: 'center', className: 'mw250',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.comRatio),
              ]);
            }
          },
          {title: '比例开始月份', key: 'startMonth', align: 'center', className: 'mw250',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
          {title: '比例截止月份', key: 'endMonth', align: 'center', className: 'mw250',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          },
        ],

        isShowNotes: false,
      }
    },
    mounted() {
      let comAccountId = this.comAccountId
      api.companySocialSecurityQuery({comAccountId:comAccountId}).then(result=>{
        this.companySocialSecurityInfo = result.data.account
        this.childCompanyData = result.data.ssAccountComRelation

        this.historyTaskData = result.data.ssComTask
        this.workInjuryData = result.data.ssAccountRatio
      })
    },
    computed: {

    },
    methods: {

      goBack() {
        this.$router.push({name: 'companySocialSecurityManage'})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
<style scoped>
  li {clear: both; margin-top: 10px;}

  .content {
    width: 352px;
    float: left;
  }
  .content .info {
    color: #ccc;
    height: 24px;
  }
  .content .text {
    color: #333;
    padding-top: 10px;

  }
  .date{
    padding-left: 20px;
  }
ul {
  list-style: none;
  width: 400px;
  height: 116px;
  overflow-y: auto;
  padding-top: 30px;
  padding-left: 20px;
  }
</style>

