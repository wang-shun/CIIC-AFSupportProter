<template>
  <div>
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="*未处理：" prop="taskStatus">
                <Select v-model="operatorSearchData.taskStatus" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="本月未处理"></Option>
                  <Option value="2" label="下月未处理"></Option>
                  <!--<Option value="3" label="处理中"></Option>
                  <Option value="4" label="已完成"></Option>
                  <Option value="5" label="批退"></Option>-->
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
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
              <Form-item label="企业社保账户：" prop="ssAccount">
                <input-account v-model="operatorSearchData.ssAccount"></input-account>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="operatorSearchData.companyId"></input-company>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="身份证号：" prop="idNum">
                <Input v-model="operatorSearchData.idNum" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="任务单类型：" prop="taskCategory">
                <Select v-model="operatorSearchData.taskCategory" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="新进"></Option>
                  <Option value="2" label="转入"></Option>
                  <Option value="3" label="调整"></Option>
                  <Option value="4" label="补缴"></Option>
                  <Option value="5" label="转出"></Option>
                  <Option value="7" label="退账"></Option>
                  <!--<Option value="6" label="终止"></Option>
                  <Option value="8" label="提取"></Option>
                  <Option value="9" label="特殊操作"></Option>-->
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户名称：" prop="title">
                <Input v-model="operatorSearchData.customerName" placeholder="请输入..."></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeId">
                <Input v-model="operatorSearchData.employeeId" placeholder="请输入..."></Input>
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
              <Form-item label="社保起缴月份：" prop="startMonth">
                <Date-picker v-model="operatorSearchData.startMonth" type="month" placement="bottom"
                             placeholder="选择年月份" style="width: 100%;"></Date-picker>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['operatorSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
      <Button type="primary" style="width: 100px;" @click="checkHandle">批量办理</Button>
      <Button type="error" @click="showRefuseReason">批退</Button>
      <Button type="info" @click="exprotExcel">导出</Button>
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
          startMonth: '',
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
                      this.batchHandle(params.row);
                    }
                  }
                }, '办理'),
              ]);
            }
          },
          {
            title: '任务单类型', key: 'taskCategory', width: 120, fixed: 'left', align: 'center',
            render: (h, params) => {
              return this.$decode.taskCategory(params.row.taskCategory)
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
    async mounted() {
      this[EventType.THISMONTHHANDLETYPE]()
//      this.employeeOperatorQuery();
    },
    computed: {
      ...mapState('thisMonthHandle', {
        data: state => state.data
      }),
    },
    methods: {
      ...mapActions('thisMonthHandle', [EventType.THISMONTHHANDLETYPE]),
      routerToCommcialOperator(name) {
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
        }

        api.employeeOperatorQuery({
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.employeeResultData = data.data;
            this.employeeResultPageData.total = data.total;
          }
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
      // 检测批量办理
      checkHandle() {
        // 检查类型是否一致（只有选中了任务才能进行办理）
        if (!this.checkSelectEmployeeResultData()) {
          return false;
        }

        var length = this.selectEmployeeResultData.length;
        if (length > 1) {
          var taskCategory = this.selectEmployeeResultData[0].taskCategory

          for (var i = 1; i < length; i++) {
            if (taskCategory != this.selectEmployeeResultData[i].taskCategory) {
              this.$Modal.warning({
                title: '任务办理',
                content: '任务类型不一致'
              });
              return false;
            }
          }
        }
        this.batchHandle(this.selectEmployeeResultData, true);
      },
      // 批量办理
      batchHandle(data, isBatch = false) {
        if (isBatch) {
          // 组织任务 ID
          var taskIds = [];
          var rows = data;
          var taskCategory = rows[0].taskCategory;
          for (var row of rows) {
            taskIds.push(row.empTaskId);
          }

          this.$router.push({
            name: 'employeecommcialoperator',
            query: {operatorType: taskCategory, taskIds: taskIds}
          });
        } else {
          var taskCategory = data.taskCategory;
          // 根据任务类型跳转
          this.$router.push({
            name: 'companysocialsecuritynew',
            query: {taskCategory: taskCategory, taskId: data.empTaskId}
          });
        }
      },
      exprotExcel() {
        var ajax = this.$ajax.createProxyAjaxForName("ss-c");
//        ajax.download("/api/soccommandservice/salCompany/exprot",this.operatorSearchData);
      },
      beforeUpload(file){
        this.operatorSearchData.file = file;
        return false;
      },
      ok() {

      },
      cancel() {

      }
    }
  }
</script>
