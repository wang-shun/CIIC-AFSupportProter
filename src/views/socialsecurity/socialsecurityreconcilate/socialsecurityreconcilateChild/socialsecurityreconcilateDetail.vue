<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        对账差异
        <div slot="content">
            <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
                 <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="社保月份：" prop="socialsecuritymonth">
                  <label v-model="operatorSearchData.socialsecuritymonth">{{operatorSearchData.socialsecuritymonth}}</label>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="企业社保账户：" prop="companyAccount">
                  <label v-model="operatorSearchData.companyAccount">{{operatorSearchData.companyAccount}}</label>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="差异总数(按雇员)：" prop="differenceNumberOfEmployee">
                  <label>{{operatorSearchData.differenceNumberOfEmployee}}</label>
                </Form-item>
              </Col> 
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 12}">
                <Form-item label="差异总数(含项目)：" prop="differenceNumberOfProject">
                  <label >{{operatorSearchData.differenceNumberOfProject}}</label>
                </Form-item>
              </Col>
            </Row>
          </Form> 
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Button type="info" @click="ok">批量导入社保变更汇总表</Button>
        <Button type="info" @click="">导出</Button>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../commoncontrol/customermodal.vue'
  import companyAccountSearchModal from '../../../commoncontrol/companyaccountsearchmodal.vue'
  import EventType from '../../../../store/EventTypes'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
        
          differenceNumberOfEmployee:33,
          differenceNumberOfProject:66,
          socialsecuritymonth:'201705',//社保月份
          companyAccount: '欧莱雅（中国）有限公司上海静安分公司', //企业社保账户分类
          isShowAccountType: false, //社保账户模糊块的显示      
        },

        employeeResultColumns: [
           
          {title: '查看结果', key: 'getResult',  width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {title: '导入', key: 'export', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      
                    }
                  }
                }, '导入'),
              ]);
            }
          },
          {title: '社保月份', key: 'SocialSecurityMonth', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.SocialSecurityMonth),
              ]);
            }
          },
          {title: '企业社保账户分类', key: 'companySocialSecurityType', width: 250, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.companySocialSecurityType),
              ]);
            }
          },
          {title: '下载月度变更', key: 'downloadChanngeOfMonth', width: 200, align: 'center',
            render: (h, params) => {
              let changeTableType = params.row.changeTableType;
               if(changeTableType=='YYS(养医失)'){
                  return h('div', [
                        h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                          on: {
                            click: () => {
                              
                            }
                          }
                           },'下载养医失'),
                        ])
                   }else{
                     return h('div', [
                        h('A', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                          on: {
                            click: () => {
                              
                            }
                          }
                           },'下载工生育'),
                        ])
                   }
              
            }
          },
          {title: '社保导入文件', key: 'importFileOfSocialSecurity', width: 197, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.importFileOfSocialSecurity),
              ]);
            }
          },
          {title: '变更汇总表类型', key: 'changeTableType', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.changeTableType),
              ]);
            }
          },
          {title: '差异数（按雇员）', key: 'differenceNumber', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.differenceNumber),
              ]);
            }
          },
          {title: '对账操作人', key: 'reconciliationOperator', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.reconciliationOperator),
              ]);
            }
          },
          {title: '最近对账时间', key: 'recentReconciliationTime', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.recentReconciliationTime),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.SOCIALSECURITYRECONCILATE]()
    },
    computed: {
      ...mapState('socialSecurityReconcilate',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('socialSecurityReconcilate',[EventType.SOCIALSECURITYRECONCILATE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {

      },
      cancel () {

      }
    }
  }
</script>
