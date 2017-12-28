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
        企业转移操作
        <div slot="content">
          <Form :label-width=150>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保中心(结算区县)：" class="">
                 <label>{{transferOperator.regionValue}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：">
                    <label>{{getTaskTypeValue()}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：" class="">
                     <label>{{transferOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：" class="">
                  <label>{{transferOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：" class="">
                  <label>{{transferOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="转移日期：" class="">
                     <label>{{transferOperator.transferDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="办理备注：">
                       <label>{{transferOperator.handleReason==''?'无':transferOperator.handleReason}}</label>
                  </Form-item>
                </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                <Form-item label="批退备注：" class="">
                      <label>{{transferOperator.refuseReason==''?'无':transferOperator.refuseReason}}</label>
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
  import chat from '../../commoncontrol/chathistory/chat.vue'
  import companySocialSecurityInfo from '../../commoncontrol/companysocialsecurityinfo.vue'
  import EventType from "../../../store/EventTypes"
  import {CompanyTaskList} from '../../../api/social_security/company_task_list/company_task_list'
  import Utils from '../../../lib/utils'
  export default {
    components: {chat, companySocialSecurityInfo},
    data() {
      return {
        operatorType: this.$route.query.operatorType,
         tid:this.$route.query.tid,
         source:this.$route.query.source,
        collapseInfo: [1, 2, 3,4], //展开栏
        companyInfo:{},
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
            {value: '4', label: '批退'}
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
        //this.$router.push({name: 'companytasklist'})
      },
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
          operatorType:'3',
          isComplete:isComplete//0代表查看已完成 4代表查看批退
        }
          let self = this
        CompanyTaskList.getEndPageInfo(params,'transfer').then(result=>{
          //获得材料
         self.operatorMaterialListData = result.operatorMaterialListData;
        self.comAccountId = result.comAccountId
        self.companyInfo = result.companyInfo
        self.historyRemark = result.historyRemark;
        self.transferOperator = result.transferOperator;
        self.currentStep  =result.transferOperator.taskStatus==null?0:Number(result.transferOperator.taskStatus)
      })

      },
      //任务状态
      getTaskTypeValue(){
          let taskType = this.transferOperator.taskStatus
            let taskTypeStr = ''
           for(let i of this.taskTypeList){
               if(i.value==taskType){
                  taskTypeStr=i.label
                  break;
               }
           }
           return taskTypeStr
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
