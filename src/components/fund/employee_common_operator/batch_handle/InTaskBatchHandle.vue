<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        批量办理{{title}}新开（转入或启封）任务单
        <div slot="content">
          <Form :label-width=135>
            <Row class="mt20" type="flex" justify="start">
              <Row type="flex" justify="start">
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="公积金类型：">
                  {{hfTypeName}}
                </FormItem>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="办理类型：">
                  <Select v-model="displayVO.taskCategory" style="width: 100%;" transfer :disabled="taskCategoryDisable">
                    <Option v-for="item in taskCategoryType" :value="item.value" :key="item.value">{{item.label}}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="起缴月份：">
                  <DatePicker v-model="displayVO.startMonth" type="month" format="yyyyMM" placeholder="请选择"
                              style="width: 100%;"
                              transfer></DatePicker> 不填写则保留原起缴月份，若填写则所选任务单都更新为该月份
                </Form-item>
                </Col>
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="办理月份：">
                  <DatePicker v-model="displayVO.handleMonth" type="month" format="yyyyMM" placeholder="办理年月"
                              style="width: 100%;"
                              transfer></DatePicker>
                </Form-item>
                </Col>
                <!--<Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">-->
                <!--<FormItem label="基本/补充公积金账户：">-->
                  <!--<Input v-model="displayVO.hfEmpAccount" placeholder="请输入..." :disabled="inputDisabled"></Input>-->
                <!--</FormItem>-->
                <!--</Col>-->
                <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="操作提示：">
                  <Select v-model="displayVO.operationRemind" style="width: 100%;" transfer>
                    <Option value="" label="无"></Option>
                    <Option v-for="item in operationRemindList" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </FormItem>
                </Col>
                <Col :sm="{span: 22}" :md="{span: 12}" :lg="{span: 8}">
                <FormItem label="操作提示日期">
                  <DatePicker v-model="displayVO.operationRemindDate" format="yyyy-MM-dd" placement="bottom-end" placeholder="选择日期" style="width: 100%;" transfer :disabled="inputDisabled"></DatePicker>
                </FormItem>
                </Col>
                <Col :sm="{span: 24}">
                <FormItem label="批量办理备注：">
                  <Input v-model="displayVO.handleRemark" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
              </Row>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="当前批次任务单数量：">
                <label>{{taskCount}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="当前批次执行状态：">
                <label>{{batchStatus}}</label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="当前批次已执行数量：">
                <label>{{completeCount}}</label>
              </Form-item>
              </Col>
            </Row>
            <Row class="mt20">
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary"  :loading="isLoading" :disabled="isDownloadLoading">提交</Button>
              <Button type="primary"  :loading="isDownloadLoading" :disabled="isLoading">导出任务单</Button>
              <Button type="primary" >刷新结果</Button>
              <Button type="warning" @click="goBack">返回</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
      <Panel name="2">
        结果反馈信息
        <div slot="content">
          <Row class="mt20">
            <Col :sm="{span:24}">
            <Table border width="100%" :columns="handleResultListColumns"
                   :data="handleResultListData"></Table>
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

  export default {
    data() {
      return {
        batchEmpTaskId: '',
        hfTypeName: '基本公积金',
        operatorType: '',
        collapseInfo: [1, 2],
        isLoading: true,
        isDownloadLoading: false,
        taskCount: 100,
        batchStatus: '执行中',
        completeCount: 72,
        title: '',
        displayVO: {
          taskCategory: '',
          operationRemind: '',
          operationRemindDate: '',
          handleMonth: '',
          startMonth: '',
          endMonth: '',
          handleRemark: '',
          handleRemarkMan: '',
          handleRemarkDate: '',
        },
        showButton: true,
        taskCategoryType: [
          {value: '1', label: '新进'},
          {value: '2', label: '转入'},
          {value: '3', label: '启封'},
        ], //变更方式
        handleResultListData: [],
        handleResultListColumns: [
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
          {
            title: '办理状态', key: 'handleStatus', width: 100, align: 'center'
          },
          {
            title: '失败原因', key: 'reason', width: 300, align: 'center'
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
      this.operatorType = this.$route.query.operatorType;
      this.operatorType = this.$route.query.operatorType;
      this.initData();

      if(this.operatorType=='9'||this.operatorType=='10'||this.operatorType=='11'){
        this.taskCategoryType=[{value: '9', label: '翻牌新开'},{value: '10', label: '翻牌转入'},{value: '11', label: '翻牌启封'}]
        this.title = '翻牌'
      }else{
        this.taskCategoryType=[{value: '1', label: '新开'},{value: '2', label: '转入'},{value: '3', label: '启封'}]
      }
    },
    computed: {

    },
    methods: {
      initData() {

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
    }
  }
</script>
