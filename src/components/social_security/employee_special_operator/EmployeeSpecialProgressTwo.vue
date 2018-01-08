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
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}">
        <Button type="error" @click="isRefuseReason=true">批退</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
        <Button type="warning" @click="goBack" class="ml10">返回</Button>
      </Col>
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}" class="tr">
        <!-- <Button type="primary" @click="isUpload = true">上传扫描件</Button> -->
        <!-- <Button type="primary" @click="goBack">反馈未签收</Button> -->
        <Button type="primary" @click="signAllMaterials">签收全部材料</Button>
      </Col>
    </Row>

    <!-- <chat :chatList="chatList" class="mt20"></chat> -->
    <!-- 批退理由 -->
    <Modal
      v-model="isRefuseReason"
      :mask-closable="false"
      :closable="false"
      @on-ok="handleRefuseReason">
      <p>
        <Input v-model="rejectionRemark" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
      </p>
    </Modal>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../commoncontrol/chathistory/chat.vue'
  import CompanyInfo from '../components/CompanyInfo.vue'
  import employeeInfo from '../../commoncontrol/employeeinfo.vue'
  import EventType from '../../../store/EventTypes'
  import api from '../../../api/social_security/employee_operator'
  import Utils from '../../../lib/utils'

  export default {
    components: {chat, CompanyInfo, employeeInfo},
    data() {
      return {
        empTaskId:this.$route.query.empTaskId,
        collapseInfo: [1, 2, 3], //展开栏
        currentStep: Number(this.$route.query.taskStatus)-1,
        companyInfo:{},
        employeeInfo:{},
        rejectionRemark:'',
        isRefuseReason:false,
        receiveMaterialListData:[],//用于操作的材料信息
        //operatorMaterialListData:[],//原始材料信息
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
                h('Select', {props: {value: params.row.status =='0'?'0':params.row.status=='1'?'1':params.row.status=='2'?'2':''},
                    on:{
                      input:function(event){
                        self.receiveMaterialListData[params.index].status = event
                      }
                    }
                },
                  [
                    h('Option', {props: {value: '0'}},'未签收'),
                    h('Option', {props: {value: '1'}},'已签收'),
                    h('Option', {props: {value: '2'}},'材料不齐全'),
                  ]
                )]
              );
            }
          },
          {title: '备注说明', key: 'remark', className: 'mw300',
            render: (h, params) => {
               let self = this
              return h('div', [
                h('i-input', {
                  props: {value: params.row.remark},
                  on:{
                    input:function(event){
                      
                          params.row.remark = event
                          self.receiveMaterialListData[params.index] = params.row
                        }
                  }
                  }
                  )
              ]);
            }
          },
          {title: '操作', key: 'operator', align: 'center', width: 100, className: 'mw100',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'primary', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                     let param ={
                        empMaterialId:params.row.empMaterialId,
                        remark:params.row.remark,
                        status:params.row.status
                      }
                      let paramsList = []
                      paramsList.push(JSON.stringify(param))
                      api.saveMaterial({paramsList:paramsList}).then(data=>{
                        if(data){
                          this.$Notice.success({
                          title: '操作成功',
                          desc: '已经签收.',
                          duration: 3
                         });
                        }
                      })
                    }
                  }
                },'保存'),
              ]);
            }
          },
        ],

        // isUpload: false,

        // chatList: [
        //   {icon: '#', name: '社保专员', date: '2017-03-02 14:14:32', content: '材料不齐全：材料1(备注内容)； 未签收：材料2(备注内容)'},
        //   {icon: '#', name: '客服专员', date: '2017-03-05 13:16:52', content: '已阅'},
        //   {icon: '#', name: '社保专员', date: '2017-03-06 13:16:52', content: '材料1'}
        // ]
      }
    },
    mounted() {
      this.accAndEmpDetailQuery()
    },
    computed: {
      
    },
    methods: {
     
      //页面信息查询
      accAndEmpDetailQuery() {
        //处理参数
        api.accAndEmpDetailQuery({empTaskId:this.empTaskId}).then(data => {
          // this.operatorMaterialListData = data.data;
          if(data.data!=null){
            this.receiveMaterialListData = data.data;
            //Utils.deepClone(this.operatorMaterialListData)
          }
          
          
        })
        //6表示特殊操作 查询雇员信息
        api.queryEmpArchiveByEmpTaskId({empTaskId:this.empTaskId,operatorType:'6'}).then((data) => {
          if(data.data!=null){
            
            this.employeeInfo = data.data;
          }
          
        })
         //6表示特殊操作 查询雇员信息
        api.queryComAccountByEmpTaskId({empTaskId:this.empTaskId,operatorType:'6'}).then((data) => {
          if(data.data!=null){
            this.companyInfo = data.data;
          }
          
        })
      },
      signAllMaterials(){
  
        let materialArr = this.receiveMaterialListData
        let materialId = "";
       // var typeInfo =0;//表示无材料
       let paramsList=[]
        for(let i in materialArr){
             //表示有材料未签收
            let param ={empMaterialId:materialArr[i].empMaterialId,status:1,remark:materialArr[i].remark}
            paramsList.push(JSON.stringify(param))
          
        }
        if(paramsList.length==0){
          this.$Notice.error({
                title: '操作失败',
                desc: '没有材料信息！',
                duration: 3
               });
        }else{
        api.saveMaterial({paramsList:paramsList}).then(data=>{
            if(data){
              this.$Notice.success({
              title:'操作成功',
              desc: '已全部签收.',
              duration: 3
              });
              this.nextStep()
            }
        })
        }
       
      },
       handleRefuseReason() {
        var ids = [];
          ids.push(this.empTaskId);
        var ajax = api.refuseReason({
          remark: this.rejectionRemark,
          ids: ids
        })
        this.$ajax.handle({
          vm: this,
          ajax: ajax,
          title: '任务批退',
          callback: (data) => {
            this.$router.push({
                name: 'employeespecialoperatorview'});
          }
        })
      },
      nextStep() {
        this.$router.push({name: 'employeespecialprogressthree',query:{empTaskId:this.empTaskId}});
      },
      goBack() {
        this.$router.push({name: 'employeespecialoperatorview'})
      },
      ok () {
        this.$Message.info('点击了确定');
      },
      cancel () {
        this.$Message.info('点击了取消');
      }
    }
  }
</script>
