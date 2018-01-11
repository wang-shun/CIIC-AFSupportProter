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
        {{operatorType !== '1' ? '企业社保账户信息' : '公司信息'}}
        <div slot="content">
          <company-social-security-info v-if="operatorType !== '1'" :company="socialSecurityinfo"></company-social-security-info>
          <company-info :companyInfo="companyInfo" v-else></company-info>
        </div>
      </Panel>
      <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <Table class="mt20" border :columns="operatorMaterials.operatorMaterialListColumns" :data="receiveMaterial" ref="materialData"></Table>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}">
        <Button type="error" @click="getModal">批退</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
        <Button type="warning" @click="goBack">返回</Button>
      </Col>
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}" class="tr">
        <!-- <Button type="primary" @click="isUpload = true">上传扫描件</Button> -->
        <!-- <Button type="primary" @click="goBack">反馈未签收</Button> -->
        <Button type="primary" @click="signAllMaterials">签收全部材料</Button>
      </Col>
    </Row>

    <!-- <chat :chatList="data.chatList" class="mt20"></chat> -->

      <!-- 批退理由 -->
      <Modal
        v-model="isRefuseReason"
        :loading="refuseLoading"
        :mask-closable="false"
        @on-ok="asyncOK"
        @on-cancel="cancel">
        <Form>
          <p>
            <Form-item>
              <Input v-model="refuseReason" type="textarea" :rows=4  placeholder="请填写批退备注..."></Input>
            </Form-item>
          </p>
        </Form>
      </Modal>
    <!-- 上传 -->
    <!-- <Modal
      v-model="isUpload"
      @on-ok="ok"
      @on-cancel="cancel">
      <div style="text-align: center;">
        <Upload action="">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
    </Modal> -->
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../common_control/chat_history/Chat.vue'
  import companySocialSecurityInfo from '../../common_control/CompanySocialSecurityInfo.vue'
  import companyInfo from '../../common_control/CompanyInfo.vue'
  import EventType from '../../../store/event_types'
  import {CompanyTaskList} from '../../../api/social_security/company_task_list/company_task_list'
    import {NoProgress} from '../../../api/social_security/company_task_list/company_task_list_tab/no_progress'
    import Utils from '../../../lib/utils'
  export default {
    components: {chat, companySocialSecurityInfo, companyInfo},
    data() {
      return {
        collapseInfo: [1, 2], //展开栏
        operatorType: this.$route.query.operatorType,
        tid: this.$route.query.tid,
        isRefuseReason:false,//批退
        refuseLoading:true,//确定是否关闭
        refuseReason:'',//批退理由
        tempArray:[],
        currentStep: 0,
        companyInfo: {},//企业信息
        socialSecurityinfo:{},
        receiveMaterial:[],//用于修改材料收缴状态后的信息
        operatorMaterialListData:[],//材料
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
                let self = this
                return h('div', [
                  h('Select', {
                    props: {
                    value: params.row.state
                    },
                    on:{
                      input:function(event){
                        self.receiveMaterial[params.index].state = event
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
            {title: '备注说明', key: 'notes', className: 'mw300',
              render: (h, params) => {
                let self = this
                return h('div', [
                  h('i-input', {
                    props: {
                      value: params.row.notes
                      },
                      on:{
                        input:function(event){
                           params.row.notes = event
                          self.receiveMaterial[params.index] = params.row
                        }
                      }
                  })
                ]);
              }
            },
            {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                          let self = this
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                          //初始状态
                                          let state =  self.operatorMaterialListData[params.index].state
                                          let isUpdateObj =  self.receiveMaterial[params.index]
                                          // if(state=='1' && state!=isUpdateObj.state){
                                          //    self.$Notice.error({
                                          //           title: '操作失败',
                                          //           desc: '该材料已经签收.',
                                          //           duration: 3
                                          //    });
                                          //   return;
                                          // }
                                          let param ={comMaterialId:isUpdateObj.id,status:isUpdateObj.state,remark:isUpdateObj.notes}
                                          let paramsList = []
                                          //以List<String>的形式传到后台
                                          paramsList.push(JSON.stringify(param))
                                          CompanyTaskList.signMaterials({paramsList:paramsList}).then(result=>{
                                              if(result){
                                                self.$Message.success("操作成功！")
                                              }
                                          })
                                        }
                                    }
                                }, '保存')
                            ]);
                        }
                    }
          ],

        },
        //isUpload: false,
      }
    },
    mounted() {

      this.queryPageInfo();
    },
    computed: {

    },
    methods: {
      nextStep() {

        switch(this.operatorType) {
          case '1':
            this.$router.push({name: 'companyTaskProgressTypeInfo', query: {operatorType: '1',tid:this.tid}})
            break;
          case '2':
            this.$router.push({name: 'companyTaskProgressTransferInfo', query: {operatorType: '2',tid:this.tid}})
            break;
          case '3':
            this.$router.push({name: 'CompanyTaskProgressChangeInfo', query: {operatorType: '3',tid:this.tid}})
            break;
          case '4':
            this.$router.push({name: 'companyTaskProgressEndInfo', query: {operatorType: '4',tid:this.tid}})
            break;
          default:
            break;
        }
      },
      //查询页面信息
      queryPageInfo(){

        let params = {
          operatorType:this.operatorType,
          comTaskId:this.$route.query.tid,
          isComplete:'0'//表示查询未完成任务信息
        }
        let self = this
        CompanyTaskList.getCompanyInfoAndMaterial(params).then(result=>{
          if(this.operatorType=='1'){
            self.companyInfo = result.companyInfo
          }else{
            self.socialSecurityinfo = result.companyInfo
          }
        self.operatorMaterialListData = result.operatorMaterialListData;
        //clone 新对象
        self.receiveMaterial = Utils.deepClone(self.operatorMaterialListData)

        self.currentStep  =result.companyTaskStatus==null?0:Number(result.companyTaskStatus)

      })
      },
      signAllMaterials(){
        let materialArr = this.operatorMaterialListData
        let materialUpdateArr = this.receiveMaterial
        let materialId = "";
       // var typeInfo =0;//表示无材料
       let paramsList=[]
        for(let i in materialArr){
             //表示有材料未签收
            let param ={comMaterialId:materialUpdateArr[i].id,status:1,remark:materialUpdateArr[i].notes}
            paramsList.push(JSON.stringify(param))

        }

        if(paramsList.length==0){
          this.$Notice.error({
                title: '操作失败',
                desc: '没有材料信息！',
                duration: 3
               });
        }
        // else if(paramsList.length==0 && typeInfo==1){
        //   this.$Notice.error({
        //         title: '操作失败',
        //         desc: '已全部签收！',
        //         duration: 3
        //        });

        // }
        else{
          CompanyTaskList.signMaterials({paramsList:paramsList}).then(result=>{
             if(result){
               this.$Message.success("操作成功！")
               this.nextStep()
             }
           })
        }

      },
      //获得批退模糊态
      getModal(){
          this.isRefuseReason = true
          this.refuseLoading = true
        },
      goBack() {
        this.$router.push({name: 'companyTaskList'})
      },
      asyncOK() {
        let params = {
                    taskIdStr:this.tid,
                      refuseReason:this.refuseReason
                      }
        let self = this
        NoProgress.refusingTask(params).then(result=>{
          if(result){
            self.$Message.success("批退成功！")
             self.isRefuseReason = false
             this.goBack()
          }else{
              //this.refuseLoading = true
          }

        })
      },
      cancel () {

      }
    }
  }
</script>
