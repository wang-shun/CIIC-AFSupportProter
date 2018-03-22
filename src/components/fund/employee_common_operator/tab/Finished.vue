<template>
  <div class="smList" style="margin-bottom: 56px">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        雇员日常操作
        <div slot="content">
          <Form :label-width=150 ref="operatorSearchData" :model="operatorSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="服务中心：" prop="serviceCenter">
                  <Cascader :data="serviceCenterData" v-model="operatorSearchData.serviceCenter" trigger="hover" transfer></Cascader>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员编号：" prop="employeeId">
                  <Input v-model="operatorSearchData.employeeId" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务单类型：" prop="dictTaskCategory">
                  <Select v-model="operatorSearchData.dictTaskCategory" style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in taskTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="客户编号：" prop="companyId">
                  <input-company v-model="operatorSearchData.companyId"></input-company>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="雇员姓名：" prop="employeeName">
                  <Input v-model="operatorSearchData.employeeName" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="公积金类型：" prop="hfType">
                  <Select v-model="operatorSearchData.hfType" style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in fundTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="缴费银行：" prop="paymentBank">
                  <Select v-model="operatorSearchData.paymentBank" style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in payBankList" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="证件号：" prop="idNum">
                  <Input v-model="operatorSearchData.idNum" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业账户类型：" prop="hfAccountType">
                  <Select v-model="operatorSearchData.hfAccountType" style="width: 100%;" transfer>
                    <Option value="" label="全部"></Option>
                    <Option v-for="item in accountTypeList" :value="item.key" :key="item.key">{{item.value}}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="企业公积金账号：" prop="hfComAccount">
                  <Input v-model="operatorSearchData.hfComAccount" placeholder="请输入..."></Input>
                </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
                <Form-item label="任务发起时间：" prop="submitTime">
                  <DatePicker v-model="operatorSearchData.submitTime" type="daterange" placement="bottom" placeholder="选择日期" style="width: 100%;" transfer></DatePicker>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
                <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
                <Button type="warning" @click="resetSearchCondition('operatorSearchData')">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>
    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}" class="tr">
        <Button type="info" @click="excelExport()">导出</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
        <Table border :columns="finishedColumns" :data="finishedData"></Table>
        <Page
          class="pageSize"
          @on-change="handlePageNum"
          @on-page-size-change="handlePageSize"
          :total="finishedPageData.total"
          :page-size="finishedPageData.pageSize"
          :page-size-opts="finishedPageData.pageSizeOpts"
          :current="finishedPageData.pageNum"
          show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
