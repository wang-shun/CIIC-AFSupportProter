<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-social-security-info :company="companyInfo"></company-social-security-info>
        </div>
      </Panel>
      <!-- <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <Table class="mt20" border :columns="operatorMaterials.operatorMaterialListColumns" :data="operatorMaterialListData" ref="materialData"></Table>
        </div>
      </Panel> -->
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
        企业终止操作
        <div slot="content">
          <Form :label-width=100>
            <Row class="mt20" type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务状态：">
                 <label>{{getTaskStatus()}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="受理日期：">
                 <label>{{endOperator.acceptanceDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="送审日期：">
                    <label>{{endOperator.sendCheckDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="完成日期：">
                     <label>{{endOperator.finishedDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="终止日期：">
                     <label>{{endOperator.endDate}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="办理备注：">
                      <label>{{endOperator.handleRemark}}</label>
                  </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                  <Form-item label="批退备注：">
                    <label>{{endOperator.refuseReason}}</label>
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
         tid:this.$route.query.tid,
         source:this.$route.query.source,
        collapseInfo: [1, 2, 3,4], //展开栏
        currentStep: 2,
        companyInfo:{},
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
        endOperator: {
          taskStatus:'',
          acceptanceDate: '', //受理日期
          sendCheckDate: '', //送审日期
          finishedDate: '', //完成日期
          endDate: '',
          handleRemark:'',
          refuseReason: ''
        },
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
        //代表已完成查看
        if(this.source=='0'){
          isComplete = '3'
        }else if(this.source=='1'){//代表批退页面过来的查看
          isComplete = '4'
        }
        let params = {
          comTaskId:this.tid,
          operatorType:'4',
           isComplete:isComplete//0代表查看已完成 4代表查看批退
        }
        let self = this
        CompanyTaskList.getEndPageInfo(params,'end').then(result=>{
        //获得材料
        self.operatorMaterialListData = result.operatorMaterialListData;
        self.companyInfo = result.companyInfo
        self.historyRemark = result.historyRemark;
        self.endOperator = result.endOperator;
      })
      },
       getTaskStatus(){
        let taskStatus = this.endOperator.taskStatus
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
