<template>
  <div class="smList">
    <Collapse v-model="collapseInfo">
      <Panel name="1">
        年调社保账户雇员信息查询
        <div slot="content">
          <Form :label-width=150 ref="employeeSearchData" :model="employeeSearchData">
            <Row type="flex" justify="start">
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="调整年份：" prop="adjustYear">
                <Label>{{employeeSearchData.adjustYear}}</Label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="企业社保账户：" prop="ssAccount">
                <Label>{{employeeSearchData.ssAccount}}</Label>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保账户名称：" prop="comAccountName">
                <Label>{{employeeSearchData.comAccountName}}</Label>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="匹配状态：" prop="matchStatus">
                <Select v-model="employeeSearchData.matchStatus" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="已匹配"></Option>
                  <Option value="0" label="未匹配"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="人员类别：" prop="accountStatus">
                <Select v-model="employeeSearchData.accountStatus" style="width: 100%;" transfer>
                  <Option value="[全部]" label="全部"></Option>
                  <Option value="1" label="一般人员信息"></Option>
                  <Option value="2" label="转出人员信息"></Option>
                </Select>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="客户编号：" prop="companyId">
                <input-company v-model="employeeSearchData.companyId"></input-company>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="社保序号：" prop="ssSerial">
                <Input v-model="employeeSearchData.ssSerial"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员编号：" prop="employeeId">
                <Input v-model="employeeSearchData.employeeId"></Input>
              </Form-item>
              </Col>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="雇员姓名：" prop="employeeName">
                <Input v-model="employeeSearchData.employeeName"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span:22}" :md="{span: 12}" :lg="{span: 8}">
              <Form-item label="月平均工资：">
                <Col span="10">
                <Form-item prop="avgMonthSalaryStart">
                  <Input v-model="employeeSearchData.avgMonthSalaryStart"></Input>
                </Form-item>
                </Col>
                <Col span="2" offset="2">-</Col>
                <Col span="10">
                <Form-item prop="avgMonthSalaryEnd">
                  <Input v-model="employeeSearchData.avgMonthSalaryEnd"></Input>
                </Form-item>
                </Col>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col :sm="{span: 24}" class="tr">
              <Button type="primary" icon="ios-search" @click="handlePageNum(1)">查询</Button>
              <Button type="warning" @click="$refs['employeeSearchData'].resetFields()">重置</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Panel>

    </Collapse>

    <Row class="mt20">
      <Col :sm="{span: 24}">
      <Button type="info" @click="goBack">返回</Button>
      <Button type="info" @click="exportExcel">导出Excel</Button>
      </Col>
    </Row>

    <Row class="mt20">
      <Col :sm="{span:24}">
      <Table border ref="employeeResultData"
             :columns="employeeResultColumns"
             :data="employeeResultData"
      ></Table>
      <Page
        class="pageSize"
        @on-change="handlePageNum"
        @on-page-size-change="handlePageSize"
        :total="employeeResultPageData.total"
        :page-size="employeeResultPageData.pageSize"
        :page-size-opts="employeeResultPageData.pageSizeOpts"
        :current="employeeResultPageData.pageNum"
        show-sizer show-total></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import EventType from '../../../store/EventTypes'
  import api from '../../../api/social_security/year_base_applicate/annual_adjust_account_emp'
  import InputCompany from '../../commoncontrol/form/input-company'

  export default {
    components: {InputCompany},

    data() {
      return {
        collapseInfo: [1], //展开栏
        employeeSearchData: {
          adjustYear: (new Date()).getFullYear(),
          annualAdjustAccountId: this.$route.query.annualAdjustAccountId,
          ssAccount: this.$route.query.ssAccount,
          comAccountName: this.$route.query.comAccountName,
          matchStatus: '',
          accountStatus: '',
          companyId: '',
          ssSerial: '',
          employeeId: '',
          employeeName: '',
          avgMonthSalaryStart: '',
          avgMonthSalaryEnd: '',
        },

        employeeResultData: [],
        employeeResultPageData: {
          total: 0,
          pageNum: 1,
          pageSize: this.$utils.DEFAULT_PAGE_SIZE,
          pageSizeOpts: this.$utils.DEFAULT_PAGE_SIZE_OPTS
        },

        employeeResultColumns: [
          {
            title: '匹配状态', key: 'matchStatus', width: 100, align: 'center',
            render: (h, params) => {
              return this.$decode.matchStatus(params.row.matchStatus)
            }
          },
          {
            title: '人员类别', key: 'accountStatus', width: 120, align: 'center',
            render: (h, params) => {
              return this.$decode.accountStatus(params.row.accountStatus)
            }
          },
          {
            title: '客户编号', key: 'companyId', width: 120, align: 'center'
          },
          {
            title: '客户名称', key: 'companyName', width: 200, align: 'center'
          },
          {
            title: '社保序号', key: 'ssSerial', width: 160, align: 'center'
          },
          {
            title: '雇员编号', key: 'employeeId', width: 100, align: 'center'
          },
          {
            title: '雇员姓名', key: 'employeeName', width: 100, align: 'center'
          },
          {
            title: '身份证号', key: 'idNum', width: 180, align: 'center'
          },
          {
            title: '本单位缴费月数', key: 'paymentMonths', width: 130, align: 'center'
          },
          {
            title: '职工月平均工资收入', key: 'avgMonthSalary', width: 150, align: 'center'
          }
        ]
      }
    },
    mounted() {
      let rparams = {annualAdjustAccountId: this.$route.query.annualAdjustAccountId};
      api.annualAdjustAccountEmpQuery(
        {
          pageSize: this.employeeResultPageData.pageSize,
          pageNum: this.employeeResultPageData.pageNum,
          params: rparams,
        }
      ).then(data => {
        if (data.code == 200) {
          this.employeeResultData = data.data.rows;
          this.employeeResultPageData.total = Number(data.data.total);
        } else {
          this.$Message.error(data.message);
        }
      })
    },
    methods: {
      goBack() {
        this.$router.push({name:'annualadjustaccount'});
      },
      annualAdjustAccountEmpQuery() {
        // 处理参数
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.employeeSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');

        }
        api.annualAdjustAccountEmpQuery(
          {
            pageSize: this.employeeResultPageData.pageSize,
            pageNum: this.employeeResultPageData.pageNum,
            params: params,
          }
        ).then(data => {
          if (data.code == 200) {
            this.employeeResultData = data.data.rows;
            this.employeeResultPageData.total = Number(data.data.total);
          } else {
            this.$Message.error(data.message);
          }
        })
      },
      handlePageNum(val) {
        this.employeeResultPageData.pageNum = val;
        this.annualAdjustAccountEmpQuery();
      },
      handlePageSize(val) {
        this.employeeResultPageData.pageSize = val;
        this.annualAdjustAccountEmpQuery();
      },
      exportExcel() {
        var params = {};
        {
          // 清除 '[全部]'
          params = this.$utils.clear(this.employeeSearchData);
          // 清除空字符串
          params = this.$utils.clear(params, '');
        }
        api.annualAdjustAccountEmpExport({ params: params });
      }
    }
  }
</script>
