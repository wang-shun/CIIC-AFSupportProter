<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员特殊操作
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="账户类型：" prop="ssAccountType">
                <Select v-model="operatorSearchData.ssAccountType" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="中智大库"></Option>
                  <Option value="2" label="中智外包"></Option>
                  <Option value="3" label="独立户"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="operatorSearchData.companyId"></input-company>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：" prop="title">
                <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeNumber">
                <Input v-model="operatorSearchData.employeeNumber" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账户：" prop="ssAccount">
                <input-account v-model="operatorSearchData.ssAccount"></input-account>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人员分类：" prop="empClassify">
                <Select v-model="operatorSearchData.empClassify" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="本地"></Option>
                  <Option value="2" label="外地"></Option>
                  <Option value="3" label="外籍三险"></Option>
                  <Option value="4" label="外籍五险"></Option>
                  <Option value="5" label="延迟退休人员"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单类型：" prop="taskCategory">
                <Select v-model="operatorSearchData.taskCategory" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <!--<Option value="1" label="新进"></Option>
                  <Option value="2" label="转入"></Option>
                  <Option value="3" label="调整"></Option>
                  <Option value="4" label="补缴"></Option>
                  <Option value="5" label="转出"></Option>
                  <Option value="7" label="退账"></Option>-->
                  <Option value="6" label="终止"></Option>
                  <Option value="8" label="提取"></Option>
                  <Option value="9" label="特殊操作"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="身份证号：" prop="idNum">
                <Input v-model="operatorSearchData.idNum" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="是否加急：" prop="urgent">
                <Select v-model="operatorSearchData.urgent" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="0" label="否"></Option>
                  <Option value="1" label="是"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="结算中心：" prop="settlementArea">
                <Select v-model="operatorSearchData.settlementArea" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="徐汇区" label="徐汇区"></Option>
                  <Option value="浦东新区" label="浦东新区"></Option>
                  <Option value="闵行区" label="闵行区"></Option>
                  <Option value="闸北区" label="闸北区"></Option>
                  <Option value="黄浦区" label="黄浦区"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务发起时间：" prop="submitTime">
                <DatePicker v-model="operatorSearchData.submitTime" type="daterange" placement="bottom"
                            placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
              </Form-item>
              </Col>

            </Row>
            <Row>
              <Col :sm="{span:24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['operatorSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Button type="error" @click="showRefuseReason">批退</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="selection"
             :columns="employeeResultColumns"
             :data="employeeResultData"
             @on-selection-change="selectionChange"></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSite"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>

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
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../../store/EventTypes'
  import api from '../../../../api/social_security/employee_operator'

  import InputAccount from '../../../commoncontrol/form/input-account'
  import InputCompany from '../../../commoncontrol/form/input-company'

  export default {
    components: {InputAccount, InputCompany},
    data() {
      return {
        collapseInfo: [1], //展开栏

        operatorSearchData: {
          taskStatus: '',
          employeeName: '',
          settlementArea: '',
          ssAccountType: '',
          empClassify: '',
          ssAccount: '',
          companyId: '',
          idNum: '',
          taskCategory: '',
          title: '',
          employeeId: '',
          urgent: '',
          submitTime: '',
        },

        // 批退
        isRefuseReason: false,
        rejectionRemark: '',
        selectEmployeeResultData: [],

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },

        refuseReason: '',

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
              let self = this
              return h('div', [
                h('Button', {
                  props: {type: 'success', size: 'small'},
                  style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      
                      this.$router.push({name: 'employeespecialprogresstwo',query:{taskStatus:params.row.handleStatus,empTaskId:params.row.empTaskId}})
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {
            title: '特殊操作', key: 'taskCategorySpecial', width: 120, fixed: 'left', align: 'center',
            render: (h, params) => {
              return this.$decode.specialOperatorType(params.row.taskCategorySpecial)
            }
          },
          {
            title: '是否加急', key: 'urgent', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.urgent(params.row.urgent)
            }
          },
          {
            title: '雇员', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center'
          },
          {
            title: '雇员证件号', key: 'idNum', width: 200, align: 'center'
          },
          {
            title: '企业社保账号', key: 'comAccountId', width: 200, align: 'center'
          },
          {
            title: 'UKEY密码', key: 'ssPwd', width: 200, align: 'center'
          },
          {
            title: '执行日期', key: 'doDate', width: 150, align: 'center'
          },
          {
            title: '客户编号', key: 'companyId', width: 100, align: 'center'
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center'
          },
          {
            title: '客服中心', key: 'serviceCenter', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceCenter),
              ]);
            }
          },
          {
            title: '客服经理', key: 'serviceManager', width: 150, align: 'center',
            render: (h, params) => {
              return h('div', {style: {textAlign: 'left'}}, [
                h('span', params.row.serviceManager),
              ]);
            }
          },
          {
            title: '雇员分类', key: 'empClassify', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.empClassify(params.row.empClassify)
            }
          },
          {
            title: '账户类型', key: 'ssAccountType', width: 120, align: 'center',
            render: (h, params) => {
              return this.$decode.accountType(params.row.ssAccountType)
            }
          },
          {
            title: '结算区县', key: 'settlementArea', width: 100, align: 'center'
          },
          {
            title: '发起供应商', key: 'supplierId', width: 200, align: 'center'
          },
          {
            title: '发起人', key: 'submitterId', width: 100, align: 'center'
          },
          {
            title: '发起时间', key: 'submitTime', width: 180, align: 'center'
          },
          {
            title: '备注', key: 'handleRemark', width: 300, align: 'center'
          }
        ]
      }
    },
    mounted() {
      this[EventType.NOPROGRESSTYPE]()
      this.employeeOperatorQuery();
      this.initData();//
    },
    computed: {
      ...mapState('noProgress', {
        data: state => state.data
      })
    },
    methods: {
      ...mapActions('noProgress', [EventType.NOPROGRESSTYPE]),
      initData(){
        // apiSelectData
      },
      routerToCommcialOperator: function (name) {
        this.$router.push({
          name: 'employeecommcialoperator',
          query: {operatorType: name}
        });
      },
      employeeOperatorQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
          // 处理 社保起缴月份
          if (params.startMonth) {
            params.startMonth = this.$utils.formatDate(params.startMonth, 'YYYYMM');
          }
          // 操作类型，1 日常操作、2 特殊操作，默认日常操作
          params.operatorType = 2;
          //任务单状态
          params.taskStatus = 1;
          // 处理任务发起时间
          var submitTimes = params.submitTime;
          if (submitTimes) {
            params.beginSubmitTime = this.$utils.formatDate(submitTimes[0],'YYYY-MM-DD HH:mm:ss');
            params.endSubmitTime = this.$utils.formatDate(submitTimes[1],'YYYY-MM-DD HH:mm:ss');
            params.submitTime = null;
          }
        }

        api.employeeOperatorQuery({
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: params,
        }).then(data => {
          
          this.employeeResultData = data.data;
          this.employeeResultPageData.total = data.total;
        })
      },
      handlePageNum(val) {
        this.employeeResultPageData.pageNum = val;
        this.employeeOperatorQuery();
      },
      handlePageSite(val) {
        this.employeeResultPageData.pageSize = val;
        this.employeeOperatorQuery();
      },
      // 检查是否选中任务
      checkSelectEmployeeResultData() {
        if (this.selectEmployeeResultData.length == 0) {
          this.$Modal.warning({
            title: '批退',
            content: '请选择任务'
          });
          return false;
        }
        return true;
      },
      // 批退
      showRefuseReason() {
        if (this.checkSelectEmployeeResultData()) {
          this.isRefuseReason = true
        }
      },
      handleRefuseReason() {
        var ids = [];
        for (var d of this.selectEmployeeResultData) {
          ids.push(d.empTaskId);
        }

        var ajax = api.refuseReason({
          remark: this.rejectionRemark,
          ids: ids
        })

        this.$ajax.handle({
          vm: this,
          ajax: ajax,
          title: '任务批退',
          callback: (data) => {
            this.employeeOperatorQuery();
          }
        })
      },
      // 选中项发生变化时就会触发
      selectionChange(selection) {
        this.selectEmployeeResultData = selection;
      },
      ok() {

      }
      ,
      cancel() {

      }
    }
  }
</script>
