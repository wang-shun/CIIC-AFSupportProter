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
          <company-social-security-info v-if="operatorType !== '1'"></company-social-security-info>
          <company-info :companyInfo="companyInfo" v-else></company-info>
        </div>
      </Panel>
      <Panel name="2">
        办理所需材料清单
        <div slot="content">
          <Table class="mt20" border :columns="operatorMaterials.operatorMaterialListColumns" :data="data.operatorMaterialListData" ref="employeeSocialSecurityData"></Table>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}">
        <Button type="error" @click="goBack">批退</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
        <Button type="warning" @click="goBack">关闭/返回</Button>
      </Col>
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}" class="tr">
        <Button type="primary" @click="isUpload = true">上传扫描件</Button>
        <Button type="primary" @click="goBack">反馈未签收</Button>
        <Button type="primary" @click="nextStep">签收全部材料</Button>
      </Col>
    </Row>

    <chat :chatList="data.chatList" class="mt20"></chat>

    <!-- 批退理由 -->
    <Modal
      v-model="isUpload"
      @on-ok="ok"
      @on-cancel="cancel">
      <div style="text-align: center;">
        <Upload action="">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
    </Modal>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import chat from '../../commoncontrol/chathistory/chat.vue'
  import companySocialSecurityInfo from '../../commoncontrol/companysocialsecurityinfo.vue'
  import companyInfo from '../../commoncontrol/companyinfo.vue'
  import EventType from '../../../store/EventTypes'

  export default {
    components: {chat, companySocialSecurityInfo, companyInfo},
    data() {
      return {
        collapseInfo: [1, 2], //展开栏
        operatorType: this.$route.query.operatorType,
        currentStep: 2,
        companyInfo: {
          customerNumber: 'KH0001',
          customerName: '上海XX信息技术有限公司',
          serviceCenter: '大客户2',
          serviceManager: '金翔云'
        },
        operatorMaterials: {
          operatorMaterialListColumns: [
            {title: '材料名称', key: 'material', align: 'center', className: 'mw100',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
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
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.materialCommitDate),
                ]);
              }
            },
            {title: '材料类型', key: 'materialType', align: 'center', className: 'mw100',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h(params.row.isLink ? 'a' : 'span', {props: {},
                    on: {
                      click: (event) => {
                        this.isUpload = event.target.nodeName == 'A' ? true : false;
                      }
                    }
                  }, params.row.materialType)
                ])
              }
            },
            {title: '材料收到时间', key: 'materialReciveDate', align: 'center', className: 'mw150',
              render: (h, params) => {
                return h('div', {style: {textAlign: 'left'}}, [
                  h('span', params.row.materialReciveDate),
                ]);
              }
            },
            {title: '状态', key: 'materialReciveDate', align: 'center', className: 'mw200',
              render: (h, params) => {
                return h('div', [
                  h('Select', {props: {value: params.index === 0 || params.index === 3 ? '3' : params.index === 1 ? '1' : '2'}},
                    [
                      h('Option', {props: {value: '1'}},'材料不齐全'),
                      h('Option', {props: {value: '2'}},'未签收'),
                      h('Option', {props: {value: '3'}},'已签收'),
                    ]
                  )]
                );
              }
            },
            {title: '操作', key: 'operator', align: 'center', className: 'mw100',
              render: (h, params) => {
                return h('div', [
                  h(!params.row.isLink ? 'span' : 'Button', {
                    props: {type: 'primary', size: 'small'},
                    style: {margin: '0 auto'},
                    on: {
                      click: () => {

                      }
                    }
                  }, !params.row.isLink ? '' : '上传'),
                ]);
              }
            },
            {title: '备注说明', key: 'notes', className: 'mw300',
              render: (h, params) => {
                return h('div', [
                  h('i-input', {props: {value: params.row.notes}})
                ]);
              }
            }
          ],

        },
        isUpload: false,
      }
    },
    mounted() {
      this[EventType.COMPANYTASKPROGRESS2TYPE]()
    },
    computed: {
      ...mapState('companyTaskProgress2',{
          data:state =>state.data
      })
    },
    methods: {
      ...mapActions('companyTaskProgress2', [EventType.COMPANYTASKPROGRESS2TYPE]),
      nextStep() {
        switch(this.operatorType) {
          case '1':
            this.$router.push({name: 'companytaskprogresstypeinfo', query: {operatorType: '1'}})
            break;
          case '2':
            this.$router.push({name: 'companytaskprogresstransferinfo', query: {operatorType: '2'}})
            break;
          case '3':
            this.$router.push({name: 'companytaskprogresschangeinfo', query: {operatorType: '3'}})
            break;
          case '4':
            this.$router.push({name: 'companytaskprogressendinfo', query: {operatorType: '4'}})
            break;
          default:
            break;
        }
      },
      goBack() {
        this.$router.push({name: 'companytasklist'})
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
