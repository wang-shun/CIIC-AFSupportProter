<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name='1'>
        下载Excel报表
        <div slot="content">
           <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
                 <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                 <Form-item label="报表年月：" prop="reportYearAndMonth">
                  <Input v-model="operatorSearchData.reportYearAndMonth" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
               <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="companyAccountType">
                  <Input v-model="operatorSearchData.companyAccountType" @on-focus="operatorSearchData.isShowAccountType = true" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
            </Row>
            <br/>
            <br/>
            <Row type="flex" justify="start">
              <Col :sm="{span: 12}" offset='7'>
                  <Button type="info" @click="">雇员缴费明细</Button>
                  <Button type="info" @click="">退费明细</Button>
                   <Button type="info" @click="monthlypaymentnotice">月缴费通知书</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <!-- 企业社保账户分类 模态框 -->
    <Modal
      v-model="operatorSearchData.isShowAccountType"
      title="企业社保账户分类"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-account-search-modal :sSocialSecurityTypeData="data.sSocialSecurityTypeData"></company-account-search-modal>
    </Modal>


  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../common_control/CustomerModal.vue'
  import companyAccountSearchModal from '../../common_control/CompanyAccountSearchModal.vue'
  import EventType from '../../../store/event_types'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          reportYearAndMonth:'',//报表年月
          companyAccountType:'',//企业社保账户
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
      },
      monthlypaymentnotice(){
        this.$router.push({name: 'monthlypaymentnotice'})
      }
    }
  }
</script>
