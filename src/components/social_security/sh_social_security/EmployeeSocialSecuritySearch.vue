<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员社保查询
        <div slot="content">
          <Form :label-width=150 ref="searchCondition" :model="searchCondition">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="ssAccount">
                   <input-account v-model="searchCondition.ssAccount"></input-account>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业社保账户：" prop="companyAccountType">
                  <Input v-model="searchCondition.companyAccountType" placeholder="请输入..."></Input>
                </Form-item>
              </Col> -->
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="searchCondition.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="结算区县：" prop="settlementArea">
                  <Select v-model="searchCondition.settlementArea" transfer>
                    <Option v-for="item in regionList" :value="item.label" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保账户类型：" prop="ssAccountType">
                  <Select v-model="searchCondition.ssAccountType" style="width: 100%;" transfer>
                    <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="searchCondition.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="社保状态：" prop="archiveTaskStatus">
                  <Select v-model="searchCondition.archiveTaskStatus" style="width: 100%;" transfer>
                    <Option v-for="item in sSecurityStateList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <input-company v-model="searchCondition.companyId"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户名称：" prop="title">
                  <input-company-name v-model="searchCondition.title" ></input-company-name>
                  <!-- <Input v-model="searchCondition.title"  placeholder="请输入..."></Input> -->
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="身份证号：" prop="idNum">
                  <Input v-model="searchCondition.idNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <!-- <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="人员分类：" prop="empClassify">
                  <Select v-model="searchCondition.empClassify" style="width: 100%;" transfer>
                    <Option v-for="item in personTypeList" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </Form-item>
              </Col> -->
            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('searchCondition')" class="ml10">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row style="margin: 10px 0;">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="exportData">导出</Button>
      </Col>
    </Row>

    <Table border :columns="employeeSocialSecurityColumns" :data="employeeSocialSecurityData" ref="employeeSocialSecurityData"></Table>
    <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :page-size-opts="pageData.pageSizeOpts"
        :current="pageData.pageNum"
        show-sizer show-total></Page>

  </div>


</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from "../../common_control/CustomerModal.vue"
  import companyAccountSearchModal from "../../common_control/CompanyAccountSearchModal.vue"
  import ICol from "../../../../node_modules/iview/src/components/grid/col"
  import EventTypes from '../../../store/event_types'
  import api from '../../../api/social_security/employee_operator'
  import InputAccount from '../../common_control/form/input_account'
  import InputCompany from '../../common_control/form/input_company'
  import InputCompanyName from '../../common_control/form/input_company/InputCompanyName.vue'
  export default {
    components: {ICol, customerModal, companyAccountSearchModal,InputAccount,InputCompany,InputCompanyName},
    data() {
      return {
        collapseInfo: [1, 2, 3], //展开栏
        pageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        searchCondition: {
          companyId: '', //客户编号
          title: '', //客户名称
         // companyAccountType: '', //社保账户类型
          settlementArea: '', //结算区域
          ssAccountType: '',  //社保账户类型
          employeeId: '', //雇员编号
          employeeName: '', //雇员姓名
          idNum: '', //身份证号
          ssAccount:'',//企业社保账号
          archiveTaskStatus: '',//社保状态
          //empClassify: '' //人员分类
        },
        employeeSocialSecurityData:[],//列表数据
        isShowCustomerName: false, //客户名称Modal
        isShowAccountType: false, //社保账户类型Modal

        orderNumber: '', //任务单编号
        orderStartTime: '', //任务开始时间

        regionList: [
           {value: '', label: '全部'},
          {value: '1', label: '徐汇'},
          {value: '2', label: '长宁'},
          {value: '3', label: '浦东'},
          {value: '4', label: '卢湾'},
          {value: '5', label: '静安'},
          {value: '6', label: '黄浦'}
        ],

        sSecurityStateList: [ //1-已办  2-已做 3-转出
        {value: '', label: '全部'},
          {value: '1', label: '已办'},
          {value: '2', label: '已做'},
          {value: '3', label: '转出'},
        ], //社保状态

        isShowCustomerName: false, //客户名称显示模态框
        mCustomerNumber: '', //客户编号
        mCustomerName: '', //客户姓名
        accountTypeList: [
            {value: '', label: '全部'},
            {value: '1', label: '中智大库'},
            {value: '2', label: '中智外包'},
            {value: '3', label: '独立户'}
        ], //社保账户类型

        personTypeList: [
          {value: '1', label: '本地'},
          {value: '2', label: '外地'},
          {value: '3', label: '外籍三险'},
          {value: '4', label: '外籍五险'},
          {value: '5', label: '延迟退休人员'}

        ], //人员分类

        employeeSocialSecurityColumns: [
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 120,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {

                      this.showInfo(params.row.empArchiveId)
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {title: '雇员编码', key: 'employeeId', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'right'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {title: '雇员姓名', key: 'employeeName', align: 'center', width: 140,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeName),
              ]);
            }
          },
          {title: '证件号', key: 'idNum', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {title: '企业社保账号', key: 'ssAccount', align: 'center', width: 200,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssAccount),
              ]);
            }
          },
          {title: '状态', key: 'archiveTaskStatus', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'center'}}, [
                h('span', this.$decode.archiveStatus(params.row.archiveTaskStatus)),
              ]);
            }
          },
          {title: '客服经理', key: 'eservicer', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.eservice),
              ]);
            }
          },
          {title: '社保账户类型', key: 'ssAccountType', align: 'center', width: 120,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', this.$decode.accountType(params.row.ssAccountType)),
              ]);
            }
          },
          {title: '结算区县', key: 'settlementArea', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.settlementArea),
              ]);
            }
          },
          {title: '客户编号', key: 'companyId', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {title: '客户名称', key: 'title', align: 'center', width: 250,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {title: '企业社保账户名称', key: 'comAccountName', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountName),
              ]);
            }
          },
           {title: '起缴月份', key: 'startMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.startMonth),
              ]);
            }
          },
           {title: '截止月份', key: 'endMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.endMonth),
              ]);
            }
          },
           {title: '办理月份', key: 'ssMonth', align: 'center', width: 100,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssMonth),
              ]);
            }
          },
          {title: '入职日期', key: 'inDate', align: 'center', width: 150,
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.inDate),
              ]);
            }
          }


        ]
      }
    },
    mounted() {

      this.employeeQuery({})

    },
    computed: {

    },
    methods: {
      exportData() {
        this.$refs['employeeSocialSecurityData'].exportCsv({
          filename: '原始数据'
        });
      },
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      showInfo (ind) {
        this.$router.push({name:'employeeSocialSecurityInfo', query: {empArchiveId: ind}});

      },
      employeeQuery(params){

        let self =this
        api.employeeQuery({
          pageSize: this.pageData.pageSize,
          pageNum: this.pageData.pageNum,
          params: params,
        }).then(data => {

          self.employeeSocialSecurityData = data.data.rows;
          self.pageData.total = Number(data.data.total);
        })
      },
      handlePageNum(val) {
        this.pageData.pageNum = val;
        let params = this.searchCondition
        this.employeeQuery(params);
      },
      handlePageSize(val) {
        this.pageData.pageSize = val;
        let params = this.searchCondition
        this.employeeQuery(params);
      },
      ok () {

      },
      cancel () {

      }
    }
  }

</script>
<style scoped>
  .ivu-card {background: rgba(246, 246, 246, 1);}
  .checkBtn .ivu-btn {float: right;}
</style>
