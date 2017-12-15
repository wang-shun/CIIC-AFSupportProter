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
          <Table class="mt20" border :columns="operatorMaterials.operatorMaterialListColumns" :data="operatorMaterialListData" ref="materialData"></Table>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}">
        <Button type="error" @click="getModal">批退</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
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
  import chat from '../../commoncontrol/chathistory/chat.vue'
  import companySocialSecurityInfo from '../../commoncontrol/companysocialsecurityinfo.vue'
  import companyInfo from '../../commoncontrol/companyinfo.vue'
  import EventType from '../../../store/EventTypes'
  import {CompanyTaskList} from '../../../module/social_security/company_task_list'
    import {NoProgress} from '../../../module/social_security/company_task_list_tab/no_progress'
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
        currentStep: 0,
        companyInfo: {},//企业信息
        socialSecurityinfo:{},
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
                let selt = this
                return h('div', [
                  h('Select', {
                    props: {
                    value: params.row.state
                    },
                    on:{
                      input:function(event){
                        console.log(self)
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
                let selt = this
                return h('div', [
                  h('i-input', {
                    props: {
                      value: params.row.notes
                      },
                      on:{
                        input:function(event){
                          debugger
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
                                            params.index
                                            CompanyTaskList.getCompanyInfoAndMaterial({})
                                            
                                        }
                                    }
                                }, '处理')
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
            this.$router.push({name: 'companytaskprogresstypeinfo', query: {operatorType: '1',tid:this.tid}})
            break;
          case '2':
            this.$router.push({name: 'companytaskprogresstransferinfo', query: {operatorType: '2',tid:this.tid}})
            break;
          case '3':
            this.$router.push({name: 'companytaskprogresschangeinfo', query: {operatorType: '3',tid:this.tid}})
            break;
          case '4':
            this.$router.push({name: 'companytaskprogressendinfo', query: {operatorType: '4',tid:this.tid}})
            break;
          default:
            break;
        }
      },
      //查询页面信息
      queryPageInfo(){
        let params = {
          companyTaskId:this.$route.query.tid,
          operatorType:this.operatorType
        }
        let self = this
        CompanyTaskList.getCompanyInfoAndMaterial(params).then(result=>{
          if(this.operatorType=='1'){
            self.companyInfo = result.companyInfo
          }else{
            self.socialSecurityinfo = result.companyInfo
          }
        self.operatorMaterialListData = result.operatorMaterialListData;
        self.currentStep  =result.companyTaskStatus==null?0:Number(result.companyTaskStatus)

      })
      },
      signAllMaterials(){
        let materialArr = this.$refs.materialData.data
        let materialId = "";
        var typeInfo =0;
       
        //将材料的ID 拼接成以，分割的字符串
        for(let obj of materialArr){
          typeInfo =1;
          if(obj.state!='1'){
             typeInfo =2;
             materialId+=obj.id+","
            //  typeInfo =2;
            // let info = {}
            // info.comMaterialId = obj.id
            // info.remark = obj.notes
            //  params.push(info)
          }
        }
        if(materialId=="" && typeInfo==0){
          this.$Message.error("没有材料信息！")
        }else if(materialId=="" && typeInfo==1){
          this.$Message.error("已全部签收！")
        }else{
          CompanyTaskList.signAllMaterials({materialId:materialId}).then(result=>{

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
        this.$router.push({name: 'companytasklist'})
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
