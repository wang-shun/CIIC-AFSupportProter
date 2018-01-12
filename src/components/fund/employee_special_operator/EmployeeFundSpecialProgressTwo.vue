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
          <company-fund-account-info :companyFundAccountInfo="data.companyFundAccountInfo"></company-fund-account-info>
        </div>
      </Panel>
      <Panel name="2">
        雇员信息
        <div slot="content">
        </div>
      </Panel>
      <Panel name="3">
        办理所需材料清单
        <div slot="content">
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}">
      <Button type="error" @click="">批退</Button>
      <Button type="primary" @click="">下一步</Button>
      <Button type="warning" @click="" class="ml10">返回</Button>
      </Col>
      <Col :sm="{span:12}" :md="{span: 12}" :lg="{span: 12}" class="tr">
      <!-- <Button type="primary" @click="isUpload = true">上传扫描件</Button> -->
      <!-- <Button type="primary" @click="goBack">反馈未签收</Button> -->
      <Button type="primary" @click="">签收全部材料</Button>
      </Col>
    </Row>
  </Form>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/event_types'

  import companyFundAccountInfo from '../common/CompanyFundAccountInfo.vue'
  import employeeFundAccountInfo from '../common/EmployeeFundAccountInfo.vue'

  export default {
    components: {companyFundAccountInfo, employeeFundAccountInfo},
    data() {
      return {
        currentStep: 2,
        collapseInfo: [1, 2, 3], //展开栏
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
          {title: '操作', key: 'status', align: 'center', className: 'mw200',
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
      }
    },
    mounted() {
      this[EventType.EMPLOYEEFUNDSPECIALPROGRESSTWO]()
    },
    computed: {
      ...mapState('employeeFundSpecialProgressTwo',{
        data:state => state.data
      })
    },
    methods: {
      ...mapActions('employeeFundSpecialProgressTwo',[EventType.EMPLOYEEFUNDSPECIALPROGRESSTWO]),
    }
  }
</script>
