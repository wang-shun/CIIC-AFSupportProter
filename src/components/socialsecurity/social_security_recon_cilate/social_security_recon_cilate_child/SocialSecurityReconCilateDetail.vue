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
     <Table :columns="employeeResultColumns" :data="data.tableData"></Table>
    <Row class="mt20">
      <Col :sm="{span: 24}">
        <Button type="info" @click="ok">导出</Button>
        <Button type="info" @click="goBack">返回</Button>
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
           
          {title: '雇员编号', key: 'employeeNumber',  align: 'center',
            render: (h, params) => {
              return h('div',{style:{textAlign:'center'}}, [
                
              ]);
            }
          },
          {title: '姓名', key: 'employeeName',  align: 'center',
             render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '变更类型', key: 'changeType', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.changeType),
              ]);
            }
          },
          {title: '险种', key: 'insuranceType',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.insuranceType),
              ]);
            }
          },
          {title: '项目', key: 'project',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.project),
              ]);
              
            }
          },
          {title: '导入金额', key: 'importAmount', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.importAmount),
              ]);
            }
          },
          {title: '系统金额', key: 'systemAmount',  align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.systemAmount),
              ]);
            }
          },
          {title: '差异', key: 'difference', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', params.row.difference),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.SOCIALSECURITYRECONCILATEDETAIL]()
    },
    computed: {
      ...mapState('socialSecurityReconcilateDetail',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('socialSecurityReconcilateDetail',[EventType.SOCIALSECURITYRECONCILATEDETAIL]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      ok () {

      },
      cancel () {

      },
      goBack(){
        history.go(-1);
      }
    }
  }
</script>
