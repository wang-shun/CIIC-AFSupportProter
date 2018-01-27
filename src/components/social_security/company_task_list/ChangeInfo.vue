<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-social-security-info :company="companyInfo"></company-social-security-info>
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
      <Panel name="4">
        企业变更操作
        <div slot="content">
          <Form :label-width=150>
              <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：">
                    <label>{{getTaskStatus()}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="变更内容：">
                <label>{{changeOperator.changeContentValue=='1'?'行业比例':changeOperator.changeContentValue=='2'?'付款方式':changeOperator.changeContentValue=='3'?'公司名称':''}}</label>
                  <!-- <Select v-model="" style="width: 100%;" transfer @on-change="changeContentType">
                    <Option v-for="item in changeContentList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select> -->
                </Form-item>
              </Col>
              </Row>
              <Row v-if="payMethodShow || companyNameShow" class="mt20" type="flex" justify="start">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="payMethodShow">
                <Form-item label="付款方式：">
                    <label>{{this.$decode.payMethod(changeOperator.payMethodValue)}}</label>
                  <!-- <Select v-model="changeOperator.payMethodValue" style="width: 100%;" transfer >
                    <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="payMethodShow">
                <Form-item label="账单接收方：">
                    <label>{{this.$decode.billReceiver(changeOperator.billReceiverValue)}}</label>
                  <!-- <Select v-model="changeOperator.payMethodValue" style="width: 100%;" transfer >
                    <Option v-for="item in payMethodList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="companyNameShow">
                <Form-item label="养老金用公司名称：">
                     <label>{{changeOperator.pensionMoneyUseCompanyName}}</label>
                </Form-item>
              </Col>
              </Row>
              <Row class="mt20" type="flex" justify="start">
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="industryRatioShow">
                <Form-item label="所属行业：">
                     <label>{{changeOperator.belongsIndustry}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="industryRatioShow">
                <Form-item label="企业工伤比例：">
                    <label>{{changeOperator.companyWorkInjuryPercentage}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}" v-show="industryRatioShow">
                <Form-item label="变更开始月份：">
                    <label>{{changeOperator.changeStartMonth}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：">
                    <label>{{changeOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：">
                    <label>{{changeOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：">
                     <label>{{changeOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="办理备注：">
                       <label>{{changeOperator.handleReason==''?'无':changeOperator.handleReason}}</label>
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="批退备注：">
                       <label>{{changeOperator.refuseReason=='' || changeOperator.refuseReason==null?'无':changeOperator.refuseReason}}</label>
                  </Form-item>
              </Col>
              </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:18}" class="tr">
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
      return {
        collapseInfo: [1, 2, 3,4], //展开栏
        currentStep: 2,
        industryRatioShow:true, //行业比例变更
        payMethodShow:false,//控制付款方式input
        companyNameShow:false,//控制养老金公司名称 input
         tid:this.$route.query.tid,
         source:this.$route.query.source,
         companyInfo:{},
         historyRemark:{
          submitName:'',
          submitTime:'',
          submitRemark:''
         },
         taskTypeList:[
            {value: '0',label: '初始(材料收缴)'},
            {value: '1', label: '受理中'},
            {value: '2', label: '送审中'},
            {value: '3', label: '已完成'},
            {value: '4', label: '批退'}
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

        },
        changeOperator: {
          taskStatus:'',
          changeContentValue: '1',
          payMethodValue:'',//付款方式
          billReceiverValue:'',//账单接收方
          pensionMoneyUseCompanyName:'',//养老金公司名称
          belongsIndustry: '',//所属行业
          companyWorkInjuryPercentage: '',//企业工伤比例
          changeStartMonth: '',//变更开始月份
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          handleReason:'',
          refuseReason: ''
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
        //this.$router.push({name: 'companyTaskList'})
      },
      //查询页面信息
      queryPageInfo(){
        let isComplete = ''
        //代表已完成查看的查看
        if(this.source=='0'){
          isComplete = '3'
        }else if(this.source=='1'){//代表批退页面过来的查看
          isComplete = '4'
        }
        let params = {
          comTaskId:this.tid,
          operatorType:'3',
          isComplete:isComplete//0代表查看已完成 4代表查看批退
        }
        let self = this
        CompanyTaskList.getEndPageInfo(params,'change').then(result=>{
        self.operatorMaterialListData = result.operatorMaterialListData;
        
        self.companyInfo = result.companyInfo
        self.historyRemark = result.historyRemark;
        self.changeOperator = result.changeOperator;
          switch( result.changeOperator.changeContentValue) {
                        case '1':
                                this.controlChangeTypeShow(true,false,false)
                          break;
                        case '2':
                                this.controlChangeTypeShow(false,true,false)
                          break;
                        case '3':
                                this.controlChangeTypeShow(false,false,true)
                          break;
                        default:
                          break;
                      }
      })
      },
      //显示变更内容的label
      controlChangeTypeShow(industryRatioShow,payMethodShow,companyNameShow){
        this.industryRatioShow=industryRatioShow //行业比例变更
        this.payMethodShow=payMethodShow//控制付款方式input
        this.companyNameShow=companyNameShow//控制养老金公司名称 input
      },
      getTaskStatus(){
        let taskStatus = this.changeOperator.taskStatus
        let taskList =this.taskTypeList
        if(taskStatus=='0'){
           return  taskList[0].label
        }else if(taskStatus=='1'){
           return  taskList[1].label
        }else if(taskStatus=='2'){
           return  taskList[2].label
        }else if(taskStatus=='3'){
           return  taskList[3].label
        }else if(taskStatus=='4'){
           return  taskList[4].label
        }else{
            return ''
        }

      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>

