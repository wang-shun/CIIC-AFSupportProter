<template>
  <Form :label-width=150>
    <Collapse v-model="collapseInfo" class="mt20">
      <Panel name="1">
        企业社保账户信息
        <div slot="content">
          <company-info :company="companyInfo"></company-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
          <employee-info :operatorType="'1'" :employee="employeeInfo"></employee-info>
        </div>
      </Panel>
      <Panel name="3">
        办理所需材料清单
        <div slot="content">
          <Table class="mt20" border :columns="operatorMaterialListColumns" :data="receiveMaterialListData" ref="employeeSocialSecurityData"></Table>
        </div>
      </Panel>
      <Panel name="4">
        雇员社保特殊操作
        <div slot="content">
            <Form :label-width=150>
                <Row class="mt20" type="flex" justify="start">
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="变更类型：" class="">
                      <label>{{getChangeValue(socialSecuritySpecialOperator.taskCategorySpecial)}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="任务状态：" prop="taskStatus">
                        <label>{{getTaskStatus(socialSecuritySpecialOperator.taskStatus)}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="办理方式：" class=""prop="handleWay">
                        <label>{{getHandleWay(socialSecuritySpecialOperator.handleWay)}}</label>
                    </Form-item>
                  </Col>

                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="受理日期：" class="" prop="startHandleDate">
                      <label>{{socialSecuritySpecialOperator.startHandleDate}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="送审日期：" class="" prop="sendCheckDate">
                      <label>{{socialSecuritySpecialOperator.sendCheckDate}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                    <Form-item label="完成日期：" class="" prop="finishDate">
                      <label>{{socialSecuritySpecialOperator.finishDate}}</label>
                    </Form-item>
                  </Col>
                  <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                    <Form-item label="办理备注：" class="" prop="handleRemark">
                        <label>{{socialSecuritySpecialOperator.handleRemark}}</label>
                     </Form-item>
                  </Col>
                 <Col :sm="{span:22}" :md="{span: 24}" :lg="{span: 16}">
                    <Form-item label="批退备注：" class="" prop="rejectionRemark">
                        <label>{{socialSecuritySpecialOperator.rejectionRemark}}</label>
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
  import CompanyInfo from '../components/CompanyInfo.vue'
  import employeeInfo from '../../common_control/EmployeeInfo.vue'
  import EventType from '../../../store/event_types'
  import api from '../../../api/social_security/employee_operator'
  import Utils from '../../../lib/utils'
  export default {
    components: {chat, CompanyInfo, employeeInfo},
    data() {

      return {
        collapseInfo: [1, 2, 3, 4], //展开栏
        empTaskId:this.$route.query.empTaskId,
         taskInitialStatus:1,//任务查询的最初状态
         receiveMaterialListData:[],//材料
         operatorMaterialListColumns: [
          {title: '材料名称', key: 'materialName', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span',params.row.materialName)
              ])
            }
          },
          {title: '材料提交时间', key: 'submitTime', align: 'center', className: 'mw150',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          {title: '材料类型', key: 'materialType', align: 'center', className: 'mw100',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', this.$decode.materialType(params.row.materialType))
              ])
            }
          },
          {title: '材料收到时间', key: 'receiveTime', align: 'center', className: 'mw150',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.receiveTime),
              ]);
            }
          },
          {title: '状态', key: 'status', align: 'center', className: 'mw200',
            render: (h, params) => {
              let self = this
              return h('div', [
                h('span',  params.row.status =='0'?'0':params.row.status=='1'?'1':params.row.status=='2'?'2':'')
                ]
              );
            }
          },
          {title: '备注说明', key: 'remark', className: 'mw300',
            render: (h, params) => {
               let self = this
              return h('div', [
                h('span', params.row.remark
                  )
              ]);
            }
          }
        ],
         taskTypeList:[
            {value: '1',label: '未处理'},
            {value: '2', label: '处理中'},
            {value: '3', label: '已完成'},
            {value: '4', label: '批退'},
            {value: '5', label: '不需处理'}
          ],//任务状态类型
        //雇员特殊任务单的类型
             changeTypeList:[
                //{value:'0', label: '无'},
                {value:'1',label:'死亡'},
                {value:'2',label:'终止'},
                {value:'3',label:'修改个人信息'},
                {value:'4',label:'修改人员信息'},
                {value:'5',label:'退账'},
                {value:'6',label:'工龄认定'},
                {value:'7',label:'特殊工种认定'},
                {value:'8',label:'账户合并'},
                {value:'9',label:'遗属'},
                {value:'10',label:'退休'},
                {value:'11',label:'因病丧劳提前退休'},
                {value:'12',label:'特殊工种提前退休'},
                {value:'13',label:'退休高级专家增资'},
                {value:'14',label:'退休军转增资'},
                {value:'15',label:'外国人终止提取'},
                {value:'16',label:'外来人员医保卡领取'},
                {value:'17',label:'医保帐户提取'},
                {value:'18',label:'生育津贴领取'}
            ],
            doMethodList: [
            {value: '1', label: '网上申报'},
            {value: '2', label: '柜面办理'}
          ],
        employeeInfo:{},
        companyInfo: {
          comAccountId:'',
          customerNumber: '',
          customerName: '',
          serviceCenter: '',
          serviceManager: ''
        },
        socialSecuritySpecialOperator: {
          taskStatus:'',
          handleStatus:'',
          taskCategorySpecial: '',
          handleWay: '',
          startHandleDate: '',
          sendCheckDate: '',
          finishDate: '',
          handleRemark: '',
          rejectionRemark: ''
        },

      }
    },
    mounted() {
      // this.$refs['st1'].onclick = function() {
      //     alert(123)
      // }
       this.accAndEmpDetailQuery();
    },
    computed: {

    },
    methods: {
      accAndEmpDetailQuery(){
        //处理参数
        api.specialTaskQuery({empTaskId:this.empTaskId}).then(data => {

          if(data.data!=null){
            this.socialSecuritySpecialOperator = data.data;
          this.taskInitialStatus = data.data.handleStatus;
          }

        })
       //6表示特殊操作 查询雇员信息
        api.queryEmpArchiveByEmpTaskId({empTaskId:this.empTaskId,operatorType:'6'}).then((data) => {
          if(data.data!=null){
            this.employeeInfo = data.data;
          }
        })
        api.accAndEmpDetailQuery({empTaskId:this.empTaskId}).then(data => {
          // this.operatorMaterialListData = data.data;
          this.receiveMaterialListData = data.data;//Utils.deepClone(this.operatorMaterialListData)
        })
        api.queryComAccountByEmpTaskId({empTaskId:this.empTaskId,operatorType:'6'}).then((data) => {
          if(data.data!=null){
             this.companyInfo = data.data;
          }

        })
      },
      goBack() {
        this.$router.push({name:'employeeSpecialOperatorView'});
      },
      getChangeValue(val){

        if(typeof(val)=='undefined' ||  val==null || val.trim()==''){
          return ''
        }else{
          let index = Number(val)-1
        return this.changeTypeList[index].label;
        }
      },
      getHandleWay(val){
        if(typeof(val)=='undefined' ||  val==null || val.trim()==''){
          return ''
        }else{

          let index = Number(val)-1
        return this.doMethodList[index].label;
        }
      },
      getTaskStatus(val){
        if(typeof(val)=='undefined' ||  val==null || val.trim()==''){
          return ''
        }else{

          let index = Number(val)-1
        return this.taskTypeList[index].label;
        }
      }
    }
  }
</script>