//  import {mapState, mapGetters, mapActions} from 'vuex'
//  import EventType from '../../../../store/event_types'
import api from '../../../../api/house_fund/employee_task/employee_task'
import InputCompany from '../../../common_control/form/input_company'
import dict from '../../../../api/dict_access/house_fund_dict'

  export default {
    components: {InputCompany},
    data() {
      return {
        collapseInfo: [1], //展开栏
        operatorSearchData: {
          serviceCenter: [],
          taskStatus: 3,
          employeeId: '',
          dictTaskCategory: '',
          paymentBank: '',
          employeeName: '',
          hfType: '',
          hfAccountType: '',
          idNum: '',
          submitTime: [],
          companyId: '',
          hfComAccount: ''
        },

        serviceCenterData: [
          {value: 1, label: '大客户', children: [{value: '1-1', label: '大客户1'}, {value: '1-2', label: '大客户2'}]},
          {value: 2, label: '日本客户'},
          {value: 3, label: '虹桥'},
          {value: 4, label: '浦东'}
        ], //客服中心
        taskTypeList: [],
        payBankList: [],
        fundTypeList: [],
        accountTypeList: [],
        isShowRejectBatch: false,
        rejectionRemark: '',
        finishedData: [],
        finishedPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },
        finishedColumns: [
          {title: '操作', fixed: 'left', width: 100, align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {props: {type: 'success', size: 'small'}, style: {margin: '0 auto'},
                  on: {
                    click: () => {
                      localStorage.setItem('employeeFundCommonOperator.empTaskId', params.row.empTaskId);
                      localStorage.setItem('employeeFundCommonOperator.hfType', params.row.hfType);
                      localStorage.setItem('employeeFundCommonOperator.dictTaskCategory', params.row.dictTaskCategory);
                      localStorage.setItem('employeeFundCommonOperator.taskStatus', this.operatorSearchData.taskStatus);
                      switch (params.row.taskCategory) {
                        case '1':
                        case '2':
                        case '3':
                          this.$router.push({name: 'employeeFundCommonOperatorInTaskHandle'});
                          break;
                        case '4':
                        case '5':
                          this.$router.push({name: 'employeeFundCommonOperatorOutTaskHandle'});
                          break;
                        case '6':
                          this.$router.push({name: 'employeeFundCommonOperatorRepairTaskHandle'});
                          break;
                        case '7':
                          this.$router.push({name: 'employeeFundCommonOperatorAdjustTaskHandle'});
                          break;
                        default:
                          break;
                      }
                    }
                  }
                }, '查看'),
              ]);
            }
          },
          {title: '任务单类型', key: 'taskCategoryName', width: 150, align: 'center'},
          {title: '更正', key: 'isChangeName', width: 100, align: 'center'},
          {title: '雇员', key: 'employeeName', width: 150, align: 'center'},
          {title: '雇员编号', key: 'employeeId', width: 150, align: 'center'},
          {title: '雇员证件号', key: 'idNum', width: 200, align: 'center'},
          {title: '企业客户', key: 'companyName', width: 200, align: 'center'},
          {title: '客户编号', key: 'companyId', width: 150, align: 'center'},
          {title: '公积金类型', key: 'hfTypeName', width: 150, align: 'center'},
          {title: '公积金账号', key: 'hfEmpAccount', width: 200, align: 'center'},
          {title: '发起人', key: 'submitterId', width: 150, align: 'center'},
          {title: '发起时间', key: 'submitTime', width: 200, align: 'center'}
        ]
      }
    },
    mounted() {
//      this[EventType.FINISHED]()
      dict.getDictData().then(data => {
        if (data.code == 200) {
          this.accountTypeList = data.data.SocialSecurityAccountType;
          this.taskTypeList = data.data.HFLocalTaskCategory;
          this.taskTypeList.splice(7, 1); // 去除转移任务
          this.payBankList = data.data.PayBank;
          this.fundTypeList = data.data.FundType;
        }
      });
      this.hfEmpTaskQuery();
    },
    computed: {
//      ...mapState('finished',{
//        data:state => state.data
//      })
    },
    methods: {
//      ...mapActions('finished',[EventType.FINISHED]),
      resetSearchCondition(name) {
        this.$refs[name].resetFields()
      },
      hfEmpTaskQuery() {
        var params = {};
        {
          this.beforeSubmit();
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.hfEmpTaskQuery({
          pageSize: this.finishedPageData.pageSize,
          pageNum: this.finishedPageData.pageNum,
          params: params,
        }).then(data => {
          if (data.code == 200) {
            this.finishedData = data.data.rows;
            this.finishedPageData.total = Number(data.data.total);
          }
        })
      },
      handlePageNum(val) {
        this.finishedPageData.pageNum = val;
        this.hfEmpTaskQuery();
      },
      handlePageSize(val) {
        this.finishedPageData.pageNum = 1;
        this.finishedPageData.pageSize = val;
        this.hfEmpTaskQuery();
      },
      ok () {},
      cancel () {},
      beforeSubmit() {
        if (this.operatorSearchData.submitTime) {
          for (let i = 0; i < this.operatorSearchData.submitTime.length; i++) {
            if (this.operatorSearchData.submitTime[i]) {
              this.operatorSearchData.submitTime[i] = this.$utils.formatDate(this.operatorSearchData.submitTime[i], 'YYYY-MM-DD');
            }
          }
        }
      },
      excelExport() {
        var params = {};
        {
          this.beforeSubmit();
          // 清除 '[全部]'
          params = this.$utils.clear(this.operatorSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.hfEmpTaskExport({ params: params });
      }
    }
  }
</script>
