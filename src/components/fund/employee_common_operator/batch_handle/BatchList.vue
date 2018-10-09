<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        批量办理任务单批次列表
        <div slot="content">
            <Row class="mt20">
              <Col :sm="{span:24}">
              <Table border width="100%" :columns="batchListColumns"
                     :data="batchListData" height=200></Table>
              <Page
                class="pageSize"
                @on-change="batchPageNum"
                @on-page-size-change="batchPageSize"
                :total="batchListPageData.total"
                :page-size="batchListPageData.pageSize"
                :page-size-opts="batchListPageData.pageSizeOpts"
                :current="batchListPageData.pageNum"
                show-sizer show-total
              ></Page>
              </Col>
            </Row>
        </div>
      </Panel>
      <Panel name="2">
        批次结果反馈信息
        <div slot="content">
          <Form :label-width=125>
          <Row>
            <Col :sm="{span:8}" :md="{span: 8}" :lg="{span: 8}">
            <Form-item label="批次任务单数量：">
              <label>{{taskCount}}</label>
            </Form-item>
            </Col>
            <Col :sm="{span:8}" :md="{span: 8}" :lg="{span: 8}">
            <Form-item label="批次执行状态：">
              <label>{{batchStatus}}</label>
            </Form-item>
            </Col>
            <Col :sm="{span:8}" :md="{span: 8}" :lg="{span: 8}">
            <Form-item label="批次已执行数量：">
              <label>{{completeCount}}</label>
            </Form-item>
            </Col>
            <Col class="tr">
            <Button type="primary">导出批次结果</Button>
            <Button type="primary">刷新结果</Button>
            </Col>
          </Row>
          </Form>
          <Row class="mt20">
            <Col :sm="{span:24}">
            <Table border width="100%" :columns="handleResultListColumns"
                   :data="handleResultListData" height=300></Table>
            <Page
              class="pageSize"
              @on-change="handlePageNum"
              @on-page-size-change="handlePageSize"
              :total="handleResultListPageData.total"
              :page-size="handleResultListPageData.pageSize"
              :page-size-opts="handleResultListPageData.pageSizeOpts"
              :current="handleResultListPageData.pageNum"
              show-sizer show-total
            ></Page>
            </Col>
          </Row>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>
<script>
  import api from '../../../../api/house_fund/employee_operator'
  import dict from '../../../../api/dict_access/house_fund_dict'

  export default {
    data() {
      return {
        collapseInfo: [1, 2],
        taskCount: 100,
        batchStatus: '执行中',
        completeCount: 72,
        batchListData: [],
        batchListColumns: [
          {
            title: '批次号', key: 'batchNum', width: 120, align: 'center'
          },
          {
            title: '批次类型', key: 'batchTaskCategory', width: 100, align: 'center'
          },
          {
            title: '客户编号', key: 'companyId', width: 100, align: 'center'
          },
          {
            title: '公积金类型', key: 'hfType', width: 100, align: 'center'
          },
          {
            title: '任务单办理类型', key: 'taskCategory', width: 150, align: 'center'
          },
          {
            title: '起缴年月', key: 'startMonth', width: 100, align: 'center'
          },
          {
            title: '截止年月', key: 'endMonth', width: 100, align: 'center'
          },
          {
            title: '办理年月', key: 'hfMonth', width: 100, align: 'center'
          },
          {
            title: '操作提示', key: 'operationRemind', width: 100, align: 'center'
          },
          {
            title: '操作提示日期', key: 'operationRemindDate', width: 120, align: 'center'
          },
          {
            title: '补缴原因', key: 'repairReason', width: 100, align: 'center'
          },
          {
            title: '办理备注', key: 'handleRemark', width: 100, align: 'center'
          },
        ],
        batchListPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        handleResultListData: [],
        handleResultListColumns: [
          {
            title: '办理状态', key: 'handleStatus', width: 100, align: 'center'
          },
          {
            title: '失败原因', key: 'failReason', width: 300, align: 'center'
          },
          {
            title: '雇员', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center'
          },
          {
            title: '任务单类型', key: 'taskCategory', width: 200, align: 'center'
          },
          {
            title: '起缴年月', key: 'startMonth', width: 100, align: 'center'
          },
          {
            title: '截止年月', key: 'endMonth', width: 100, align: 'center'
          },
          {
            title: '公积金类型', key: 'hfType', width: 200, align: 'center'
          },
          {
            title: '公积金账号', key: 'hfAccount', width: 200, align: 'center'
          },
          {
            title: '客户编号', key: 'companyId', width: 120, align: 'center'
          },
          {
            title: '客户名称', key: 'title', width: 200, align: 'center'
          },
        ],
        handleResultListPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.EMPLOYEE_DEFAULT_PAGE_SIZE_OPTS
        },
      }
    },
    mounted() {
      this.initData();
    },
    computed: {

    },
    methods: {
      initData() {
        dict.getDictData().then(data => {
          if (data.code == 200) {
//            this.taskCategoryList = data.data.HFLocalTaskCategory;
            this.operationRemindList = data.data.OperationRemind;
            this.repairReason = data.data.RepairReason;
          }
        })
      },
      handlePageNum(val) {
        this.handleResultListPageData.pageNum = val;
//        this.employeeOperatorQuery();
      },
      handlePageSize(val) {
        this.handleResultListPageData.pageSize = val;
//        this.employeeOperatorQuery();
      },
      goBack() {

      },
      batchPageNum(val) {
        this.batchListPageData.pageNum = val;
      },
      batchPageSize(val) {
        this.batchListPageData.pageSize = val;
      }
    }
  }
</script>
