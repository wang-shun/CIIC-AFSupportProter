<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="*未处理：" prop="handleMonth">
                <Select v-model="operatorSearchData.handleMonth" style="width: 100%;" transfer>
                  <Option v-for="item in operatorSearchData.handleMonthList" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="结算中心：" prop="region">
                <Select v-model="operatorSearchData.region" style="width: 100%;" transfer>
                  <Option v-for="item in operatorSearchData.regionList" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="账户类型：" prop="accountTypeValue">
                <Select v-model="operatorSearchData.accountTypeValue" style="width: 100%;" transfer>
                  <Option v-for="item in operatorSearchData.accountTypeList" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人员分类：" prop="personTypeValue">
                <Select v-model="operatorSearchData.personTypeValue" style="width: 100%;" transfer>
                  <Option v-for="item in operatorSearchData.personTypeList" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账户：" prop="companyAccountType">
                <Input v-model="operatorSearchData.companyAccountType"
                       @on-focus="operatorSearchData.isShowAccountType = true" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="customerNumber">
                <Input v-model="operatorSearchData.customerNumber" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="身份证号：" prop="idNumber">
                <Input v-model="operatorSearchData.idNumber" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单类型：" prop="taskTypeValue">
                <Select v-model="operatorSearchData.taskTypeValue" style="width: 100%;" transfer>
                  <Option v-for="item in operatorSearchData.taskTypeList" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：" prop="customerName">
                <Input v-model="operatorSearchData.customerName"
                       @on-focus="operatorSearchData.isShowCustomerName = true" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeNumber">
                <Input v-model="operatorSearchData.employeeNumber" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="是否加急：" prop="emergency">
                <Select v-model="operatorSearchData.emergency" style="width: 100%;" transfer>
                  <Option v-for="item in operatorSearchData.emergencyList" :value="item.value" :key="item.value">
                    {{item.label}}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保起缴月份：" prop="SocialsecurityStartMonth">
                <Date-picker v-model="operatorSearchData.SocialsecurityStartMonth" type="month" placement="bottom"
                             placeholder="选择年月份" style="width: 100%;" transfer></Date-picker>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search">查询</Button>
              <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
      <Dropdown @on-click="routerToCommcialOperator">
        <Button type="primary" style="width: 100px;">
          批量办理
          <Icon type="arrow-down-b"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="1">雇员新进、转入</DropdownItem>
          <DropdownItem name="2">雇员补缴</DropdownItem>
          <DropdownItem name="3">雇员调整</DropdownItem>
          <DropdownItem name="4">雇员转出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button type="error" @click="isRefuseReason = true">批退</Button>
      <Button type="info" @click="">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="selection" :columns="employeeResultColumns" :data="employeeResultData"></Table>
      <Page
        @on-change="handleEmployeeOperatorQuery"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total class="pageSize"></Page>
      </Col>
    </Row>

    <!-- 批退理由 -->
    <Modal
      v-model="isRefuseReason"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form>
        <p>
          <Form-item>
            <Input v-model="refuseReason" type="textarea" :rows=4 placeholder="请填写批退备注..."></Input>
          </Form-item>
        </p>
      </Form>
    </Modal>

    <!-- 客户名称 模态框 -->
    <Modal
      v-model="operatorSearchData.isShowCustomerName"
      title="选择客户"
      @on-ok="ok"
      @on-cancel="cancel">
      <customer-modal :customerData="data.customerData"></customer-modal>
    </Modal>

    <!-- 企业社保账户分类 模态框 -->
    <Modal
      v-model="operatorSearchData.isShowAccountType"
      title="企业社保账户分类"
      @on-ok="ok"
      @on-cancel="cancel">
      <company-account-search-modal
        :sSocialSecurityTypeData="data.sSocialSecurityTypeData"></company-account-search-modal>
    </Modal>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import customerModal from '../../../commoncontrol/customermodal.vue'
  import companyAccountSearchModal from '../../../commoncontrol/companyaccountsearchmodal.vue'
  import EventType from '../../../../store/EventTypes'
  import api from '../../../../api/social_security/employee_operator'

  export default {
    components: {customerModal, companyAccountSearchModal},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          handleMonth: '1',
          handleMonthList: [
            {value: '1', label: '本月处理'},
            {value: '2', label: '下月处理'}
          ], //本月或者下月处理
          customerNumber: '', //客户编号
          customerName: '', //客户名称
          isShowCustomerName: false, //客户名称显示模态框
          accountTypeValue: '',
          accountTypeList: [
            {value: '1', label: '独立户'},
            {value: '2', label: '大库'},
            {value: '3', label: '外包'}
          ], //账户类型
          companyAccountType: '', //企业社保账户分类
          isShowAccountType: false, //客户名称显示模态框
          personTypeValue: '',
          personTypeList: [
            {value: '1', label: '本地'},
            {value: '2', label: '外地'},
            {value: '3', label: '外籍三险'},
            {value: '4', label: '外籍五险'}
          ], //人员分类
          employeeNumber: '', //雇员编号
          employeeName: '', //雇员姓名
          idNumber: '', //身份证号
          taskTypeValue: '',
          taskTypeList: [
            {value: '1', label: '新开转入'},
            {value: '2', label: '调整'},
            {value: '3', label: '补缴'},
            {value: '4', label: '转出'}
          ], //人员分类
          regionList: [
            {value: '1', label: '徐汇'},
            {value: '2', label: '长宁'},
            {value: '3', label: '浦东'},
            {value: '4', label: '卢湾'},
            {value: '5', label: '静安'},
            {value: '6', label: '黄浦'}
          ],
          region: '', //结算区域
          emergency: '',
          emergencyList: [
            {value: '1', label: ''},
            {value: '2', label: '加急'}
          ], //是否加急
          SocialsecurityStartMonth: ''//社保起缴月份
        },

        isRefuseReason: false,
        refuseReason: '',

        employeeResultData:[],
        employeeResultPageData:{
          total: 0,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageNum: 1,
          pageSizeOpts:[5,10]
        },
        employeeResultColumns: [
          {
            type: 'selection',
            fixed: 'left',
            width: 60,
            align: 'center'
          },
          {
            title: '操作', key: 'action', fixed: 'left', width: 80, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      switch (params.row.type) {
                        case '新进转入':
                          this.$router.push({
                            name: 'companysocialsecuritynew',
                            query: {operatorType: '0', sourceFrom: 'operator'}
                          });
                          break;
                        case '调整':
                          this.$router.push({
                            name: 'companysocialsecuritynew',
                            query: {operatorType: '1', sourceFrom: 'operator'}
                          });
                          break;
                        case '转出':
                          this.$router.push({
                            name: 'companysocialsecuritynew',
                            query: {operatorType: '2', sourceFrom: 'operator'}
                          });
                          break;
                        case '补缴':
                          this.$router.push({
                            name: 'companysocialsecuritynew',
                            query: {operatorType: '4', sourceFrom: 'operator'}
                          });
                          break;
                      }
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {
            title: '任务单编号', key: 'empTaskId', width: 120, fixed: 'left', align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.empTaskId),
              ]);
            }
          },
          {
            title: '任务单类型', key: 'taskCategory', width: 120, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.taskCategory),
              ]);
            }
          },
          {
            title: '是否加急', key: 'urgent', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.urgent),
              ]);
            }
          },
          {
            title: '雇员', key: 'empName', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.empName),
              ]);
            }
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.employeeId),
              ]);
            }
          },
          {
            title: '雇员证件号', key: 'idNum', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.idNum),
              ]);
            }
          },
          {
            title: '企业社保账号', key: 'comAccountId', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.comAccountId),
              ]);
            }
          },
          {
            title: 'UKEY密码', key: 'ssPwd', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.ssPwd),
              ]);
            }
          },
          {
            title: '执行日期', key: 'doDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.doDate),
              ]);
            }
          },
          {
            title: '客户编号', key: 'companyId', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.companyId),
              ]);
            }
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.title),
              ]);
            }
          },
          {
            title: '完成截止日期', key: 'expireDate', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.expireDate),
              ]);
            }
          },
          {
            title: '发起人', key: 'submitterId', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.submitterId),
              ]);
            }
          },
          {
            title: '发起时间', key: 'submitTime', width: 180, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.submitTime),
              ]);
            }
          },
          {
            title: '备注', key: 'handleRemark', width: 300, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.handleRemark),
              ]);
            }
          }
        ]
      }
    },
    mounted() {
      this[EventType.THISMONTHHANDLETYPE]()
      var params = {
        pageSize: this.employeeResultPageData.pageSize,
        pageNum: this.employeeResultPageData.pageNum,
      };

      params.params = {};
      api.employeeOperatorQuery(params).then(response => {
        this.employeeResultData = response.data.data;
        this.employeeResultPageData.total = response.data.total;
      })
    },
    computed: {
      ...mapState('thisMonthHandle',{
          data:state => state.data
      })
    },
    methods: {
      ...mapActions('thisMonthHandle', [EventType.THISMONTHHANDLETYPE]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      routerToCommcialOperator: function (name) {
        //this.$refs.selection.getSelection() 获得选中行
        this.$router.push({
          name: 'employeecommcialoperator',
          query: {operatorType: name}
        });
      },
      employeeOperatorQuery(){
        var params = {
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
        };

        params.params = {};
        api.employeeOperatorQuery(params).then(response => {
          this.employeeResultData = response.data.data;
          this.employeeResultPageData.total = response.data.total;
        })
      },
      handleEmployeeOperatorQuery(val) {
        this.employeeResultPageData.pageNum = val;
        this.employeeOperatorQuery();
      },
      ok() {

      },
      cancel() {

      }
    }
  }
</script>
